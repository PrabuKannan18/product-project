import { Component, Input } from '@angular/core';
import { IProduct } from '../../_models/product.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: IProduct = {
    id:'',
    name: '',
    price: '',
    brand:'',
    imageUrl: '',
    manufacturedYear:''
  };
  constructor(private router:Router){}

  onDetailsPage(){
    this.router.navigate(['product',this.product.id]);
  }
}
