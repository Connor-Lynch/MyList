import { updateShoppingList } from "@/app/lib/actions/shopping-list.actrion";
import { ShoppingList } from "@/app/lib/models/shopping-list";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

export default async function UpdateListFormName({ shoppingList, closeEvent, editListName }: { shoppingList: ShoppingList, closeEvent: Function, editListName: Dispatch<SetStateAction<string>> }) {
    const inputName = 'list-name';
    function saveForm(formData: FormData) { 
        const newListName = formData.get(inputName)?.toString().trim();

        newListName && newListName !== shoppingList.name ? 
            updateList(newListName) : 
            closeEvent();
    }

    async function updateList(newListName: string) {
        await updateShoppingList({
            ... shoppingList,
            name: newListName,
        }).then(() => {
            editListName(newListName);
            closeEvent();
        });
    }

    return (
        <form action={saveForm} className="flex justify-between items-center">
            <div className="rounded-md w-full">
                <div className="w-full">
                    <input
                        id="list-name"
                        name={ inputName }
                        defaultValue={ shoppingList.name }
                        type="text"
                        placeholder="New List"
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