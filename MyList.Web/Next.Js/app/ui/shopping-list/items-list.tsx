'use client';

import { ShoppingList } from "@/app/lib/models/shopping-list";
import Item from "./item";
import { useState } from "react";
import { ItemListState } from "@/app/lib/models/items-state";
import AddItem from "./add-item";

export default function ItemsList({ shoppingList }: { shoppingList: ShoppingList }) {
    let initial: ItemListState = { selectedId: undefined };
    const [itemListState, setItemListState] = useState(initial);

    return (
        <>
            <ul>
                { shoppingList.items.map(item => 
                    <Item key={item.id} item={item} itemListState={itemListState} setItemListState={setItemListState}/>
                )}
            </ul>
            <AddItem shoppingList={shoppingList} itemListState={itemListState} setItemListState={setItemListState}/>
        </>
    );
}