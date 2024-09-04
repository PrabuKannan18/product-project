import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductUpsertComponent } from './products/product-upsert/product-upsert.component';
import { ProductComponent } from './products/product/product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
    },{
        path:'product-upsert',
        component:ProductUpsertComponent,
    },{
        path:'product-upsert/:id',
        component:ProductUpsertComponent,
    },{
        path:'product/:id',
        component:ProductComponent,
    },{
        path:'user-auth',
        component:UserAuthComponent,
    }
];
