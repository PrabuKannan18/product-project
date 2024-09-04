import { Component } from '@angular/core';
import { IProduct } from '../_models/product.models';
import { ProductService } from '../_services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductCardComponent } from './product-card/product-card.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:IProduct[]=[];

  visibility:boolean=true;
 
 
  constructor(private productService:ProductService){}
 
  ngOnInit(){
   this.productService.getProducts().subscribe((responseData)=>{
    this.products = responseData;
   });
 
  }
 
}
