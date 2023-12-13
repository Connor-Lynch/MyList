import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ListState } from './services/list-state.service';

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
export class ItemsComponent implements OnInit, ControlValueAccessor {
  public itemsControl = new FormControl([]);
  public disabled: boolean;
  public listState: ListState;

  public ngOnInit(): void {
    this.listState = new ListState();
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
}
