'use client';

import { ShoppingList } from "@/app/lib/models/shopping-list";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import UpdateListFormName from "./update-list-name-form";

export default function ListName({ shoppingList }: { shoppingList: ShoppingList }) {
    const [editName, setEditName] = useState(false);
    const [listName, editListName] = useState(shoppingList.name);

    function toggleEdit() {
        setEditName(!editName);
    }

    return (
        <div className="border-b-2 border-solid border-slate-300 h-8 py-2 mb-2 w-full flex justify-between items-end">
            {
                !!editName ?
                <div className="w-full">
                    <UpdateListFormName shoppingList={shoppingList} closeEvent={toggleEdit} editListName={editListName}/>
                </div> :
                <>
                    <h1 className="text-2xl font-bold">{ listName }</h1>
                    <PencilIcon className="h-6 text-cyan-600 cursor-pointer" onClick={toggleEdit}/>
                </>
            }
        </div>
    );
}