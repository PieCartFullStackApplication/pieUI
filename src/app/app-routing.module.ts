import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ViewComponent } from './view/view.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'crud', component: ProductComponent },
  { path: 'products', component: ViewComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: AppComponent },
  { path: 'about', component: AboutComponent },
  {path: '', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
