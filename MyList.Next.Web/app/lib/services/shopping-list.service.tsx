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

function handleError(err: Error): void {
    console.log(err);
    throw err;
}