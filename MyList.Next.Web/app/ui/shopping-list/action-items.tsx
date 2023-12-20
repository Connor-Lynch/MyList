import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ActionItem() {
    return (
        <div className="flex justify-between">
            <PencilIcon className="h-6 text-cyan-600 pr-1"/>
            <TrashIcon className="h-6 text-red-500 pl-1"/>
        </div>
    );
}