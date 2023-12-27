import { ItemListState } from "@/app/lib/models/items-state";
import { tryAddItem } from "@/app/lib/services/item-list-state.service";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useState } from "react";
import ItemForm from "./item-form";
import clsx from 'clsx';
import { ShoppingList } from "@/app/lib/models/shopping-list";
import { ShoppingListItem } from "@/app/lib/models/shopping-list-item";

export default function AddItem({ shoppingList, itemListState, setItemListState }: 
    { shoppingList: ShoppingList, itemListState: ItemListState, setItemListState: Dispatch<SetStateAction<ItemListState>> }) {
    const initialState: ShoppingListItem = {
        id: "",
        name: "",
        shoppingListId: shoppingList.id,
        isChecked: false,
        sortOrder: 0
    }
    const [itemState, setItemState] = useState(initialState);
    
    function addItem() {
        tryAddItem(itemListState, setItemListState);
    }

    return (
        <div className="w-full">
            { itemListState.editInProgress && itemListState.selectedId === undefined ?
                <div className="h-10 flex items-center">
                    <input id="disabled-checkbox" type="checkbox" className="w-5 h-5 border-gray-300 rounded mr-2 accent-pink-500"
                        disabled={ true }
                    ></input>
                    <div className="w-full">
                        <ItemForm closeEvent={addItem} itemState={itemState} setItemState={setItemState}/> 
                    </div>
                </div>:
                <div className="flex justify-center items-center pt-1">
                    <button className={clsx('flex justify-center items-center', { 'text-slate-500': itemListState.editInProgress })} onClick={addItem} disabled={ itemListState.editInProgress }>
                        <PlusIcon className="h-5 " />
                        <span>Add Item</span>
                    </button>
                </div>
            }
        </div>
    );
}