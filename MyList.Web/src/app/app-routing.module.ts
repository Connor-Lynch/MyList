import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shopping-lists'
  },
  {
    path: 'shopping-lists',
    loadChildren: () => import('./pages/shopping-lists/shopping-lists.module').then(m => m.ShoppingListsPageModule)
  },
  {
    path: 'shopping-list-detail/:shoppingListId',
    loadChildren: () => import('./pages/shopping-list-detail/shopping-list-detail.module').then(m => m.ShoppingListDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
