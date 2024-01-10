import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListState } from '../../services/list-state.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  @Input() listState: ListState;
  @Output() listStateChange = new EventEmitter<ListState>();
  @Output() addItemEvent = new EventEmitter<string>();

  public toggleAddNewItem(): void {
    this.listState.tryAddItem();
    this.listStateChange.emit(this.listState);
  }

  public addItem(newValue: string): void {
    this.addItemEvent.emit(newValue);
    this.toggleAddNewItem();
  }

  public cancel(): void {
    this.toggleAddNewItem();
  }
}
