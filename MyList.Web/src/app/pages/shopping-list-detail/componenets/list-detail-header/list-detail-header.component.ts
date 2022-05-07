import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-list-detail-header',
  templateUrl: './list-detail-header.component.html',
  styleUrls: ['./list-detail-header.component.scss']
})
export class ListDetailHeaderComponent implements OnInit {
  isEditingName: boolean = false;
  newName: string;

  @Input() externalEditInProgress: boolean;
  @Input() shoppingList: ShoppingList;

  @Output() headerBeingEditedEvent = new EventEmitter<boolean>();
  @Output() shoppingListUpdatedEvent = new EventEmitter<Observable<ShoppingList>>();

  constructor(
    public shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
  }

  editListName() {
    this.isEditingName = !this.isEditingName;
    this.newName = this.shoppingList.name;
    this.headerBeingEditedEvent.emit(this.isEditingName);
  }

  saveEdit() {
    this.shoppingList.name = this.newName;

    this.shoppingListService.updateShoppingList(this.shoppingList)
      .pipe(take(1))
      .subscribe((updatedShoppingList) =>
        this.shoppingListUpdatedEvent.emit(of(updatedShoppingList))
      );

    this.editListName();
  }
}
