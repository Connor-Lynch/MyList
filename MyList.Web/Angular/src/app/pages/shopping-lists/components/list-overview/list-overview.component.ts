import { Component, Input } from '@angular/core';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';

@Component({
  selector: 'app-list-overview',
  templateUrl: './list-overview.component.html',
  styleUrls: ['./list-overview.component.scss']
})
export class ListOverviewComponent {
  @Input() items: ShoppingListItem[];
}
