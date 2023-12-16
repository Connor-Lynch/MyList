import { QueueListIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Header() {
    return (
        <Link className="w-full h-14 bg-cyan-600 p-3 content-center flex"
            href="/"
        >
            <div className={'flex flex-row items-center leading-none text-white'}>
                <QueueListIcon className="h-8" />
                <p className="text-[2rem]">MyList</p>
            </div>
        </Link>
    );
}