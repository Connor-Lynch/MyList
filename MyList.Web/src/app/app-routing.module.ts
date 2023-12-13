import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './models/app-routes';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.shoppingLists.route
  },
  {
    path: AppRoutes.shoppingLists.route,
    loadChildren: () => import('./pages/shopping-lists/shopping-lists.module').then(m => m.ShoppingListsPageModule)
  },
  {
    path: 'shopping-list-detail/:shoppingListId',
    loadChildren: () => import('./pages/shopping-list-detail/shopping-list-detail.module').then(m => m.ShoppingListDetailModule)
  },
  {
    path: `${AppRoutes.shoppingList.route}/:${AppRoutes.shoppingList.data}`,
    loadChildren: () => import('./pages/shopping-list/shopping-list.module').then(m => m.ShoppingListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
