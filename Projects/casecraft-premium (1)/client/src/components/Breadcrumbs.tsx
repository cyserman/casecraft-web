import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
    items?: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
    const [location] = useLocation();

    // Default breadcrumbs based on path if items not provided
    const pathSegments = location.split("/").filter(Boolean);

    const displayItems = items.length > 0 ? items : pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = segment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        return { label, href };
    });

    return (
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/" className="flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                {displayItems.map((item, index) => {
                    const isLast = index === displayItems.length - 1;

                    return (
                        <div key={item.label} className="flex items-center gap-1.5 sm:gap-2.5">
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href || "#"}>{item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
