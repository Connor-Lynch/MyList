import { ShoppingListItem } from "@/app/lib/models/shopping-list-item";

export interface EditableShoppingListItem extends ShoppingListItem {
    disabled?: boolean;
}