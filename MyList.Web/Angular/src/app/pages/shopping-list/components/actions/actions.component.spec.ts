import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init default icons', () => {
    // Assert
    expect(component.acceptIcon).toEqual('check');
    expect(component.declineIcon).toEqual('close');
  });

  it('should init acceptLast', () => {
    // Assert
    expect(component.acceptLast).toBeTruthy();
  });

  describe('accept', () => {
    it('should emit acceptEvent when called', () => {
      // Arrange
      const emitSpy = spyOn(component.acceptEvent ,'emit');

      // Act
      component.accept();

      // Assert
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('decline', () => {
    it('should emit declineEvent when called', () => {
      // Arrange
      const emitSpy = spyOn(component.declineEvent ,'emit');

      // Act
      component.decline();

      // Assert
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    describe('accept', () => {
      it('should render an accept button', () => {
        // Act
        const acceptButton = fixture.debugElement.query(By.css('#accept-button'));

        // Assert
        expect(acceptButton).toBeTruthy();
      });

      it('should call accept when clicked', () => {
        // Arrange
        const acceptSpy = spyOn(component, 'accept');
        const acceptButton = fixture.debugElement.query(By.css('#accept-button'));

        // Act
        acceptButton.triggerEventHandler('click', {});

        // Assert
        expect(acceptSpy).toHaveBeenCalled();
      });
    });

    describe('decline', () => {
      it('should render an decline button', () => {
        // Act
        const declineButton = fixture.debugElement.query(By.css('#decline-button'));

        // Assert
        expect(declineButton).toBeTruthy();
      });

      it('should call decline when clicked', () => {
        // Arrange
        const declineSpy = spyOn(component, 'decline');
        const declineButton = fixture.debugElement.query(By.css('#decline-button'));

        // Act
        declineButton.triggerEventHandler('click', {});

        // Assert
        expect(declineSpy).toHaveBeenCalled();
      });
    });
  });
});
