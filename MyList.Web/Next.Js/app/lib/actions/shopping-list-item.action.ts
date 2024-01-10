'use server';

import { revalidatePath } from "next/cache";
import { ShoppingListItem } from "../models/shopping-list-item";
import { postShoppingListItem, putShoppingListItem, removeShoppingListItem } from "../services/shopping-list-item.service";

export async function addShoppingListItem(newItem: ShoppingListItem) {
    await postShoppingListItem(newItem);

    revalidatePath('/shopping-lists');
    revalidatePath(`/shopping-list/${newItem.shoppingListId}`);
}

export async function updateShoppingListItem(updatedItem: ShoppingListItem) {
    await putShoppingListItem(updatedItem);

    revalidatePath('/shopping-lists');
    revalidatePath(`/shopping-list/${updatedItem.shoppingListId}`);
}

export async function deleteShoppingListItem(item: ShoppingListItem) {
    await removeShoppingListItem(item);

    revalidatePath('/shopping-lists');
    revalidatePath(`/shopping-list/${item.shoppingListId}`);
}