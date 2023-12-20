import { ShoppingList } from "@/app/lib/models/shopping-list";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ListName({ shoppingList }: { shoppingList: ShoppingList }) {
    return (
        <div className="border-b-2 border-solid border-slate-300 pb-2 mb-2 flex justify-between items-end">
            <h1 className="text-2xl font-bold">{ shoppingList.name }</h1>
            <PencilIcon className="h-6 text-cyan-600"/>
        </div>
    );
}