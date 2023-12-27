'use client';

import { ItemListState } from "@/app/lib/models/items-state";
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from "react";
import ActionItem from "./action-items";
import { deleteShoppingListItem, updateShoppingListItem } from "@/app/lib/actions/shopping-list-item.action";
import { EditableShoppingListItem } from "./models/editable-shopping-list-item";
import { tryEditItem, trySelectItem } from "@/app/lib/services/item-list-state.service";
import ItemForm from "./item-form";

export default function Item({ item, itemListState, setItemListState }: { item: EditableShoppingListItem, itemListState: ItemListState, setItemListState: Dispatch<SetStateAction<ItemListState>> }) {
    const [itemState, setItemState] = useState(item);

    async function toggleItemChecked() {
        const updatedItem = {
            ... item,
            isChecked: !itemState.isChecked,
            disabled: true,
        };
        setItemState(updatedItem);

        await updateShoppingListItem(updatedItem);
        setItemState({
            ... updatedItem,
            disabled: false,
        });
    }

    function itemClicked() {
        trySelectItem(itemListState, item.id, setItemListState);
    }

    function editItem() {
        tryEditItem(itemListState, item.id, setItemListState);
    }

    async function deleteItem() {
        await deleteShoppingListItem(itemState);
    }

    return (
        <div className="h-10 flex items-center">
            <input id="disabled-checkbox" type="checkbox" className="w-5 h-5 border-gray-300 rounded mr-2 accent-pink-500" 
                checked={ !! itemState.isChecked }
                disabled={ !! itemState.disabled || itemListState.editInProgress }
                onChange={() => toggleItemChecked()}
            ></input>
            <div className="w-full">
                { itemListState.editInProgress && itemListState.selectedId === item.id ?
                    <ItemForm closeEvent={editItem} itemState={itemState} setItemState={setItemState}/> :
                    <div className={clsx('w-full flex justify-between pl-1', itemListState.editInProgress ? 'cursor-default' : 'cursor-pointer' )}>
                        <p className={clsx('w-full', { 'line-through': itemState.isChecked })} onClick={itemClicked}>{itemState.name}</p>
                        <div className="ml-2">
                            { itemListState.selectedId === itemState.id && <ActionItem acceptEvent={editItem} declineEvent={deleteItem} /> }
                        </div>
                    </div> 
                }
            </div>
        </div>
    )
}