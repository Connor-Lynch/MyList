import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.page.html',
  styleUrls: ['./shopping-list-detail.page.scss']
})
export class ShoppingListDetailComponent {
  private itemUnderEditBackup: ShoppingListItem;

  shoppingList$: Observable<ShoppingList>;
  selectedItem: ShoppingListItem;
  editInProgress: boolean = false;
  itemUnderEditId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public shoppingListService: ShoppingListService,
    public shoppingListItemService: ShoppingListItemService
  ) {
    const shoppingListId = this.activatedRoute.snapshot.paramMap.get('shoppingListId');
    this.shoppingList$ = this.shoppingListService.getShoppingListById(shoppingListId);
  }

  itemSelected(id: string) {
    if(!this.editInProgress) {
      if(this.selectedItem && this.selectedItem.id === id) {
        this.selectedItem = null;
      }
      else {
        this.shoppingList$.subscribe((list) => {
          this.selectedItem = list.items.find((i) => i.id === id);
        });
      }
    }
  }

  itemUnderEdit(id: string) {
    this.itemUnderEditId = id;
    this.itemUnderEditBackup = _.cloneDeep(this.selectedItem);

    this.editEvent(true);
  }

  editEvent(inProgress: boolean) {
    this.editInProgress = inProgress;

    if(!inProgress) {
      this.endureSelectedItemState();
      this.clearSelection();
    }
  }

  shoppingListUpdated(updatedShoppingList: Observable<ShoppingList>) {
    this.shoppingList$ = updatedShoppingList;
    this.clearSelection();
  }

  private endureSelectedItemState() {
    if(this.selectedItem) {
      this.selectedItem.name = this.itemUnderEditBackup?.name;
    }
  }

  private clearSelection() {
    this.selectedItem = null;
    this.itemUnderEditId = null;
    this.itemUnderEditBackup = null;
  }

}
