import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  private shoppingListId: string;
  public addItemForm = this.formBuilder.group({
    itemName: ['']
  });
  public addNewItem: boolean = false;

  @Input() externalEditInProgress: boolean;
  @Output() itemBeingAddedEvent = new EventEmitter<boolean>();
  @Output() shoppingListUpdatedEvent = new EventEmitter<Observable<ShoppingList>>();

  constructor(
    private activatedRoute: ActivatedRoute,
    public shoppingListItemService: ShoppingListItemService,
    public formBuilder: FormBuilder
  ) {
    this.shoppingListId = this.activatedRoute.snapshot.paramMap.get('shoppingListId');
  }

  toggleAddNewItem() {
    this.addItemForm.get('itemName').setValue('');
    this.addNewItem = !this.addNewItem;
    this.itemBeingAddedEvent.emit(this.addNewItem);
  }

  saveItem() {
    const newItemName = this.addItemForm.get('itemName').value;
    if (newItemName) {
      var newItem = {
        name: newItemName,
        shoppingListId: this.shoppingListId
      } as ShoppingListItem;

      this.shoppingListItemService.addShoppingListItem(newItem)
        .pipe(take(1))
        .subscribe((updatedShoppingList) =>
          this.shoppingListUpdatedEvent.emit(of(updatedShoppingList))
        );

      this.toggleAddNewItem();
    }
  }
}
