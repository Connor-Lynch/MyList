'use server';

import { RedirectType, redirect } from "next/navigation";
import { ShoppingList } from "../models/shopping-list";
import { addShoppingList, deleteShoppingList, putShoppingList } from "../services/shopping-list.service";
import { revalidatePath } from "next/cache";

export async function createShoppingList(newListName: string) {
    const newShoppingList: ShoppingList = {
        name: newListName,
        id: '',
        createdDate: undefined,
        items: []
    };
    
    const result = await addShoppingList(newShoppingList);
    
    revalidatePath('/shopping-lists');
    redirect(`/shopping-list/${result.id}`, RedirectType.replace);
}

export async function removeShoppingList(shoppingListId: string) {
    await deleteShoppingList(shoppingListId);
    
    revalidatePath('/shopping-lists');
}

export async function updateShoppingList(shoppingList: ShoppingList) {
    const result = await putShoppingList(shoppingList);

    revalidatePath('/shopping-lists');
    revalidatePath(`/shopping-list/${result.id}`);
}