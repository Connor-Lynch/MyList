import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ListState } from '../../services/list-state.service';
import { EditItemStubComponent } from 'src/app/test/stubs/components';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent, EditItemStubComponent ],
      imports: [ MatButtonModule, MatIconModule, MatCheckboxModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    component.listState = new ListState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleAddNewItem', () => {
    it('should call tryAddItem', () => {
      // Arrange
      const tryAddItemSpy = spyOn(component.listState, 'tryAddItem');

      // Act
      component.toggleAddNewItem();

      // Assert
      expect(tryAddItemSpy).toHaveBeenCalled();
    });

    it('should emit listStateChanged', () => {
      // Arrange
      const listStateChangedSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.toggleAddNewItem();

      // Assert
      expect(listStateChangedSpy).toHaveBeenCalled();
    });
  });

  describe('addItem', () => {
    it('should emit addItemEvent', () => {
      // Arrange
      const newItem = 'new item';
      const addItemEventSpy = spyOn(component.addItemEvent, 'emit');

      // Act
      component.addItem(newItem);

      // Assert
      expect(addItemEventSpy).toHaveBeenCalledWith(newItem);
    });

    it('should call tryAddItem', () => {
      // Arrange
      const tryAddItemSpy = spyOn(component.listState, 'tryAddItem');

      // Act
      component.addItem('new item');

      // Assert
      expect(tryAddItemSpy).toHaveBeenCalled();
    });

    it('should emit listStateChanged', () => {
      // Arrange
      const listStateChangedSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.addItem('new item');

      // Assert
      expect(listStateChangedSpy).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should call tryAddItem', () => {
      // Arrange
      const tryAddItemSpy = spyOn(component.listState, 'tryAddItem');

      // Act
      component.cancel();

      // Assert
      expect(tryAddItemSpy).toHaveBeenCalled();
    });

    it('should emit listStateChanged', () => {
      // Arrange
      const listStateChangedSpy = spyOn(component.listStateChange, 'emit');

      // Act
      component.cancel();

      // Assert
      expect(listStateChangedSpy).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should render add button', () => {
      // Act
      const addButton = fixture.debugElement.query(By.css('#add-button'));

      // Assert
      expect(addButton).toBeTruthy();
    });

    it('should disable add button when there is an item under edit', () => {
      // Arrange
      component.listState.tryEditItem('itemId');
      fixture.detectChanges();

      // Act
      const addButton = fixture.debugElement.query(By.css('#add-button'));

      // Assert
      expect(addButton.attributes['disabled']).toBeTruthy();
    });

    it('should disable add button when add is in progress', () => {
      // Arrange
      component.listState.tryAddItem();
      fixture.detectChanges();

      // Act
      const addButton = fixture.debugElement.query(By.css('#add-button'));

      // Assert
      expect(addButton.attributes['disabled']).toBeTruthy();
    });

    describe('addInProgress', () => {
      beforeEach(() => {
        component.listState.tryAddItem();
        fixture.detectChanges();
      });

      it('should render checkbox', () => {
        // Act
        const checkbox = fixture.debugElement.query(By.css('#checkbox'));

        // Assert
        expect(checkbox).toBeTruthy();
      });

      it('should disable checkbox', () => {
        // Act
        const checkbox = fixture.debugElement.query(By.css('#checkbox'));

        // Assert
        expect(checkbox.classes['mat-mdc-checkbox-disabled']).toBeTruthy();
      });

      it('should render editItem', () => {
        // Act
        const editItem = fixture.debugElement.nativeElement.querySelector('app-edit-item');

        // Assert
        expect(editItem).toBeTruthy();
      });
    });
  });
});
