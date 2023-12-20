'use client';

import { ItemListState } from "@/app/lib/models/items-state";
import { ShoppingListItem } from "@/app/lib/models/shopping-list-item";
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from "react";
import ActionItem from "./action-items";

export default function Item({ item, itemListState, setItemListState }: { item: ShoppingListItem, itemListState: ItemListState, setItemListState: Dispatch<SetStateAction<ItemListState>> }) {
    const [itemState, setItemState] = useState(item);

    function toggleItemChecked() {
        setItemState({
            ... item,
            isChecked: !itemState.isChecked
        });
    }

    function itemClicked() {
        let newId = undefined;
        if (itemListState.selectedId !== item.id) {
            newId = item.id;
        }
        setItemListState({selectedId: newId});
    }

    return (
        <div className="h-10 flex items-center">
            <input id="disabled-checkbox" type="checkbox" className="w-5 h-5 border-gray-300 rounded mr-2" 
                checked={!! itemState.isChecked}
                onChange={() => toggleItemChecked()}
            ></input>
            <div className="w-full flex justify-between">
                <p className={clsx('w-full', { 'line-through': itemState.isChecked })} onClick={itemClicked}>{itemState.name}</p>
                <div className="ml-2">
                    { itemListState.selectedId === itemState.id && <ActionItem /> }
                </div>
            </div>
        </div>
    )
}