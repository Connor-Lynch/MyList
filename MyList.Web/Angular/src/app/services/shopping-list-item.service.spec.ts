import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ShoppingListItemBuilder } from "../test/builders/shopping-list-item.builder";
import { ShoppingListItemService } from "./shopping-list-item.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    // Assert
    expect(service).toBeTruthy();
  });

  it('should send http request to add a shopping list', () => {
    // Arrange
    const mockShoppingListItem = ShoppingListItemBuilder.create().build();
    const httpSpy = spyOn(service.http, 'post').and.callThrough();

    // Act
    service.addShoppingListItem(mockShoppingListItem);

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingListItems/Add`, mockShoppingListItem);
  });

  it('should send http request to update a shopping list', () => {
    // Arrange
    const mockShoppingListItem = ShoppingListItemBuilder.create().build();
    const httpSpy = spyOn(service.http, 'put').and.callThrough();

    // Act
    service.updateShoppingListItem(mockShoppingListItem);

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingListItems/Update`, mockShoppingListItem);
  });

  it('should send http request to remove a shopping list', () => {
    // Arrange
    const httpSpy = spyOn(service.http, 'delete').and.callThrough();

    // Act
    service.removeShoppingListItem('1');

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingListItems/Delete/1`);
  });
});
