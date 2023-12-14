import { MatDividerModule } from '@angular/material/divider';
import { ShoppingListsPage } from './shopping-lists.page';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ListOverviewComponent } from './components/list-overview/list-overview.component';
import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationDialogModule
  ],
  declarations: [ ShoppingListsPage, ListOverviewComponent, AddListDialogComponent]
})
export class ShoppingListsPageModule {}
