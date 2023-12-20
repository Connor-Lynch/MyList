import { revalidatePath } from "next/cache";
import { ShoppingList } from "../models/shopping-list";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // ToDo: Revisit This

const apiRootUrl = 'https://localhost:44321/api';

export async function getAllShoppingLists(): Promise<ShoppingList[]> {
    let endpoint = `${apiRootUrl}/ShoppingLists`;
    return fetch(endpoint)
        .then(res => res.json())
        .catch(err => handleError(err));
}

export async function getShoppingListById(id: string): Promise<ShoppingList> {
    let endpoint = `${apiRootUrl}/ShoppingLists/${id}`;
    return fetch(endpoint)
        .then(res => res.json())
        .catch(err => handleError(err));
}

export async function addShoppingList(shoppingList: ShoppingList): Promise<ShoppingList> {
    let endpoint = `${apiRootUrl}/ShoppingLists/Add`;
    return fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoppingList),
      })
      .then(res => res.json())
      .catch(err => handleError(err));
}

export async function deleteShoppingList(shoppingListId: string): Promise<ShoppingList> {
    let endpoint = `${apiRootUrl}/ShoppingLists/Delete/${shoppingListId}`;
    return fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .catch(err => handleError(err));
}

export async function putShoppingList(shoppingList: ShoppingList): Promise<ShoppingList> {
    let endpoint = `${apiRootUrl}/ShoppingLists/Update`;
    return fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoppingList),
      })
      .then(res => res.json())
      .catch(err => handleError(err));
}

function handleError(err: Error): void {
    console.log(err);
    throw err;
}