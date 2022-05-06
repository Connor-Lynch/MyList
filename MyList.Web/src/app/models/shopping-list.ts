import { ShoppingListItem } from "./shopping-list-item";

export interface ShoppingList {
  id: string;
  name: string;
  createdDate: Date;
  items: ShoppingListItem[];
}
