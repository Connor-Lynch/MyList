import { ShoppingList } from "../../lib/models/shopping-list";
import { getShoppingListById } from "@/app/lib/services/shopping-list.service";
import BackButton from "@/app/ui/shopping-list/back-button";
import ListName from "@/app/ui/shopping-list/list-name";
import ItemsList from "@/app/ui/shopping-list/items-list";

export default async function ShoppingList({ params }: { params: { id: string} }) {
    const shoppingList: ShoppingList = await getShoppingListById(params.id);

    return (
        <div className="p-3">
            <BackButton />
            <div className="p-4 w-full">
                <ListName shoppingList={shoppingList} />
                <ItemsList shoppingList={shoppingList}/>
            </div>
        </div>
    )
}