import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { ItemStubComponent } from 'src/app/test/stubs/components';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, ItemStubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init listState', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.listState).toBeTruthy();
    });
  });

  describe('writeValue', () => {
    it('should set the form control value to the passed value', () => {
      // Arrange
      const newValue = [
        ShoppingListItemBuilder.create().build(),
        ShoppingListItemBuilder.create().build(),
      ];

      // Act
      component.writeValue(newValue);

      // Assert
      expect(component.itemsControl.value).toEqual(newValue);
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.itemsControl.enable();
    });

    it('should disable form control when true is passed', () => {
      // Act
      component.setDisabledState(true);

      // Assert
      expect(component.itemsControl.disabled).toBeTruthy();
    });

    it('should enabled form control when false is passed', () => {
      // Arrange
      component.itemsControl.disable();

      // Act
      component.setDisabledState(false);

      // Assert
      expect(component.itemsControl.enabled).toBeTruthy();
    });
  });

  describe('itemChanged', () => {
    let onChangeSpy: jasmine.Spy;

    beforeEach(() => (onChangeSpy = jasmine.createSpy()));

    it('should emit control value when called', () => {
      // Arrange
      component.registerOnChange(onChangeSpy);
      const newValue = [
        ShoppingListItemBuilder.create().build(),
        ShoppingListItemBuilder.create().build(),
      ];
      component.writeValue(newValue);

      // Act
      component.itemChanged();

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith(newValue);
    });

    it('should remove all null values from control value when called', () => {
      // Arrange
      component.registerOnChange(onChangeSpy);
      const newValue = [
        ShoppingListItemBuilder.create().build(),
        null,
      ];
      component.writeValue(newValue);

      // Act
      component.itemChanged();

      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith([newValue[0]]);
    });
  });
});
