import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {IProduct} from '../../_models/product.models'
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-upsert',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './product-upsert.component.html',
  styleUrl: './product-upsert.component.css'
})


export class ProductUpsertComponent {
    id : string = '';
    isEditMode:boolean=false;
  product:IProduct = {
    id:'',
    name: '',
    price: '',
    brand:'',
    imageUrl: '',
    manufacturedYear:''
  };
  constructor(
    private productService : ProductService,
    private route:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(){
    this.route.params.subscribe((params : Params)=>{
      this.id = params['id'];
    });
   if(this.id){
   this.productService.getProductById(this.id)!.subscribe((product :any)=>{
    this.product = product;
    this.isEditMode = true;
    this.popluateForm();
   })
 
   } 
  }
  
  popluateForm(){
    this.contactForm.patchValue({
      name : this.product.name,
      brand : this.product.brand,
      price : this.product.price,
      imageUrl:this.product.imageUrl,
      manufacturedYear:this.product.manufacturedYear,
    })
  }

  onBack(){
    if(this.isEditMode){
         this.router.navigateByUrl(`/product/${this.product.id}`)
    }else{
         this.router.navigateByUrl('/')
    }
  }

  contactForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
    price : new FormControl('',[Validators.required]),
    brand : new FormControl('',[Validators.required]),
    imageUrl : new FormControl('',[Validators.required]),
    manufacturedYear : new FormControl('',[Validators.required])

  })

  onSubmit(){
    this.product.name = this.contactForm.value.name ?? '';
    this.product.price = this.contactForm.value.price ?? '';
    this.product.brand = this.contactForm.value.brand ?? '';
    this.product.imageUrl = this.contactForm.value.imageUrl ?? '';
    this.product.manufacturedYear = this.contactForm.value.manufacturedYear ?? '';
   
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched(); // This will mark all fields as touched, showing validation errors
    }
 
      if(!this.isEditMode){
        this.product.id=Math.random().toString();
        this.productService.addProduct(this.product).subscribe(()=>{
          
          this.router.navigateByUrl('/')
        });

      }else{
        this.product.id=this.id
        this.productService.updateProduct(this.product).subscribe(()=>{
        this.router.navigateByUrl(`/product/${this.product.id}`);
      });
      }

      this.contactForm.reset();
    }
  


  }

  
  

