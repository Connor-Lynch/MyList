import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppRoutes } from 'src/app/models/app-routes';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShoppingListFormFields } from './models/shopping-list-form-fields';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss']
})
export class ShoppingListPage implements OnInit, OnDestroy {
  public shoppingList: ShoppingList;

  public formGroup: FormGroup;
  public readonly formFields = ShoppingListFormFields;

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public shoppingListService: ShoppingListService,
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [ShoppingListFormFields.Name]: [],
      [ShoppingListFormFields.Items]: []
    });
    const shoppingListId = this.activatedRoute.snapshot.paramMap.get(AppRoutes.shoppingList.data);
    this.initShoppingList(shoppingListId);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initShoppingList(id: string): void {
    this.shoppingListService.getShoppingListById(id).pipe(
      tap(shoppingList => this.shoppingList = shoppingList),
      tap(() => this.initFormGroup()),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private initFormGroup(): void {
    this.formGroup.controls[ShoppingListFormFields.Name].setValue(this.shoppingList.name);
    this.formGroup.controls[ShoppingListFormFields.Items].setValue(this.shoppingList.items);

    this.formGroup.valueChanges.pipe(
      tap(() => this.formUpdated()),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private formUpdated(): void {
    console.log(this.formGroup.getRawValue());
  }
}
