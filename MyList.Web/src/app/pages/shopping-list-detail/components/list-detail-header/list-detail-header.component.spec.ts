import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ShoppingListBuilder } from 'src/app/test/builders/shopping-list.builder';
import { ListDetailHeaderComponent } from './list-detail-header.component';
import { MatButtonModule } from '@angular/material/button';

describe('ListDetailHeaderComponent', () => {
  let component: ListDetailHeaderComponent;
  let fixture: ComponentFixture<ListDetailHeaderComponent>;
  let de: DebugElement;

  const mockShoppingList = ShoppingListBuilder.create().build();
  const mockShoppingListService = {
    updateShoppingList() { return of(mockShoppingList) }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDetailHeaderComponent ],
      providers: [
        { provide: ShoppingListService, useValue: mockShoppingListService }
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailHeaderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.shoppingList = mockShoppingList;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an edit button', () => {
    const editButton = de.query(By.css('#edit-button'));

    expect(editButton).toBeTruthy();
  });

  it('should emit header being edited event when edit button is clicked', () => {
    const editButton = de.query(By.css('#edit-button'));
    const headerBeingEditedEventSpy = spyOn(component.headerBeingEditedEvent, 'emit');

    editButton.triggerEventHandler('click', {});

    expect(headerBeingEditedEventSpy).toHaveBeenCalledWith(true);
  });

  it('should show edit name form when edit button is clicked', () => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const editNameForm = de.query(By.css('.edit-name-form'));

    expect(editNameForm).toBeTruthy();
  });

  it('should disable edit button when external edit is in progress', () => {
    component.externalEditInProgress = true;
    fixture.detectChanges();

    const editButton = de.query(By.css('#edit-button'));

    expect(editButton.attributes['disabled']).toBeDefined();
  });

  it('should show cancel button when edit button is clicked', () => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const cancelButton = de.query(By.css('#cancel-button'));

    expect(cancelButton).toBeTruthy();
  });

  it('should emit header being edited event when cancel button is clicked', () => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    let cancelButton = de.query(By.css('#cancel-button'));
    const headerBeingEditedEventSpy = spyOn(component.headerBeingEditedEvent, 'emit');

    cancelButton.triggerEventHandler('click', {});

    expect(headerBeingEditedEventSpy).toHaveBeenCalledWith(false);
  });

  it('should show save button when edit button is clicked', () => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('#save-button'));

    expect(saveButton).toBeTruthy();
  });

  it('should not call service if new list name is the same as the old name', () => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    const saveButton = de.query(By.css('#save-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'updateShoppingList');

    saveButton.triggerEventHandler('click', {});

    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should call service when save is clicked', fakeAsync(() => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.editListNameForm.get('newListName').setValue('saveName');

    const saveButton = de.query(By.css('#save-button'));
    const serviceSpy = spyOn(component.shoppingListService, 'updateShoppingList').and.callThrough();

    saveButton.triggerEventHandler('click', {});

    flush();

    expect(serviceSpy).toHaveBeenCalled();
  }));

  it('should emit header being edited event when save button is clicked', fakeAsync(() => {
    const editButton = de.query(By.css('#edit-button'));
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.editListNameForm.get('newListName').setValue('emitName');

    const saveButton = de.query(By.css('#save-button'));
    const headerBeingEditedEventSpy = spyOn(component.headerBeingEditedEvent, 'emit').and.callThrough();

    saveButton.triggerEventHandler('click', {});

    flush();

    expect(headerBeingEditedEventSpy).toHaveBeenCalledWith(false);
  }));
});
