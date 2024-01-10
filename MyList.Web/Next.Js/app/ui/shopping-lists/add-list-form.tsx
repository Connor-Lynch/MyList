'use client';

import { createShoppingList } from "@/app/lib/actions/shopping-list.actrion";

export default function AddListForm({ cancelEvent }: { cancelEvent: Function }) {
    const inputName = 'list-name';
    function saveEvent(formData: FormData) { 
        const newListName = formData.get(inputName)?.toString();

        newListName ? 
            createShoppingList(newListName) : 
            cancelEvent();
    }

    return (
        <>
            <form action={saveEvent}>
                <div className="mb-4">
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="list-name"
                                name={inputName}
                                type="text"
                                placeholder="New List"
                                className="peer block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex justify-between">
                    <button className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded w-full mr-2" onClick={() => cancelEvent()} type="reset">
                        Cancel
                    </button>
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded w-full ml-2" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}