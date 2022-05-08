import { AddItemModule } from './components/add-item/add-item.module';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemActionsModule } from './components/item-actions/item-actions.module';
import { ListDetailHeaderModule } from './components/list-detail-header/list-detail-header.module';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';

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
    ReactiveFormsModule,
    FormsModule,
    ItemActionsModule,
    AddItemModule,
    ListDetailHeaderModule,
    BackButtonModule
  ],
  declarations: [ShoppingListDetailComponent]
})
export class ShoppingListDetailModule {}
