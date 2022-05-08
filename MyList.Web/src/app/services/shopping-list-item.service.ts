import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ShoppingList } from "../models/shopping-list";
import { ShoppingListItem } from "../models/shopping-list-item";
import { AppConfiguration } from "read-appsettings-json";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ShoppingListItemService {
  private apiRootUrl: string;

  constructor(
    public http: HttpClient,
    public snackBar: MatSnackBar
  ) {
    this.apiRootUrl = AppConfiguration.Setting().apiUrl;
  }

  public addShoppingListItem(newList: ShoppingListItem): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingListItems/Add`;
    return this.http.post<ShoppingList>(endpoint, newList).pipe(
      catchError(e => this.handleError("Unable to Add Item", e))
    );
  }

  public updateShoppingListItem(updatedList: ShoppingListItem): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingListItems/Update`;
    return this.http.put<ShoppingList>(endpoint, updatedList).pipe(
      catchError(e => this.handleError("Unable to Update Item", e))
    );
  }

  public removeShoppingListItem(id: string): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingListItems/Delete/${id}`;
    return this.http.delete<ShoppingList>(endpoint).pipe(
      catchError(e => this.handleError("Unable to Remove Item", e))
    );
  }

  private handleError(message: string, error): never {
    this.snackBar.open(message, "Dismiss")
    throw error;
  }
}
