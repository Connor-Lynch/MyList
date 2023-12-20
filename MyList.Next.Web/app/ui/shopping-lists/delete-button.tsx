import { removeShoppingList } from "@/app/lib/actions/shopping-list.actrion";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteButton({ shoppingListId }: { shoppingListId: string }) {
    function deleteClicked() {
        removeShoppingList(shoppingListId);
    }

    return <TrashIcon className="h-5 text-red-500" onClick={deleteClicked}/>;
}