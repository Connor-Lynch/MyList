import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter<string>();
  @Output() declineEvent = new EventEmitter<void>();

  public formGroup: FormGroup;
  public readonly controlName = 'name';

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.controlName]: []
    });
  }

  public accept(): void {
    const newValue = this.formGroup.controls[this.controlName].value?.trim();
    newValue ? this.acceptEvent.emit(newValue) : this.cancel();
  }

  public cancel(): void {
    this.declineEvent.emit();
  }
}
