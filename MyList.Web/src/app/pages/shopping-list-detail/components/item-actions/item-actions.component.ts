import { Observable, of } from 'rxjs';
import { ShoppingList } from './../../../../models/shopping-list';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { take } from 'rxjs/operators';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-actions',
  templateUrl: './item-actions.component.html',
  styleUrls: ['./item-actions.component.scss']
})
export class ItemActionsComponent {
  itemUnderEditId: string;

  @Input() item: ShoppingListItem;
  @Input() selectedItem: ShoppingListItem;
  @Input() editItemForm: UntypedFormGroup;
  @Input() shoppingList$: Observable<ShoppingList>;

  @Output() itemUnselectedEvent = new EventEmitter();
  @Output() itemUnderEditEvent = new EventEmitter<string>();
  @Output() shoppingListUpdatedEvent = new EventEmitter<Observable<ShoppingList>>();

  constructor(
    public shoppingListItemService: ShoppingListItemService
  ) { }

  itemUnderEdit(id: string) {
    this.itemUnderEditId = id;
    this.itemUnderEditEvent.emit(this.itemUnderEditId);
  }

  unselectItem(id: string) {
    this.itemUnderEditId = null;
    this.itemUnselectedEvent.emit();
  }

  deleteItem(id: string) {
    this.shoppingListItemService.removeShoppingListItem(id)
      .pipe(take(1))
      .subscribe((updatedShoppingList) =>
        this.shoppingListUpdatedEvent.emit(of(updatedShoppingList))
      );
  }

  saveEditItem() {
    const newItemName = this.editItemForm.get('newItemName').value;
    if (newItemName != this.selectedItem.name) {
      this.selectedItem.name = newItemName;
      this.shoppingListItemService.updateShoppingListItem(this.selectedItem)
        .pipe(take(1))
        .subscribe((updatedShoppingList) =>
          this.shoppingListUpdatedEvent.emit(of(updatedShoppingList))
        );
    }
  }
}
