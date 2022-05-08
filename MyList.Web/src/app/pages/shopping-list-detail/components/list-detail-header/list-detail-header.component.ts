import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-list-detail-header',
  templateUrl: './list-detail-header.component.html',
  styleUrls: ['./list-detail-header.component.scss']
})
export class ListDetailHeaderComponent {
  public isEditingName: boolean = false;
  public editListNameForm = this.formBuilder.group({
    newListName: ['']
  });

  @Input() externalEditInProgress: boolean;
  @Input() shoppingList: ShoppingList;

  @Output() headerBeingEditedEvent = new EventEmitter<boolean>();
  @Output() shoppingListUpdatedEvent = new EventEmitter<Observable<ShoppingList>>();

  constructor(
    public shoppingListService: ShoppingListService,
    public formBuilder: FormBuilder
  ) { }

  editListName() {
    this.isEditingName = !this.isEditingName;
    this.editListNameForm.get('newListName').setValue(this.shoppingList.name);
    this.headerBeingEditedEvent.emit(this.isEditingName);
  }

  saveEdit() {
    const newListName = this.editListNameForm.get('newListName').value;
    if (newListName && newListName !== this.shoppingList.name) {
      this.shoppingList.name = newListName;
      this.shoppingListService.updateShoppingList(this.shoppingList)
        .pipe(take(1))
        .subscribe((updatedShoppingList) =>
          this.shoppingListUpdatedEvent.emit(of(updatedShoppingList))
        );

      this.editListName();
    }
  }
}
