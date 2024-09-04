import {  Injectable } from '@angular/core';
import { IProduct } from '../_models/product.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


const BASE_URL = 
           'https://angular-24981-default-rtdb.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsList: IProduct[] = [];
  // productsList: IProduct[] = [
  //   {
  //     id: '1',
  //     name: 'Iphone 15 Pro Max',
  //     brand: 'Apple',
  //     price: '1600',
  //     imageUrl:
  //       'https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2024',
  //   },
  //   {
  //     id: '2',
  //     name: 'Playstation 5',
  //     brand: 'Sony',
  //     price: '550',
  //     imageUrl:
  //       'https://images.pexels.com/photos/5961216/pexels-photo-5961216.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2027',
  //   },
  //   {
  //     id: '3',
  //     name: 'Samsung Edge',
  //     brand: 'Samsung',
  //     price: '340',
  //     imageUrl:
  //       'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2016',
  //   },
  //   {
  //     id: '4',
  //     name: 'Nikon 36D',
  //     brand: 'Nikon',
  //     price: '2300',
  //     imageUrl:
  //       'https://images.pexels.com/photos/1250282/pexels-photo-1250282.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2026',
  //   },
  //   {
  //     id: '5',
  //     name: 'Boat Headphone',
  //     brand: 'Boat',
  //     price: '130',
  //     imageUrl:
  //       'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2024',
  //   },
  //   {
  //     id: '6',
  //     name: 'Macbook M2',
  //     brand: 'Apple',
  //     price: '1800',
  //     imageUrl:
  //       'https://images.pexels.com/photos/3693732/pexels-photo-3693732.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2022',
  //   },
  //   {
  //     id: '7',
  //     name: 'IPhone 11 & Airpods',
  //     brand: 'Apple',
  //     price: '1120',
  //     imageUrl:
  //       'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2024',
  //   },
  //   {
  //     id: '8',
  //     name: 'Google Pixel 7a',
  //     brand: 'Goolge',
  //     price: '450',
  //     imageUrl:
  //       'https://images.pexels.com/photos/833337/pexels-photo-833337.png?auto=compress&cs=tinysrgb&w=600',
  //     manufacturedYear: '2021',
  //   },
  // ];



  constructor(private http:HttpClient) { }

  getProducts(){
  return this.http.get(BASE_URL + '/product.json').pipe(map((responseData:any)=>{
    const products = [];
    for(const key in responseData) {
      if(responseData.hasOwnProperty(key)){
        const product = { ...responseData[key],id:key};
        products.push(product);
      }
    }
    return products;
  }))
  }

  addProduct(product:IProduct){
    const customProduct = {
      name : product?.name,
      brand : product?.brand,
      price : product?.price,
      imageUrl:product?.imageUrl,
      manufacturedYear:product?.manufacturedYear,
    };

    return this.http.post(BASE_URL + '/product.json',customProduct);
  }

  getProductById(id:string) {
    return this.http.get(BASE_URL+`/product/${id}.json`).pipe(map((responseData)=>{
      return {...responseData,id};
    })
  );
  }

 updateProduct(product:IProduct){
  const customProduct = {
    name : product?.name,
    brand : product?.brand,
    price : product?.price,
    imageUrl:product?.imageUrl,
    manufacturedYear:product?.manufacturedYear,
  };

  return this.http.put(BASE_URL+`/product/${product.id}.json`,customProduct);

  
 }

 deleteProduct(id:string){
  return this.http.delete(BASE_URL+`/product/${id}.json`);
 }

}
