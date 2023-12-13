import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { ActionsStubComponent } from 'src/app/test/stubs/components';
import { ShoppingListItemService } from 'src/app/services/shopping-list-item.service';
import { ListState } from '../../services/list-state.service';
import { ItemFormFields } from './models/item-form-fields';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { of } from 'rxjs';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let shoppingListItemServiceSpy: jasmine.SpyObj<ShoppingListItemService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent, ActionsStubComponent ],
      imports: [
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ShoppingListItemService, useValue: jasmine.createSpyObj<ShoppingListItemService>('ShoppingListItemService', ['updateShoppingListItem', 'removeShoppingListItem']) },
      ],
    })
    .compileComponents();

    shoppingListItemServiceSpy = TestBed.inject(ShoppingListItemService) as jasmine.SpyObj<ShoppingListItemService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.listState = new ListState();
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
      Object.keys(ItemFormFields).forEach(key => {
        expect(component.formGroup.controls[ItemFormFields[key]]).toBeTruthy();
      })
    });

    describe('isCheckedChanged', () => {
      let onChangeSpy: jasmine.Spy;
      let mockItem = ShoppingListItemBuilder.create().build();

      beforeEach(() => {
        onChangeSpy = jasmine.createSpy()
        component.writeValue(mockItem);
        shoppingListItemServiceSpy.updateShoppingListItem.and.returnValue(of(ShoppingListBuilder.create().build()));
      });

      describe('value changed', () => {
        it('should call service to update item', fakeAsync(() => {
          // Act
          component.formGroup.controls[ItemFormFields.IsChecked].setValue(true);
          flush();

          // Assert
          expect(shoppingListItemServiceSpy.updateShoppingListItem).toHaveBeenCalled();
        }));

        it('should call on change', fakeAsync(() => {
          // Arrange
          component.registerOnChange(onChangeSpy);

          // Act
          component.formGroup.controls[ItemFormFields.IsChecked].setValue(true);
          flush();

          // Assert
          expect(onChangeSpy).toHaveBeenCalled();
        }));
      });

      describe('value not changed', () => {
        it('should call service to update item', fakeAsync(() => {
          // Act
          component.formGroup.controls[ItemFormFields.IsChecked].setValue(false);
          flush();

          // Assert
          expect(shoppingListItemServiceSpy.updateShoppingListItem).not.toHaveBeenCalled();
        }));

        it('should call on change', fakeAsync(() => {
          // Arrange
          component.registerOnChange(onChangeSpy);

          // Act
          component.formGroup.controls[ItemFormFields.IsChecked].setValue(false);
          flush();

          // Assert
          expect(onChangeSpy).not.toHaveBeenCalled();
        }));
      });
    });
  });

  describe('isSelected', () => {
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      component.writeValue(mockItem);
    });

    it('should return true if item id equals listState selectedId', () => {
      // Arrange
      component.listState.trySelectItem(mockItem.id);

      // Act
      const result = component.isSelected();

      // Assert
      expect(result).toBeTrue();
    });

    it('should return false if item id does not equal listState selectedId', () => {
      // Arrange
      component.listState.trySelectItem('invalid');

      // Act
      const result = component.isSelected();

      // Assert
      expect(result).toBeFalse();
    });

    it('should return false if selectedId is null', () => {
      // Act
      const result = component.isSelected();

      // Assert
      expect(result).toBeFalsy();
    });
  });

  describe('isUnderEdit', () => {
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      component.writeValue(mockItem);
    });

    it('should return true if item id equals listState isUnderEdit', () => {
      // Arrange
      component.listState.tryEditItem(mockItem.id);

      // Act
      const result = component.isUnderEdit();

      // Assert
      expect(result).toBeTrue();
    });

    it('should return false if item id does not equal listState isUnderEdit', () => {
      // Arrange
      component.listState.tryEditItem('invalid');

      // Act
      const result = component.isUnderEdit();

      // Assert
      expect(result).toBeFalse();
    });

    it('should return false if isUnderEdit is null', () => {
      // Act
      const result = component.isUnderEdit();

      // Assert
      expect(result).toBeFalsy();
    });
  });

  describe('selectItem', () => {
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      component.writeValue(mockItem);
    });

    it('should call trySelectItem on listState', () => {
      // Arrange
      const trySelectItemSpy = spyOn(component.listState, 'trySelectItem');

      // Act
      component.selectItem();

      // Assert
      expect(trySelectItemSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should emit listStateChange', () => {
      // Arrange
      const emitSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.selectItem();

      // Assert
      expect(emitSpy).toHaveBeenCalledWith(component.listState);
    });
  });

  describe('editItem', () => {
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      component.writeValue(mockItem);
    });

    it('should call tryEditItem on listState', () => {
      // Arrange
      const tryEditItemSpy = spyOn(component.listState, 'tryEditItem');

      // Act
      component.editItem();

      // Assert
      expect(tryEditItemSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should emit listStateChange', () => {
      // Arrange
      const emitSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.editItem();

      // Assert
      expect(emitSpy).toHaveBeenCalledWith(component.listState);
    });
  });

  describe('acceptEdit', () => {
    let onChangeSpy: jasmine.Spy;
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      onChangeSpy = jasmine.createSpy()
      component.writeValue(mockItem);
      shoppingListItemServiceSpy.updateShoppingListItem.and.returnValue(of(ShoppingListBuilder.create().build()));
    });

    it('should call service to update item', fakeAsync(() => {
      // Act
      component.acceptEdit();
      flush();

      // Assert
      expect(shoppingListItemServiceSpy.updateShoppingListItem).toHaveBeenCalled();
    }));

    it('should call on change', fakeAsync(() => {
      // Arrange
      component.registerOnChange(onChangeSpy);

      // Act
      component.acceptEdit();
      flush();

      // Assert
      expect(onChangeSpy).toHaveBeenCalled();
    }));

    it('should call trySelectItem on listState', () => {
      // Arrange
      const trySelectItemSpy = spyOn(component.listState, 'trySelectItem');

      // Act
      component.selectItem();

      // Assert
      expect(trySelectItemSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should call tryEditItem on listState', () => {
      // Arrange
      const tryEditItemSpy = spyOn(component.listState, 'tryEditItem');

      // Act
      component.editItem();

      // Assert
      expect(tryEditItemSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should emit listStateChange', () => {
      // Arrange
      const emitSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.selectItem();

      // Assert
      expect(emitSpy).toHaveBeenCalledWith(component.listState);
    });
  });

  describe('cancelEdit', () => {
    let onChangeSpy: jasmine.Spy;
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      onChangeSpy = jasmine.createSpy()
      component.writeValue(mockItem);
      shoppingListItemServiceSpy.updateShoppingListItem.and.returnValue(of(ShoppingListBuilder.create().build()));
    });

    it('should call tryEditItem on listState', () => {
      // Arrange
      const tryEditItemSpy = spyOn(component.listState, 'tryEditItem');

      // Act
      component.editItem();

      // Assert
      expect(tryEditItemSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should emit listStateChange', () => {
      // Arrange
      const emitSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.selectItem();

      // Assert
      expect(emitSpy).toHaveBeenCalledWith(component.listState);
    });

    it('should set form group name back to pristine value', () => {
      // Arrange
      const oldValue = 'old value';
      component.formGroup.controls[ItemFormFields.Name].setValue(oldValue);

      // Act
      component.cancelEdit();

      // Assert
      expect(component.formGroup.controls[ItemFormFields.Name].value).not.toEqual(oldValue);
      expect(component.formGroup.controls[ItemFormFields.Name].value).toEqual(mockItem.name);
    });

    it('should not call on change', fakeAsync(() => {
      // Arrange
      component.registerOnChange(onChangeSpy);

      // Act
      component.cancelEdit();
      flush();

      // Assert
      expect(onChangeSpy).not.toHaveBeenCalled();
    }));
  });

  describe('deleteItem', () => {
    let onChangeSpy: jasmine.Spy;
    let mockItem = ShoppingListItemBuilder.create().build();

    beforeEach(() => {
      onChangeSpy = jasmine.createSpy()
      component.writeValue(mockItem);
      shoppingListItemServiceSpy.removeShoppingListItem.and.returnValue(of(ShoppingListBuilder.create().build()));
    });

    it('should call remove on shopping list item service', fakeAsync(() => {
      // Act
      component.deleteItem();
      flush();

      // Assert
      expect(shoppingListItemServiceSpy.removeShoppingListItem).toHaveBeenCalledWith(mockItem.id);
    }));

    it('should call on change with null', fakeAsync(() => {
      // Arrange
      component.registerOnChange(onChangeSpy);

      // Act
      component.deleteItem();
      flush();

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith(null);
    }));
  });

  describe('writeValue', () => {
    it('should set the form control value to the passed value', () => {
      // Arrange
      const newValue = ShoppingListItemBuilder.create().build();

      // Act
      component.writeValue(newValue);

      // Assert
      expect(component.formGroup.controls[ItemFormFields.IsChecked].value).toEqual(newValue.isChecked);
      expect(component.formGroup.controls[ItemFormFields.Name].value).toEqual(newValue.name);
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.formGroup.enable();
    });

    it('should disable form when true is passed', () => {
      // Act
      component.setDisabledState(true);

      // Assert
      expect(component.formGroup.disabled).toBeTruthy();
    });

    it('should enabled form when false is passed', () => {
      // Arrange
      component.formGroup.disable();

      // Act
      component.setDisabledState(false);

      // Assert
      expect(component.formGroup.enabled).toBeTruthy();
    });
  });
});
