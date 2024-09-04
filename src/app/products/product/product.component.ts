import { Component  } from '@angular/core';
import { IProduct } from '../../_models/product.models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
 
  product!:IProduct;
  id:string='';

  constructor(
    private route:ActivatedRoute, 
    private productService:ProductService,
    private router:Router,
  ){}

  ngOnInit(){
    this.route.params.subscribe((params : Params)=>{
      this.id = params['id'];
    });
    
    if(this.id){
      this.productService.getProductById(this.id)!.subscribe(
        (responseData: any) => {
          this.product = responseData;
       });
       console.log(this.product)
    }
  }

  onEdit(){
    this.router.navigate(['product-upsert',this.id])
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onDelete(){
    this.productService.deleteProduct(this.id).subscribe(()=>{
      this.router.navigate(['/'])
    });
  }
}
