import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent {
  public addListForm = this.formBuilder.group({
    listName: ['']
  });

  constructor(
    public shoppingListService: ShoppingListService,
    private router: Router,
    public dialogRef: MatDialogRef<AddListDialogComponent>,
    public formBuilder: UntypedFormBuilder
  ) { }

  saveNewList() {
    const newListName = this.addListForm.get('listName').value;
    if (newListName) {
      const newShoppingList = {
        name: newListName
      } as ShoppingList;

      this.shoppingListService.addShoppingList(newShoppingList)
        .pipe(take(1))
        .subscribe((newList) => {
          this.router.navigateByUrl(`/shopping-list-detail/${newList.id}`);
          this.dialogRef.close();
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
