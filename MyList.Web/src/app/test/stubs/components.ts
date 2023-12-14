import { Component, EventEmitter, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-actions',
  template: '',
})
export class ActionsStubComponent {
  @Input() acceptIcon: string;
  @Input() declineIcon: string;
  @Input() acceptLast: boolean;

  @Output() acceptEvent = new EventEmitter<void>();
  @Output() declineEvent = new EventEmitter<void>();
}

@Component({
  selector: 'app-list-name',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListNameStubComponent),
      multi: true,
    },
  ],
})
export class ListNameStubComponent implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

@Component({
  selector: 'app-back-button',
  template: '',
})
export class BackButtonStubComponent {
}

@Component({
  selector: 'app-items',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemsStubComponent),
      multi: true,
    },
  ],
})
export class ItemsStubComponent implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

@Component({
  selector: 'app-item',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemStubComponent),
      multi: true,
    },
  ],
})
export class ItemStubComponent implements ControlValueAccessor {
  @Input() listState: any;
  @Output() listStateChange = new EventEmitter<any>();

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

@Component({
  selector: 'app-add-item',
  template: '',
})
export class AddItemStubComponent {
  @Input() listState: any;
  @Output() listStateChange = new EventEmitter<any>();
}
