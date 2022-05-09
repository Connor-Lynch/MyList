import { ConfirmationDialogData } from './../../components/confirmation-dialog/models/confirmation-dialog-data';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';
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
    this.dialog.open(AddListDialogComponent);
  }

  deleteShoppingList(id: string) {
    this.shoppingLists$.subscribe((list) => {
      const selectedShoppingList = list.find(l => l.id === id);

      const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: `Delete ${selectedShoppingList.name}`,
          affirmativeButtonText: 'Delete',
          affirmativeButtonColor: 'warn',
          negativeButtonText: 'Cancel',
          negativeButtonColor: 'primary'
        } as ConfirmationDialogData
      });

      confirmationDialog?.afterClosed().subscribe(result => {
        if (result) {
          this.shoppingListService.removeShoppingList(id)
            .pipe(take(1))
            .subscribe(() => this.shoppingLists$ = this.shoppingListService.getAllShoppingLists());
        }
      });
    });
  }
}
