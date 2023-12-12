import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { BackButtonComponent } from "./back-button.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [BackButtonComponent],
  exports: [BackButtonComponent]
})
export class BackButtonModule {}
