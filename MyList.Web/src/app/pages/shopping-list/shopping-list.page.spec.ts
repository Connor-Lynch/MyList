import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ShoppingListPage } from './shopping-list.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { of } from 'rxjs';
import { BackButtonStubComponent, ItemsStubComponent, ListNameStubComponent } from 'src/app/test/stubs/components';
import { ShoppingListFormFields } from './models/shopping-list-form-fields';

describe('ShoppingListComponent', () => {
  let component: ShoppingListPage;
  let fixture: ComponentFixture<ShoppingListPage>;
  let shoppingListServiceSpy: jasmine.SpyObj<ShoppingListService>;

  const shoppingListId = '1';
  const mockActiveRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        shoppingListId: shoppingListId
      })
    }
  }

  const mockShoppingListItem = ShoppingListItemBuilder.create().build();
  const mockShoppingList = ShoppingListBuilder.create().withId(mockShoppingListItem.shoppingListId).withItems([mockShoppingListItem]).build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListPage, ListNameStubComponent, BackButtonStubComponent, ItemsStubComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: ShoppingListService, useValue: jasmine.createSpyObj<ShoppingListService>('ShoppingListService', ['getShoppingListById', 'updateShoppingList']) },
      ]
    })
    .compileComponents();

    shoppingListServiceSpy = TestBed.inject(ShoppingListService) as jasmine.SpyObj<ShoppingListService>;

    shoppingListServiceSpy.getShoppingListById.and.returnValue(of(mockShoppingList));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init form group', () => {
      // Act
      component.ngOnInit();

      // Assert
      Object.keys(ShoppingListFormFields).forEach(key => {
        expect(component.formGroup.controls[ShoppingListFormFields[key]]).toBeTruthy();
      })
    });

    it('should get shopping list from service', fakeAsync(() => {
      // Act
      component.ngOnInit();
      flush();

      // Assert
      expect(shoppingListServiceSpy.getShoppingListById).toHaveBeenCalledWith(shoppingListId);
      expect(component.shoppingList).toEqual(mockShoppingList);
    }));

    it('should set the form with values from the shopping list', fakeAsync(() => {
      // Act
      component.ngOnInit();
      flush();

      // Assert
      expect(component.formGroup.controls[ShoppingListFormFields.Name].value).toEqual(mockShoppingList.name);
      expect(component.formGroup.controls[ShoppingListFormFields.Items].value).toEqual(mockShoppingList.items);
    }));
  });

  describe('list name changed', () => {
    beforeEach(() => {
      shoppingListServiceSpy.updateShoppingList.and.returnValue(of(mockShoppingList));
    });

    it('should update shopping list when the name is updated', fakeAsync(() => {
      // Arrange
      const updatedName = 'new name';

      // Act
      component.formGroup.controls[ShoppingListFormFields.Name].setValue(updatedName);
      flush();

      // Assert
      const expectedRequest = {
        ...component.shoppingList,
        name: updatedName
      };
      expect(shoppingListServiceSpy.updateShoppingList).toHaveBeenCalledWith(expectedRequest);
    }));
  });

  describe('template', () => {
    it('should render back button', () => {
      // Act
      const backButton = fixture.debugElement.nativeElement.querySelector('app-back-button');

      // Assert
      expect(backButton).toBeTruthy();
    });

    it('should render list name', () => {
      // Act
      const listName = fixture.debugElement.nativeElement.querySelector('app-list-name');

      // Assert
      expect(listName).toBeTruthy();
    });

    it('should render items', () => {
      // Act
      const items = fixture.debugElement.nativeElement.querySelector('app-items');

      // Assert
      expect(items).toBeTruthy();
    });
  });
});
