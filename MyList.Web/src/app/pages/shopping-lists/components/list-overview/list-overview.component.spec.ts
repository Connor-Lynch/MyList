import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListOverviewComponent } from './list-overview.component';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';
import { MatIconModule } from '@angular/material/icon';

describe('ListOverviewComponent', () => {
  let component: ListOverviewComponent;
  let fixture: ComponentFixture<ListOverviewComponent>;
  let de: DebugElement;

  const items = [
    ShoppingListItemBuilder.create().build(),
    ShoppingListItemBuilder.create().build(),
    ShoppingListItemBuilder.create().build(),
    ShoppingListItemBuilder.create().build()
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOverviewComponent ],
      imports: [ MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.items = items;

    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should show an overview of items', () => {
    // Act
    const listOverview = de.query(By.css('.list-overview'));

    // Assert
    expect(listOverview).toBeTruthy();
  });

  it('should show an a overview of hidden items', () => {
    // Act
    const hiddenItems = de.query(By.css('.hidden-items'));

    // Assert
    expect(hiddenItems).toBeTruthy();
  });

  it('should not show overview of hidden items if there are three or less items', () => {
    // Arrange
    component.items = [ShoppingListItemBuilder.create().build()];
    fixture.detectChanges();

    // Act
    const hiddenItems = de.query(By.css('.hidden-items'));

    // Assert
    expect(hiddenItems).toBeFalsy();
  });

});
