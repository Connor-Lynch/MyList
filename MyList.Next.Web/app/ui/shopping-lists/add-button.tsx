import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddButton() {
    return (
        <div className="fixed bottom-3 right-3 h-16 w-16 rounded-full bg-cyan-600 text-white flex items-center justify-center">
            <PlusIcon className="h-8 md:ml-4" />
        </div>
    );
}