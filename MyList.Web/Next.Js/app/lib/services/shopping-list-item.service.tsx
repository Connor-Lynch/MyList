import { ShoppingList } from "../models/shopping-list";
import { ShoppingListItem } from "../models/shopping-list-item";

const apiRootUrl = 'https://localhost:44321/api';

export async function postShoppingListItem(shoppingListItem: ShoppingListItem): Promise<ShoppingList> {
  let endpoint = `${apiRootUrl}/ShoppingListItems/Add`;
  return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shoppingListItem),
    })
    .then(res => res.json())
    .catch(err => handleError(err));
}

export async function putShoppingListItem(shoppingListItem: ShoppingListItem): Promise<ShoppingList> {
    let endpoint = `${apiRootUrl}/ShoppingListItems/Update`;
    return fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoppingListItem),
      })
      .then(res => res.json())
      .catch(err => handleError(err));
}

export async function removeShoppingListItem(shoppingListItem: ShoppingListItem): Promise<ShoppingList> {
  let endpoint = `${apiRootUrl}/ShoppingListItems/Delete/${shoppingListItem.id}`;
  return fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .catch(err => handleError(err));
}

function handleError(err: Error): void {
    console.log(err);
    throw err;
}