import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ShoppingList } from './../../models/shopping-list';
import { ShoppingListItemBuilder } from './shopping-list-item.builder';

export class ShoppingListBuilder {
  private _id: string = "1";
  private _name: string = "defaultName";
  private _createdDate: Date = new Date();
  private _items: ShoppingListItem[] = [ ShoppingListItemBuilder.create().build() ];

  constructor() {}

  static create = () => new ShoppingListBuilder();

  withId(id: string): ShoppingListBuilder {
    this._id = id;
    return this;
  }

  withName(name: string): ShoppingListBuilder {
    this._name = name;
    return this;
  }

  withCreatedDate(date: Date): ShoppingListBuilder {
    this._createdDate = date;
    return this;
  }

  withItems(items: ShoppingListItem[]): ShoppingListBuilder {
    this._items = items;
    return this;
  }

  withoutItems(): ShoppingListBuilder {
    this._items = null;
    return this;
  }

  build(): ShoppingList {
    return {
      id: this._id,
      name: this._name,
      createdDate: this._createdDate,
      items: this._items
    } as ShoppingList
  }
}
