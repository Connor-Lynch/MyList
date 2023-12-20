import { QueueListIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Header() {
    return (
        <div className="h-14">
            <Link className="w-full h-14 bg-cyan-600 p-3 content-center flex fixed z-50 drop-shadow-md"
                href="/"
            >
                <div className={'flex flex-row items-center leading-none text-white'}>
                    <QueueListIcon className="h-8 pr-3" />
                    <p className="text-[2rem]">MyList</p>
                </div>
            </Link>
        </div>
    );
}