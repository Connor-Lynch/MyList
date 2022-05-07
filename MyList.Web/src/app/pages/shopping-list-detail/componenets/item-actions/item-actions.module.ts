import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ItemActionsComponent } from "./item-actions.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports:[
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ItemActionsComponent],
  exports: [ItemActionsComponent]
})
export class ItemActionsModule {}
