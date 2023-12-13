import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { RouterModule, Routes } from "@angular/router";
import { BackButtonModule } from "src/app/components/back-button/back-button.module";
import { ShoppingListPage } from "./shopping-list.page";
import { ListNameComponent } from './components/list-name/list-name.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemComponent } from './components/items/components/item/item.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListPage
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
    BackButtonModule
  ],
  declarations: [ ShoppingListPage, ListNameComponent, ActionsComponent, ItemsComponent, ItemComponent ]
})
export class ShoppingListPageModule {}
