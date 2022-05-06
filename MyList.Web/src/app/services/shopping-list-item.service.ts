import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ShoppingList } from "../models/shopping-list";
import { ShoppingListItem } from "../models/shopping-list-item";
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})

export class ShoppingListItemService {
  private apiRootUrl: string;

  constructor(
    public http: HttpClient
  ) {
    this.apiRootUrl = AppConfiguration.Setting().apiUrl;
  }

  public addShoppingListItem(newList: ShoppingListItem): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingListItems/Add`;
    return this.http.post<ShoppingList>(endpoint, newList).pipe(
    );
  }

  public updateShoppingListItem(updatedList: ShoppingListItem): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingListItems/Update`;
    return this.http.put<ShoppingList>(endpoint, updatedList).pipe(
    );
  }

  public removeShoppingListItem(id: string): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingListItems/Delete/${id}`;
    return this.http.delete<ShoppingList>(endpoint).pipe(
    );
  }

}
