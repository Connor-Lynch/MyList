import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function BackButton() {
    return (
        <Link
            className="flex item-center text-sky-700 font-medium"
            href={'/'}
        >
            <ArrowLeftIcon className="h-5 pr-2 my-auto"/>
            <span>Back</span>
        </Link>
    );
}