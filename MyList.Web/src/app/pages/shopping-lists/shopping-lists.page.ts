import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss']
})
export class ShoppingListsPage implements OnInit {
  shoppingLists$: Observable<ShoppingList[]>;

  constructor(
    public shoppingListService: ShoppingListService,
    public dialog: MatDialog
    ) {
    this.shoppingLists$ = shoppingListService.getAllShoppingLists();
  }

  ngOnInit(): void {
  }

  toggleListAdd() {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '250px'
    });
  }

  deleteShoppingList(id: string) {
    this.shoppingListService.removeShoppingList(id)
      .pipe(take(1))
      .subscribe(() => this.shoppingLists$ = this.shoppingListService.getAllShoppingLists());
  }
}
