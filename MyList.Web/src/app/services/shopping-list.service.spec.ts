import { ShoppingListBuilder } from './../test/builders/shopping-list.builder';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  const apiRootUrl = 'test/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ShoppingListService);
    service['apiRootUrl'] = apiRootUrl;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send http request to get all shopping lists', () => {
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    service.getAllShoppingLists();

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists`);
  });

  it('should send get shopping list from all shopping lists if it exists', () => {
    const mockShoppingLists = [ ShoppingListBuilder.create().build() ];
    service['shoppingLists'].next(mockShoppingLists);
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    service.getShoppingListById('1');

    expect(httpSpy).toHaveBeenCalledTimes(0);
  });

  it('should send send http request to get shopping list if does not it exists in current list', () => {
    const mockShoppingLists = [ ShoppingListBuilder.create().build() ];
    service['shoppingLists'].next(mockShoppingLists);
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    service.getShoppingListById('2');

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/2`);
  });

  it('should send send http request to get shopping list if shopping lists is empty', () => {
    const httpSpy = spyOn(service.http, 'get').and.callThrough();

    service.getShoppingListById('1');

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/1`);
  });

  it('should send http request to add a shopping list', () => {
    const mockShoppingList = ShoppingListBuilder.create().build();
    const httpSpy = spyOn(service.http, 'post').and.callThrough();

    service.addShoppingList(mockShoppingList);

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/Add`, mockShoppingList);
  });

  it('should send http request to update a shopping list', () => {
    const mockShoppingList = ShoppingListBuilder.create().build();
    const httpSpy = spyOn(service.http, 'put').and.callThrough();

    service.updateShoppingList(mockShoppingList);

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/Update`, mockShoppingList);
  });

  it('should send http request to remove a shopping list', () => {
    const httpSpy = spyOn(service.http, 'delete').and.callThrough();

    service.removeShoppingList('1');

    expect(httpSpy).toHaveBeenCalledWith(`${apiRootUrl}/ShoppingLists/Delete/1`);
  });
});
