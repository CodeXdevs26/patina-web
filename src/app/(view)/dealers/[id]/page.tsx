import { Suspense } from "react";
import Content from "./content";
import { Spinner } from "@/components/ui/spinner";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<>Loading..</>}> <Content id={id} /> </Suspense>
    );
}
