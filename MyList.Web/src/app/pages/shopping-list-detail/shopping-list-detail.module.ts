import { AddItemModule } from './componenets/add-item/add-item.module';
import { ShoppingListDetailComponent } from './shopping-list-detail.page';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ItemActionsModule } from './componenets/item-actions/item-actions.module';
import { ListDetailHeaderModule } from './componenets/list-detail-header/list-detail-header.module';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListDetailComponent
  }
]

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ItemActionsModule,
    AddItemModule,
    ListDetailHeaderModule
  ],
  declarations: [ShoppingListDetailComponent]
})
export class ShoppingListDetailModule {}
