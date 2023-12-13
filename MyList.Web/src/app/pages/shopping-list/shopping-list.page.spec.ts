import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ShoppingListPage } from './shopping-list.page';
import { ListNameComponent } from './components/list-name/list-name.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BackButtonStubComponent } from 'src/app/test/stubs/components';
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
      declarations: [ ShoppingListPage, ListNameComponent, BackButtonStubComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDividerModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: ShoppingListService, useValue: jasmine.createSpyObj<ShoppingListService>('ShoppingListService', ['getShoppingListById']) },
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
});
