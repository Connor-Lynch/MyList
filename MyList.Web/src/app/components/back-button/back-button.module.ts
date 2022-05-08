import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BackButtonComponent } from "./back-button.component";

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
