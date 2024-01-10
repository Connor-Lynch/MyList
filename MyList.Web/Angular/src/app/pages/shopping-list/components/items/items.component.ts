import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ListState } from './services/list-state.service';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { ActivatedRoute } from '@angular/router';
import { AppRoutes } from 'src/app/models/app-routes';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemsComponent),
      multi: true,
    },
  ],
})
export class ItemsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public itemsControl = new FormControl([]);
  public disabled: boolean;
  public listState: ListState;

  private shoppingListId: string;
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private shoppingListItemService: ShoppingListItemService) { }

  public ngOnInit(): void {
    this.shoppingListId = this.activatedRoute.snapshot.paramMap.get(AppRoutes.shoppingList.data);

    this.listState = new ListState();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addItem(newItemName: string): void {
    const newItem: ShoppingListItem =  {
      name: newItemName,
      id: null,
      shoppingListId: this.shoppingListId,
      isChecked: false,
      sortOrder: null,
    };

    this.saveNewItem(newItem);
  }

  public itemChanged(): void {
    this.itemsControl.setValue(this.itemsControl.value.filter(i => i));
    this.onChange(this.itemsControl.value);
  }

  public writeValue(value: ShoppingListItem[]): void {
    this.itemsControl.setValue(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.itemsControl.disable() : this.itemsControl.enable();
  }

  private onChange = (value: ShoppingListItem[] | null): void => undefined;
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public onTouched = (): void => undefined;
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private saveNewItem(newItem: ShoppingListItem): void {
    this.shoppingListItemService.addShoppingListItem(newItem).pipe(
      tap((shoppingList) => {
        this.itemsControl.setValue(shoppingList.items);
        this.itemChanged();
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
