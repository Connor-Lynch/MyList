import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss']
})
export class ShoppingListsPage implements OnInit {
  shoppingLists$: Observable<ShoppingList[]>;
  addNewList: boolean = false;
  newListName: string;

  constructor(
    public shoppingListService: ShoppingListService,
    private router: Router
    ) {
    this.shoppingLists$ = shoppingListService.getAllShoppingLists();
  }

  ngOnInit(): void {
  }

  toggleListAdd() {
    this.addNewList = !this.addNewList;
    this.newListName = null;
  }

  saveNewList() {
    const newShoppingList = {
      name: this.newListName
    } as ShoppingList;

    this.shoppingListService.addShoppingList(newShoppingList)
      .pipe(take(1))
      .subscribe((newList) => this.router.navigateByUrl(`/shopping-list-detail/${newList.id}`));
  }

  deleteShoppingList(id: string) {
    this.shoppingListService.removeShoppingList(id)
      .pipe(take(1))
      .subscribe(() => this.shoppingLists$ = this.shoppingListService.getAllShoppingLists());
  }
}
