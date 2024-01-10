import { ConfirmationDialogData } from './../../components/confirmation-dialog/models/confirmation-dialog-data';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';
import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AppRoutes } from 'src/app/models/app-routes';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss']
})
export class ShoppingListsPage implements OnInit, OnDestroy {
  public shoppingLists$: Observable<ShoppingList[]>;
  public readonly appRoutes = AppRoutes;

  private refreshShippingList$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    public shoppingListService: ShoppingListService,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.initShoppingLists();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleListAdd(): void {
    this.dialog.open(AddListDialogComponent);
  }

  public deleteShoppingList(shoppingList: ShoppingList) {
    const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Delete ${shoppingList.name}`,
        affirmativeButtonText: 'Delete',
        affirmativeButtonColor: 'warn',
        negativeButtonText: 'Cancel',
        negativeButtonColor: 'primary'
      } as ConfirmationDialogData
    });

    confirmationDialog?.afterClosed().pipe(
      filter((result) => result),
      switchMap(() => this.shoppingListService.removeShoppingList(shoppingList.id).pipe(
        tap(() => this.refreshShippingList$.next()))
      ),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  private initShoppingLists(): void {
    this.shoppingLists$ = this.refreshShippingList$.pipe(
      startWith(() => null),
      switchMap(() => this.shoppingListService.getAllShoppingLists().pipe()),
    );
  }
}
