import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListOverviewComponent } from './list-overview.component';
import { ShoppingListItemBuilder } from 'src/app/test/builders/shopping-list-item.builder';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOverviewComponent ]
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
    expect(component).toBeTruthy();
  });

  it('should show an overview of items', () => {
    const listOverview = de.query(By.css('.list-overview'));

    expect(listOverview).toBeTruthy();
  });

  it('should show an a overview of hidden items', () => {
    const hiddenItems = de.query(By.css('.hidden-items'));

    expect(hiddenItems).toBeTruthy();
  });

  it('should not show overview of hidden items if there are three or less items', () => {
    component.items = [ShoppingListItemBuilder.create().build()];
    fixture.detectChanges();

    const hiddenItems = de.query(By.css('.hidden-items'));

    expect(hiddenItems).toBeFalsy();
  });

});
