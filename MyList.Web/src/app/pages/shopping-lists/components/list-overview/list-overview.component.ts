import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListItem } from 'src/app/models/shopping-list-item';

@Component({
  selector: 'app-list-overview',
  templateUrl: './list-overview.component.html',
  styleUrls: ['./list-overview.component.scss']
})
export class ListOverviewComponent implements OnInit {

  @Input() items: ShoppingListItem[]

  constructor() { }

  ngOnInit(): void {
  }

}
