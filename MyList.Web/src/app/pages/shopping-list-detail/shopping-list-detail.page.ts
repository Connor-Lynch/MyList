import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.page.html',
  styleUrls: ['./shopping-list-detail.page.scss']
})
export class ShoppingListDetailComponent implements OnInit {
  shoppingListId: string;
  shoppingList$: Observable<ShoppingList>;

  addNewItem: boolean = false;
  newItemName: string;

  editItemId: string;
  editItemNewValue: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    public shoppingListItemService: ShoppingListItemService
  ) {
    this.shoppingListId = this.activatedRoute.snapshot.paramMap.get('shoppingListId');
    this.shoppingList$ = this.shoppingListService.getShoppingListById(this.shoppingListId);
  }

  ngOnInit(): void {
  }

  toggleAddNewItem() {
    this.addNewItem = !this.addNewItem;
    this.newItemName = null;
  }

  toggleEditItem(id: string) {
    if (id === this.editItemId) {
      this.editItemId = null;
      this.editItemNewValue = null;
    }
    else {
      this.editItemId = id;
      this.shoppingList$.subscribe((list) => {
        this.editItemNewValue = list.items.find(i => i.id === id).name;
      });
    }
  }

  saveNewItem() {
    var newItem = {
      name: this.newItemName,
      shoppingListId: this.shoppingListId
    } as ShoppingListItem;

    console.log('add')
    console.log(newItem)

    this.shoppingListItemService.addShoppingListItem(newItem)
      .pipe(take(1))
      .subscribe((updatedItem) => this.shoppingList$ = of(updatedItem));

    this.toggleAddNewItem();
  }

  saveEditItem() {
    console.log(this.newItemName)
    this.shoppingList$.subscribe((list) => {
      let item = list.items.find((i) => i.id === this.editItemId);
      item.name = this.editItemNewValue;
      console.log('edit')
      console.log(item)
      this.shoppingList$ = this.shoppingListItemService.updateShoppingListItem(item);
      this.toggleEditItem(this.editItemId);
    })
  }

  deleteItem(id: string) {
    this.shoppingList$ = this.shoppingListItemService.removeShoppingListItem(id);
  }

}
