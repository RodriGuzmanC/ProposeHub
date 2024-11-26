import RecoveryPassClient from "./client"

interface PageProps {
    params: { id: string }
}


export default function Page({params}: PageProps) {

    const tokenParam = params.id

    return (
        <RecoveryPassClient tokenParam={tokenParam}></RecoveryPassClient>
    )
}
