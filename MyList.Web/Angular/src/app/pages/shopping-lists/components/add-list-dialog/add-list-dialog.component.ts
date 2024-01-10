import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppRoutes } from 'src/app/models/app-routes';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public readonly controlName = 'listName';
  private destroy$ = new Subject<void>();

  constructor(
    public shoppingListService: ShoppingListService,
    private router: Router,
    public dialogRef: MatDialogRef<AddListDialogComponent>,
    public formBuilder: UntypedFormBuilder
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.controlName]: ['']
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public saveNewList(): void {
    const newListName = this.formGroup.get(this.controlName).value?.trim();

    if (!newListName) {
      this.cancel();
    }

    const newShoppingList: ShoppingList = {
      name: newListName,
      id: null,
      createdDate: null,
      items: null
    };

    this.saveNewShoppingList(newShoppingList);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private saveNewShoppingList(newList: ShoppingList): void {
    this.shoppingListService.addShoppingList(newList)
    .pipe(
      tap((newList) => {
        this.router.navigateByUrl(`/${AppRoutes.shoppingList.route}/${newList.id}`);
        this.dialogRef.close();
      }),
      takeUntil(this.destroy$),
    )
    .subscribe();
  }
}
