import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { AddListDialogComponent } from './add-list-dialog.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports:[
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [AddListDialogComponent],
  exports: [AddListDialogComponent]
})
export class AddListDialogModule {}
