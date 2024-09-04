import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent,HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
