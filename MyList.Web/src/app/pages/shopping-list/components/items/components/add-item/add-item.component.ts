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

  public addNewItem(): void {
    this.listState.tryAddItem();
    this.listStateChange.emit(this.listState);
  }
}
