import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-ase-list',
  templateUrl: './order-ase-list.component.html',
  styleUrls: ['./order-ase-list.component.css'],
})
export class OrderAseListComponent implements OnInit {
  @Input() fromParent;
  order;
  constructor() {}

  ngOnInit(): void {
    this.order = this.fromParent.orderDetails;
    console.log(this.order);
  }
}
