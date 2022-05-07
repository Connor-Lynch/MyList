import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class AddItemComponent implements OnInit {
  private shoppingListId: string;
  newItemName: string;
  addNewItem: boolean = false;

  @Input() externalEditInProgress: boolean;
  @Output() itemBeingAddedEvent = new EventEmitter<boolean>();
  @Output() shoppingListUpdatedEvent = new EventEmitter<Observable<ShoppingList>>();

  constructor(
    private activatedRoute: ActivatedRoute,
    public shoppingListItemService: ShoppingListItemService
  ) {
    this.shoppingListId = this.activatedRoute.snapshot.paramMap.get('shoppingListId');
  }

  ngOnInit(): void {
  }

  toggleAddNewItem() {
    this.newItemName = null;
    this.addNewItem = !this.addNewItem;
    this.itemBeingAddedEvent.emit(this.addNewItem);
  }

  saveItem() {
    var newItem = {
      name: this.newItemName,
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
