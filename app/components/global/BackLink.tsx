import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
    children: React.ReactNode;
    href: string;
}

export default function BackLink({ children, href }: BackLinkProps) {
    return (
        <Link href={href} className="flex items-center text-principal-200 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {children}
        </Link>
    );
}
