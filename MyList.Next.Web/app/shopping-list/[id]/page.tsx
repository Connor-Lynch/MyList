import { ShoppingList } from "../../lib/models/shopping-list";
import { getShoppingListById } from "@/app/lib/services/shopping-list.service";

import BackButton from "@/app/ui/shopping-list/back-button";

export default async function ShoppingList({ params }: { params: { id: string} }) {
    const shoppingList: ShoppingList = await getShoppingListById(params.id);

    return (
        <div className="p-3">
            <BackButton />
            <div className="p-3">
                <h1>{ shoppingList.name }</h1>
            </div>
            <ul>
                { shoppingList.items.map(item => 
                    <li key={item.id}>{ item.name }</li>
                )}
            </ul>
        </div>
    )
}