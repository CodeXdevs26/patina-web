
"use client";

import { useRef, useState, useEffect } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImageDropzoneProps {
    title: string;
    onChange: (file: File | null) => void;
}

export default function ImageDropzone({
    title,
    onChange,
}: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFile = (file?: File) => {
        if (!file || !file.type.startsWith("image/")) return;

        setPreview(URL.createObjectURL(file));
        setFileName(file.name);
        onChange(file);
    };

    const removeImage = () => {
        setPreview(null);
        setFileName(null);
        onChange(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="min-w-0 space-y-2">
            <Label>{title}</Label>

            {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
            {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFile(e.dataTransfer.files[0]);
                }}
                onClick={() => inputRef.current?.click()}
                className={`relative flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-4 transition-colors ${dragging
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25 hover:border-primary/60 hover:bg-muted/50"
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        handleFile(e.target.files?.[0]);
                        e.target.value = "";
                    }}
                />

                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt={`${title} preview`}
                            className="absolute inset-0 h-full w-full object-contain p-3"
                        />

                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-background/90 p-3 backdrop-blur-sm">
                            <span className="min-w-0 truncate text-xs text-muted-foreground">
                                {fileName}
                            </span>

                            <button
                                type="button"
                                aria-label={`Remove ${title}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                }}
                                className="shrink-0 rounded-md p-1.5 hover:bg-destructive/10 hover:text-destructive"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="rounded-full bg-muted p-3">
                            {dragging ? (
                                <ImagePlus className="size-6 text-primary" />
                            ) : (
                                <Upload className="size-6 text-muted-foreground" />
                            )}
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                {dragging
                                    ? "Drop your image here"
                                    : `Upload ${title.toLowerCase()}`}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Drag & drop or click to browse
                            </p>

                            <p className="text-xs text-muted-foreground">
                                PNG, JPG, or WEBP
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
