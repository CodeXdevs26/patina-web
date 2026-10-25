"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { howl } from '@/lib/utils'
import { ArrowLeftIcon, CheckCircleIcon, ShareNetworkIcon, StarIcon, XCircleIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

export default function Content({ id }: { id: string }) {

    const { data, isPending } = useQuery({
        queryKey: ["dealer", id],
        queryFn: (): Promise<{
            ok: boolean
            message: string
            data: {
                dealer: {
                    id: number
                    name: string
                    company_name: string
                    avatar: string
                    joined_year: string
                    is_verified: boolean
                    standing: string
                    rating: string
                    reviews_count: number
                    description: string
                    active_listings: Array<any>
                }
            }
        }> => {
            return howl(`/dealers/${id}`)
        }
    })

    if (isPending) {
        return <main className="container mx-auto py-24 flex items-center justify-center">
            <Spinner />
        </main>
    }

    const dealer = data?.data?.dealer;
    return (

        <>
            <main className="container mx-auto py-24">
                <Card>
                    <CardHeader className="flex flex-col items-center justify-center gap-2">
                        <Avatar className="size-24">
                            <AvatarImage src={dealer?.avatar} />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{dealer?.name}</CardTitle>
                        <CardDescription>{dealer?.company_name}</CardDescription>
                        <div className="grid grid-cols-3 gap-4">
                            {dealer?.is_verified ? <p className="flex items-center gap-2 text-green-600">
                                <CheckCircleIcon className="size-4" /> Verified
                            </p> : <p className="flex items-center gap-2 text-destructive">
                                <XCircleIcon className="size-4" /> Not Verified
                            </p>}
                            <p className="text-center">
                                Joined Year: {dealer?.joined_year}
                            </p>
                            <p className="text-center flex items-center gap-2 tracking-normal leading-0">
                                Rating: {dealer?.rating} <StarIcon className="text-primary" />
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-center">
                            {dealer?.description}
                        </CardDescription>
                    </CardContent>
                </Card>
            </main>
            {/* <div><pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
                <code className="whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                </code>
            </pre></div> */}
        </>
    )
}
