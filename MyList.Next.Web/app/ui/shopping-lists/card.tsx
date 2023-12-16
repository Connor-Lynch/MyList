import { ShoppingList } from "@/app/lib/models/shopping-list";
import clsx from 'clsx';
import Link from "next/link";

export default function Card({ shoppingList } : { shoppingList: ShoppingList }) {
    const maxNumberOfItems = 3;

    function getNumberOfOmittedItems(): number {
        return shoppingList.items.length - maxNumberOfItems;
    }

    return (
        <div className="w-full md:w-1/2">
            <Link href={`/shopping-list/${shoppingList.id}`} >
                <div className="rounded-xl bg-gray-50 p-2 m-3 shadow-sm drop-shadow-md">
                    <div className="flex p-4">
                        <h3 className="ml-2 text-l font-xl">{shoppingList.name}</h3>
                    </div>
                    <div className={`truncate rounded-xl bg-white p-3`} >
                        <ul>
                            { shoppingList.items.slice(0, maxNumberOfItems).map(item => 
                                <li key={item.id}
                                    className={clsx({ 'line-through': item.isChecked })}
                                >
                                    {item.name}
                                </li>
                            )}
                            { shoppingList.items.length > maxNumberOfItems &&
                                <li key={`${shoppingList.id}-extra`}>+ {getNumberOfOmittedItems()} More</li>
                            }
                        </ul>
                    </div>
                </div>
            </Link>
        </div>
    );
}