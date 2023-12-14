import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ListState } from '../../services/list-state.service';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      imports: [ MatButtonModule, MatIconModule ]
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
  });
});
