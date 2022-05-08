import { ListOverviewComponent } from './list-overview.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports:[
    CommonModule,
    MatIconModule
  ],
  declarations: [ListOverviewComponent],
  exports: [ListOverviewComponent]
})
export class ListOverviewModule {}
