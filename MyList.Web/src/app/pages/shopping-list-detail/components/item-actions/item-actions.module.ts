import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ItemActionsComponent } from "./item-actions.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

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
