import { ShoppingList } from "../lib/models/shopping-list";
import { getAllShoppingLists } from "../lib/services/shopping-list.service";
import AddButton from "../ui/shopping-lists/add-button";
import Card from "../ui/shopping-lists/card";

export default async function ShoppingLists() {
    const shoppingLists: ShoppingList[] = await getAllShoppingLists();

    return (
        <div>
            <div className="p-5 flex flex-wrap">
                {shoppingLists.map(list => 
                    <Card shoppingList={list} key={list.id}/> 
                )}
            </div>
            <AddButton />
        </div>
    );
}