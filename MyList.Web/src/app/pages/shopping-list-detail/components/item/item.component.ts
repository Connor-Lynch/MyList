import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';
import { ItemFormFields } from './models/item-form-fields';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() set item(item: ShoppingListItem) {
    this._item = item;
    this.initItem(item);
  }
  get item(): ShoppingListItem {
    return this._item;
  }
  @Input() selectedItemId: string;

  @Output() selectedEvent = new EventEmitter<string>();

  public formGroup: FormGroup;
  public readonly formFields = ItemFormFields;
  public selected: boolean;

  private _item: ShoppingListItem;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      [ItemFormFields.Checked]: [false],
      [ItemFormFields.Name]: []
    })
  }

  public selectItem(): void {
    if (!this.selectedItemId || this.selectedItemId === this.item.id) {
      this.selected = !this.selected;
      this.selectedEvent.emit(this.selected ? this.item.id : null);
    }
  }

  private initItem(item: ShoppingListItem): void {
    this.formGroup.controls[ItemFormFields.Checked].setValue(item.isChecked);
    this.formGroup.controls[ItemFormFields.Name].setValue(item.name);
  }
}
