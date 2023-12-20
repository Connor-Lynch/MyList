'use client';

import { ShoppingList } from "@/app/lib/models/shopping-list";
import clsx from 'clsx';
import Link from "next/link";
import DeleteButton from "./delete-button";

export default function Card({ shoppingList } : { shoppingList: ShoppingList }) {
    const maxNumberOfItems = 3;

    function getNumberOfOmittedItems(): number {
        return shoppingList.items.length - maxNumberOfItems;
    }

    return (
        <div className="w-full md:w-1/2 relative">
            <Link href={`/shopping-list/${shoppingList.id}`}>
                <div className="rounded-xl bg-gray-50 p-2 m-3 shadow-sm drop-shadow-md">
                    <div className="flex p-4">
                        <h3 className="ml-2 text-l font-xl">{shoppingList.name}</h3>
                    </div>
                    <div className="truncate rounded-xl bg-white p-3 flex justify-between" >
                        {
                            shoppingList?.items.length > 0 ?
                            <ul>
                                { shoppingList.items.slice(0, maxNumberOfItems).map(item => 
                                    <li key={item.id}
                                        className={clsx({ 'line-through': item.isChecked })}
                                    >
                                        {item.name}
                                    </li>
                                )}
                                { shoppingList.items.length > maxNumberOfItems &&
                                    <li className="italic" key={`${shoppingList.id}-extra`}>+ {getNumberOfOmittedItems()} More</li>
                                }
                            </ul> :
                            <p className="italic">No Items</p>
                        }
                        <div className="self-end" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}>
                            <DeleteButton shoppingListId={shoppingList.id}/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}