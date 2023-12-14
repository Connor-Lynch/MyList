import { ShoppingListBuilder } from './../test/builders/shopping-list.builder';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShoppingListService } from './shopping-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
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
    service = TestBed.inject(ShoppingListService);
    service['apiRootUrl'] = apiRootUrl;
  });

  it('should be created', () => {
    // Act
    expect(service).toBeTruthy();
  });

  it('should send http request to get all shopping lists', () => {
    // Arrange
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    // Act
    service.getAllShoppingLists();

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists`);
  });

  it('should get shopping list from all shopping lists if it exists', () => {
    // Arrange
    const mockShoppingLists = [ ShoppingListBuilder.create().build() ];
    service['shoppingLists'].next(mockShoppingLists);
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    // Act
    service.getShoppingListById('1');

    // Assert
    expect(httpSpy).toHaveBeenCalledTimes(0);
  });

  it('should send send http request to get shopping list if does not it exists in current list', () => {
    // Arrange
    const mockShoppingLists = [ ShoppingListBuilder.create().build() ];
    service['shoppingLists'].next(mockShoppingLists);
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    // Act
    service.getShoppingListById('2');

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/2`);
  });

  it('should send send http request to get shopping list if shopping lists is empty', () => {
    // Arrange
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    // Act
    service.getShoppingListById('1');

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/1`);
  });

  it('should send http request to add a shopping list', () => {
    // Arrange
    const mockShoppingList = ShoppingListBuilder.create().build();
    const httpSpy = spyOn(service.http, 'post').and.callThrough();

    // Act
    service.addShoppingList(mockShoppingList);

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/Add`, mockShoppingList);
  });

  it('should send http request to update a shopping list', () => {
    // Arrange
    const mockShoppingList = ShoppingListBuilder.create().build();
    const httpSpy = spyOn(service.http, 'put').and.callThrough();

    // Act
    service.updateShoppingList(mockShoppingList);

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/Update`, mockShoppingList);
  });

  it('should send http request to remove a shopping list', () => {
    // Arrange
    const httpSpy = spyOn(service.http, 'delete').and.callThrough();

    // Act
    service.removeShoppingList('1');

    // Assert
    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/Delete/1`);
  });
});
