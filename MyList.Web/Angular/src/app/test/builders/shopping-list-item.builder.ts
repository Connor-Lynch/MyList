import { ShoppingListItem } from "src/app/models/shopping-list-item";

export class ShoppingListItemBuilder {
  private _id: string = "1";
  private _name: string = "defaultName";
  private _shoppingListId: string = "1";
  private _isChecked: boolean = false;

  constructor() {}

  static create = () => new ShoppingListItemBuilder();

  withId(id: string): ShoppingListItemBuilder {
    this._id = id;
    return this;
  }

  withName(name: string): ShoppingListItemBuilder {
    this._name = name;
    return this;
  }

  withShoppingListId(id: string): ShoppingListItemBuilder {
    this._shoppingListId = id;
    return this;
  }

  withIsChecked(): ShoppingListItemBuilder {
    this._isChecked = true;
    return this;
  }

  build(): ShoppingListItem {
    return {
      id: this._id,
      name: this._name,
      shoppingListId: this._shoppingListId,
      isChecked: this._isChecked
    } as ShoppingListItem
  }
}
