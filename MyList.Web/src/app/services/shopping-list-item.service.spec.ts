import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ShoppingListItemBuilder } from "../test/builders/shopping-list-item.builder";
import { ShoppingListItemService } from "./shopping-list-item.service";

describe('ShoppingListService', () => {
  let service: ShoppingListItemService;
  const apiRootUrl = 'test/api';

  const mockSnackBar = {
    open() { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });
    service = TestBed.inject(ShoppingListItemService);
    service['apiRootUrl'] = apiRootUrl;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send http request to add a shopping list', () => {
    const mockShoppingListItem = ShoppingListItemBuilder.create().build();
    const httpSpy = spyOn(service.http, 'post').and.callThrough();

    service.addShoppingListItem(mockShoppingListItem);

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingListItems/Add`, mockShoppingListItem);
  });

  it('should send http request to update a shopping list', () => {
    const mockShoppingListItem = ShoppingListItemBuilder.create().build();
    const httpSpy = spyOn(service.http, 'put').and.callThrough();

    service.updateShoppingListItem(mockShoppingListItem);

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingListItems/Update`, mockShoppingListItem);
  });

  it('should send http request to remove a shopping list', () => {
    const httpSpy = spyOn(service.http, 'delete').and.callThrough();

    service.removeShoppingListItem('1');

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingListItems/Delete/1`);
  });
});
