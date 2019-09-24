import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-secondpage',
  templateUrl: './secondpage.page.html',
  styleUrls: ['./secondpage.page.scss'],
})
export class SecondpagePage implements OnInit {

  price: any = '';

  constructor(private route: ActivatedRoute) {
    this.price = this.route.snapshot.params['price'];
    alert(this.price);
   }

  ngOnInit() {
  }

}
