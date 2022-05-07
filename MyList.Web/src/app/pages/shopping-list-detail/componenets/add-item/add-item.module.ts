import { FormsModule } from '@angular/forms';
import { AddItemComponent } from './add-item.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports:[
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule
  ],
  declarations: [AddItemComponent],
  exports: [AddItemComponent]
})
export class AddItemModule {}
