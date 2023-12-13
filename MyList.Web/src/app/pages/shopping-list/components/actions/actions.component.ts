import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  @Input() acceptIcon: string = 'check';
  @Input() declineIcon: string = 'close';

  @Output() acceptEvent = new EventEmitter<void>();
  @Output() declineEvent = new EventEmitter<void>();

  public accept(): void {
    this.acceptEvent.emit();
  }

  public decline(): void {
    this.declineEvent.emit();
  }
}
