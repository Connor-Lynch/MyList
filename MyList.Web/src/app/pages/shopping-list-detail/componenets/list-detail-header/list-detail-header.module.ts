import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ListDetailHeaderComponent } from './list-detail-header.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports:[
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    FormsModule
  ],
  declarations: [ListDetailHeaderComponent],
  exports: [ListDetailHeaderComponent]
})
export class ListDetailHeaderModule {}
