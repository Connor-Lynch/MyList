import { MatDividerModule } from '@angular/material/divider';
import { ShoppingListsPage } from './shopping-lists.page';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ListOverviewModule } from './components/list-overview/list-overview.module';
import { AddListDialogModule } from './components/add-list-dialog/add-list-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';



const routes: Routes = [
  {
    path: '',
    component: ShoppingListsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    ListOverviewModule,
    AddListDialogModule,
    MatDialogModule
  ],
  declarations: [ShoppingListsPage]
})
export class ShoppingListsPageModule {}
