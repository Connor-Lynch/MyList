import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-name',
  templateUrl: './list-name.component.html',
  styleUrls: ['./list-name.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListNameComponent),
      multi: true,
    },
  ],
})
export class ListNameComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public formGroup: FormGroup;
  public readonly controlName = 'name';
  public isEditing: boolean;

  private pristineValue: string;
  private destroy$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.controlName]: []
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public edit(): void {
    this.isEditing = true;
    this.pristineValue = this.formGroup.controls[this.controlName].value;
  }

  public acceptEdit(): void {
    this.isEditing = false;
    this.onChange(this.formGroup.controls[this.controlName].value);
  }

  public cancelEdit(): void {
    this.isEditing = false;
    this.formGroup.controls[this.controlName].setValue(this.pristineValue);
  }

  public writeValue(value: string): void {
    this.formGroup?.controls[this.controlName].setValue(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  private onChange = (value: string | null): void => undefined;
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public onTouched = (): void => undefined;
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
