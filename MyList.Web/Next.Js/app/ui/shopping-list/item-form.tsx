'use client';

import { addShoppingListItem, updateShoppingListItem } from "@/app/lib/actions/shopping-list-item.action";
import { ShoppingListItem } from "@/app/lib/models/shopping-list-item";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";

export default function ItemForm({ closeEvent, itemState, setItemState }: 
    { item?: ShoppingListItem, closeEvent: Function, itemState: ShoppingListItem, setItemState: Dispatch<SetStateAction<ShoppingListItem>> }) {
    const inputName = 'itemName';
    function saveForm(formData: FormData) {
        const newItemName = formData.get(inputName)?.toString().trim();

        newItemName && (!itemState.id || newItemName !== itemState?.name) ? 
            updateList(newItemName) : 
            closeEvent();   
    }

    async function updateList(newItemName: string) {
        if(itemState.id) {
            const updateItem: ShoppingListItem = {
                ... itemState,
                name: newItemName,
            }
            await updateShoppingListItem(updateItem).then(() => {
                setItemState(updateItem);
                closeEvent();
            });
        }
        else {
            const newItem: ShoppingListItem = {
                ... itemState,
                name: newItemName,
            }
            await addShoppingListItem(newItem).then(() => {
                closeEvent();
            });
        }
    }

    return (
        <form action={saveForm} className="flex justify-between items-center">
            <div className="rounded-md w-full">
                <div className="w-full">
                    <input
                        id="list-name"
                        name={ inputName }
                        defaultValue={ itemState?.name }
                        type="text"
                        placeholder="Item Name"
                        className="peer block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <button onClick={() => closeEvent()} type="reset">
                    <XMarkIcon className="h-6 text-red-500 pr-1"/>
                </button>
                <button>
                    <CheckIcon className="h-6 text-cyan-600 pl-1" type="submit"/> 
                </button>
            </div>
        </form>
    );    
}