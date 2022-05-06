import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from "rxjs";
import { ShoppingList } from "../models/shopping-list";
import { shareReplay, tap } from "rxjs/operators";
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  private shoppingLists = new BehaviorSubject<ShoppingList[]>([]);
  private apiRootUrl: string;

  constructor(
    public http: HttpClient
  ) {
    this.apiRootUrl = AppConfiguration.Setting().apiUrl;
  }

  public getAllShoppingLists(): Observable<ShoppingList[]> {
    const endpoint = `${this.apiRootUrl}/ShoppingLists`;
    return this.http.get<ShoppingList[]>(endpoint).pipe(
      shareReplay(1),
      tap((l) => this.shoppingLists.next(l))
    );
  }

  public getShoppingListById(id: string) {
    if (!this.shoppingListsIsEmpty && this.containsShoppingList(id)) {
      return of(this.shoppingLists.getValue().find(l => l.id === id));
    }
    else {
      return this.getShoppingListFromApiById(id);
    }
  }

  public addShoppingList(newList: ShoppingList): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingLists/Add`;
    return this.http.post<ShoppingList>(endpoint, newList).pipe(
    );
  }

  public updateShoppingList(updatedList: ShoppingList): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingLists/Update`;
    return this.http.put<ShoppingList>(endpoint, updatedList).pipe(
    );
  }

  public removeShoppingList(id: string): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingLists/Delete/${id}`;
    return this.http.delete<ShoppingList>(endpoint).pipe(
    );
  }

  private getShoppingListFromApiById(id: string): Observable<ShoppingList> {
    const endpoint = `${this.apiRootUrl}/ShoppingLists/${id}`;
    return this.http.get<ShoppingList>(endpoint).pipe(
      shareReplay(1),
    );
  }

  private get shoppingListsIsEmpty(): boolean {
    return this.shoppingLists.getValue().length === 0;
  }

  private containsShoppingList(id: string): boolean{
    return this.shoppingLists.getValue().find((l) => l.id === id) != null;
  }
}
