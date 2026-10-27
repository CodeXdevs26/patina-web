"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import ImageDropzone from './image-dropzone'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import { base_api, base_url } from '@/lib/utils'

type DocType = 'aadhaar' | 'pan' | 'passport'
type Field = 'fullName' | 'documentNumber' | 'dob' | 'city' | 'frontImage' | 'backImage' | 'consent'

const API_URL = `${base_url}${base_api}`
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const DOC_CONFIG: Record<DocType, { label: string; placeholder: string; needsBack: boolean }> = {
    aadhaar: { label: 'Aadhaar', placeholder: '1234 5678 9012', needsBack: true },
    pan: { label: 'PAN', placeholder: 'ABCDE1234F', needsBack: true },
    passport: { label: 'Passport', placeholder: 'A1234567', needsBack: true },
}

/* ---------- validators ---------- */

// Verhoeff checksum, used by Aadhaar's 12th digit
const VD = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]
const VP = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]
const verhoeff = (num: string) => {
    let c = 0
    num.split('').reverse().forEach((ch, i) => { c = VD[c][VP[i % 8][Number(ch)]] })
    return c === 0
}

// Strips spaces and uppercases letters so the stored value is canonical
const normalizeDocNumber = (type: DocType, value: string) => {
    const v = value.replace(/\s+/g, '')
    return type === 'aadhaar' ? v : v.toUpperCase()
}

const validateDocNumber = (type: DocType, raw: string): string => {
    const v = normalizeDocNumber(type, raw)
    if (!v) return `Enter your ${DOC_CONFIG[type].label} number`
    if (type === 'aadhaar') {
        if (!/^[2-9]\d{11}$/.test(v)) return 'Aadhaar must be 12 digits and cannot start with 0 or 1'
        if (!verhoeff(v)) return 'This Aadhaar number is not valid. Check for a typo'
    }
    if (type === 'pan' && !/^[A-Z]{3}[ABCFGHLJPT][A-Z]\d{4}[A-Z]$/.test(v)) {
        return 'PAN must look like ABCDE1234F'
    }
    if (type === 'passport' && !/^[A-PR-WY][1-9]\d{5}[1-9]$/.test(v)) {
        return 'Passport must be 1 letter followed by 7 digits, like A1234567'
    }
    return ''
}

const validateName = (v: string): string => {
    const name = v.trim().replace(/\s+/g, ' ')
    if (!name) return 'Enter your legal full name'
    if (name.length < 2 || name.length > 100) return 'Name must be 2 to 100 characters'
    if (!/^[\p{L}][\p{L}\p{M}.'\- ]*$/u.test(name)) return 'Use letters, spaces, hyphens and apostrophes only'
    return ''
}

const validateDob = (v: string): string => {
    if (!v) return 'Enter your date of birth'
    const d = new Date(`${v}T00:00:00`)
    if (Number.isNaN(d.getTime())) return 'Enter a valid date'
    const today = new Date()
    if (d > today) return 'Date of birth cannot be in the future'
    const eighteen = new Date(d.getFullYear() + 18, d.getMonth(), d.getDate())
    if (eighteen > today) return 'You must be at least 18 years old'
    if (d.getFullYear() < 1900) return 'Enter a valid date'
    return ''
}

const validateCity = (v: string): string => {
    const city = v.trim()
    if (!city) return 'Enter your city'
    if (city.length < 2 || city.length > 80) return 'City must be 2 to 80 characters'
    if (!/^[\p{L}][\p{L}\p{M}.'\- ]*$/u.test(city)) return 'Use letters, spaces and hyphens only'
    return ''
}

const validateImage = (file: File | null, required: boolean, side: string): string => {
    if (!file) return required ? `Upload the ${side} of your document` : ''
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return 'Use a JPG, PNG or WebP image'
    if (file.size > MAX_IMAGE_BYTES) return 'Image must be 5 MB or smaller'
    if (file.size === 0) return 'This file is empty. Choose another image'
    return ''
}

const maxDobValue = () => new Date().toISOString().split('T')[0]

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null
    return <p id={id} role="alert" className="text-sm text-destructive">{message}</p>
}

export default function Page() {
    const router = useRouter()
    const [{ token }] = useCookies(['token'])

    const [selectedDocument, setSelectedDocument] = React.useState<DocType>('aadhaar')
    const [fullName, setFullName] = React.useState('')
    const [documentNumber, setDocumentNumber] = React.useState('')
    const [dob, setDob] = React.useState('')
    const [city, setCity] = React.useState('')
    const [frontImage, setFrontImage] = React.useState<File | null>(null)
    const [backImage, setBackImage] = React.useState<File | null>(null)
    const [isIdentityConfirmed, setIsIdentityConfirmed] = React.useState(false)
    const [isKycAuthorized, setIsKycAuthorized] = React.useState(false)

    const [touched, setTouched] = React.useState<Partial<Record<Field, boolean>>>({})
    const [submitted, setSubmitted] = React.useState(false)

    const doc = DOC_CONFIG[selectedDocument]

    const errors = React.useMemo<Record<Field, string>>(() => ({
        fullName: validateName(fullName),
        documentNumber: validateDocNumber(selectedDocument, documentNumber),
        dob: validateDob(dob),
        city: validateCity(city),
        frontImage: validateImage(frontImage, true, 'front'),
        backImage: validateImage(backImage, true, 'back'),
        consent: isIdentityConfirmed && isKycAuthorized ? '' : 'Accept both confirmations to continue',
    }), [fullName, documentNumber, selectedDocument, dob, city, frontImage, backImage, isIdentityConfirmed, isKycAuthorized])

    const isValid = Object.values(errors).every((e) => !e)
    const showError = (f: Field) => (submitted || touched[f]) ? errors[f] : ''
    const touch = (f: Field) => setTouched((t) => ({ ...t, [f]: true }))

    const handleDocumentChange = (value: string) => {
        setSelectedDocument(value as DocType)
        // Numbers are not interchangeable between document types
        setDocumentNumber('')
        setTouched((t) => ({ ...t, documentNumber: false }))
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ['kyc_submit'],
        mutationFn: async () => {
            if (!token) throw new Error('Your session has expired. Sign in again.')

            const formData = new FormData()
            formData.append('legal_name', fullName.trim().replace(/\s+/g, ' '))
            formData.append('document_type', selectedDocument)
            formData.append('document_number', normalizeDocNumber(selectedDocument, documentNumber))
            formData.append('dob', dob)
            formData.append('city', city.trim())
            if (frontImage) formData.append('front_side', frontImage)
            if (backImage) formData.append('back_side', backImage)

            // Do not set Content-Type: the browser adds the multipart boundary
            const res = await fetch(`${API_URL}/kyc/submit`, {
                method: 'POST',
                body: formData,
                headers: { Authorization: `Bearer ${token}` },
            })

            let body: any = null
            try { body = await res.json() } catch { /* non-JSON response */ }

            if (!res.ok) {
                throw new Error(body?.message ?? `Request failed (${res.status})`)
            }
            return body
        },
        onError: (err: Error) => {
            toast.error(err.message || 'Failed to complete this request')
        },
        onSuccess: (res: any) => {
            toast.success(res?.message ?? 'KYC submitted for verification')
            router.push('/')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        if (!isValid) {
            toast.error('Fix the highlighted fields and try again')
            return
        }
        mutate()
    }

    return (
        <main className='flex flex-col gap-4 px-4 py-12'>
            <form onSubmit={handleSubmit} noValidate className="space-y-4 container mx-auto mt-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xs">KYC RULES</CardTitle>
                        <CardDescription>
                            Aadhaar uses OTP to the linked mobile number. PAN is required for transactions above ₹50,000. Selfie match is requested when the provider asks for it.
                        </CardDescription>
                        <CardDescription>
                            Context: General onboarding
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="space-y-2">
                    <Label htmlFor="legal-name">LEGAL FULL NAME</Label>
                    <Input
                        id="legal-name"
                        autoComplete="name"
                        placeholder="Enter your legal full name"
                        value={fullName}
                        maxLength={100}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => touch('fullName')}
                        aria-invalid={!!showError('fullName')}
                        aria-describedby="legal-name-error"
                    />
                    <FieldError id="legal-name-error" message={showError('fullName')} />
                </div>

                <div className="space-y-2">
                    <Label>DOCUMENT TYPE</Label>
                    <Tabs value={selectedDocument} onValueChange={handleDocumentChange} className="w-full">
                        <TabsList className="mb-2">
                            <TabsTrigger value="aadhaar" className="data-[state=active]:bg-primary! data-[state=active]:text-background! font-bold">AADHAAR</TabsTrigger>
                            <TabsTrigger value="pan" className="data-[state=active]:bg-primary! data-[state=active]:text-background! font-bold">PAN</TabsTrigger>
                            <TabsTrigger value="passport" className="data-[state=active]:bg-primary! data-[state=active]:text-background! font-bold">PASSPORT</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Label htmlFor="document-number" className="uppercase">{doc.label} NUMBER</Label>
                    <Input
                        id="document-number"
                        inputMode={selectedDocument === 'aadhaar' ? 'numeric' : 'text'}
                        autoComplete="off"
                        placeholder={`Enter your ${doc.label} number`}
                        value={documentNumber}
                        maxLength={selectedDocument === 'aadhaar' ? 14 : 10}
                        onChange={(e) => {
                            const v = e.target.value
                            setDocumentNumber(selectedDocument === 'aadhaar' ? v.replace(/[^\d\s]/g, '') : v.toUpperCase())
                        }}
                        onBlur={() => touch('documentNumber')}
                        aria-invalid={!!showError('documentNumber')}
                        aria-describedby="document-number-error"
                    />
                    <FieldError id="document-number-error" message={showError('documentNumber')} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="dob">Date Of Birth</Label>
                        <Input
                            id="dob"
                            type="date"
                            max={maxDobValue()}
                            autoComplete="bday"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            onBlur={() => touch('dob')}
                            aria-invalid={!!showError('dob')}
                            aria-describedby="dob-error"
                        />
                        <FieldError id="dob-error" message={showError('dob')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            placeholder="Enter your city"
                            value={city}
                            maxLength={80}
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={() => touch('city')}
                            aria-invalid={!!showError('city')}
                            aria-describedby="city-error"
                        />
                        <FieldError id="city-error" message={showError('city')} />
                    </div>

                    <div className="space-y-2 col-span-2">
                        <Label>DOCUMENT UPLOAD</Label>
                        <p className="text-sm text-muted-foreground">
                            JPG, PNG or WebP, up to 5 MB each.
                        </p>
                        <div className="grid w-full grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <ImageDropzone
                                    title="Front Image"
                                    onChange={(file: File | null) => { setFrontImage(file); touch('frontImage') }}
                                />
                                <FieldError id="front-error" message={showError('frontImage')} />
                            </div>
                            <div className="space-y-2">
                                <ImageDropzone
                                    title="Back Image"
                                    onChange={(file: File | null) => { setBackImage(file); touch('backImage') }}
                                />
                                <FieldError id="back-error" message={showError('backImage')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="confirm-identity"
                            checked={isIdentityConfirmed}
                            onCheckedChange={(c) => { setIsIdentityConfirmed(c === true); touch('consent') }}
                        />
                        <Label htmlFor="confirm-identity">I confirm this identity information is accurate and belongs to me.</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="authorize-kyc"
                            checked={isKycAuthorized}
                            onCheckedChange={(c) => { setIsKycAuthorized(c === true); touch('consent') }}
                        />
                        <Label htmlFor="authorize-kyc">I authorize Patina to verify my KYC details for compliance and fraud prevention.</Label>
                    </div>
                    <FieldError id="consent-error" message={showError('consent')} />
                </div>

                <div className="flex items-center justify-center gap-4 mt-12">
                    <Button type="submit" disabled={isPending || !isIdentityConfirmed || !isKycAuthorized}>
                        {isPending ? 'Submitting...' : 'Submit KYC'}
                    </Button>
                    <Button type="button" variant="outline" disabled={isPending} onClick={() => router.push('/')}>
                        Skip, Go Home
                    </Button>
                </div>
            </form>
        </main>
    )
}