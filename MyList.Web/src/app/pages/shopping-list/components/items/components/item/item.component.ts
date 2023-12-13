import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemFormFields } from './models/item-form-fields';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ListState } from '../../services/list-state.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemComponent),
      multi: true,
    },
  ],
})
export class ItemComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() listState: ListState;
  @Output() listStateChange = new EventEmitter<ListState>();

  public formGroup: FormGroup;
  public readonly formFields = ItemFormFields;
  public isSelected = (): boolean => this.listState.selectedId && this.listState.selectedId === this.pristineValue?.id;
  public isUnderEdit = (): boolean => this.listState.itemUnderEditId && this.listState.itemUnderEditId === this.pristineValue?.id;

  private pristineValue: ShoppingListItem;
  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private shoppingListItemService: ShoppingListItemService) {}

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [ItemFormFields.IsChecked]: [],
      [ItemFormFields.Name]: [],
    });

    this.initFormSubscriptions();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectItem(): void {
    this.listState.trySelectItem(this.pristineValue.id);
    this.listStateChange.emit(this.listState);
  }

  public editItem(): void {
    this.listState.tryEditItem(this.pristineValue.id);
    this.listStateChange.emit(this.listState);
  }

  public acceptEdit() {
    this.editItem();
    this.selectItem();

    const updatedItem: ShoppingListItem = {
      ... this.pristineValue,
      name: this.formGroup.controls[ItemFormFields.Name].value,
    };

    this.updateItem(updatedItem);
  }

  public cancelEdit(): void {
    this.editItem();

    this.formGroup.controls[ItemFormFields.Name].setValue(this.pristineValue.name);
  }

  public deleteItem(): void {
    // this.shoppingListItemService.removeShoppingListItem(this.pristineValue.id)
    //   .pipe(
    //     tap(() => this.onChange(null)),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();
    this.onChange(null);
  }

  public writeValue(value: ShoppingListItem): void {
    this.pristineValue = value;

    value?.isChecked
      ? this.formGroup.controls[ItemFormFields.IsChecked].setValue(value.isChecked)
      : this.formGroup.controls[ItemFormFields.IsChecked].setValue(false);

    value?.name
      ? this.formGroup.controls[ItemFormFields.Name].setValue(value.name)
      : this.formGroup.controls[ItemFormFields.Name].setValue(null);
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  private onChange = (value: ShoppingListItem | null): void => undefined;
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public onTouched = (): void => undefined;
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private initFormSubscriptions(): void {
    this.formGroup.controls[ItemFormFields.IsChecked].valueChanges.pipe(
      tap((newValue) => this.isCheckedChanged(newValue)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private isCheckedChanged(newValue: boolean): void {
    if (!this.pristineValue || newValue === this.pristineValue.isChecked) {
      return;
    }

    const updatedItem: ShoppingListItem = {
      ... this.pristineValue,
      isChecked: newValue,
    };

    this.updateItem(updatedItem);
  }

  private updateItem(updatedItem: ShoppingListItem): void {
    this.shoppingListItemService.updateShoppingListItem(updatedItem)
      .pipe(
        tap(() => this.onChange(updatedItem)),
        takeUntil(this.destroy$)
      ).subscribe();
  }
}
