import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { take } from 'rxjs/operators';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.page.html',
  styleUrls: ['./shopping-list-detail.page.scss']
})
export class ShoppingListDetailPage {
  public editItemForm = this.formBuilder.group({
    newItemName: ['']
  });
  public shoppingList$: Observable<ShoppingList>;
  public selectedItem: ShoppingListItem;
  public editInProgress: boolean = false;
  public itemUnderEditId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public shoppingListService: ShoppingListService,
    public shoppingListItemService: ShoppingListItemService,
    public formBuilder: UntypedFormBuilder
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
    this.editItemForm.get('newItemName').setValue(this.selectedItem.name);
    this.itemUnderEditId = id;
    this.editInProgress = true;
  }

  editEvent(inProgress: boolean) {
    this.editInProgress = inProgress;
    this.selectedItem = null;

    if(!inProgress) {
      this.clearSelection();
    }
  }

  shoppingListUpdated(updatedShoppingList: Observable<ShoppingList>) {
    this.shoppingList$ = updatedShoppingList;

    this.editEvent(false)
  }

  itemChecked(id: string) {
    this.shoppingList$.subscribe((list) => {
      const item = list.items.find((i) => i.id === id);

      this.shoppingListItemService.updateShoppingListItem(item)
        .pipe(take(1))
        .subscribe((updatedShoppingList) =>
          this.shoppingList$ = of(updatedShoppingList)
        );
    });
  }

  private clearSelection() {
    this.selectedItem = null;
    this.itemUnderEditId = null;
  }
}
