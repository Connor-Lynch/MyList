import { ShoppingList } from "src/app/models/shopping-list";

export interface EditableShoppingListItem {
  item: ShoppingList,
  selected: boolean,
  editing: boolean,
}
