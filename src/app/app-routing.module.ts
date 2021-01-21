import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductsCrudComponent } from './views/products-crud/products-crud.component';

import { CategoriesUpdateComponent } from './components/categories/categories-update/categories-update.component';
import { CategoriesCreateComponent } from './components/categories/categories-create/categories-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component'
import {ProvidersCrudComponent} from './views/providers-crud/providers-crud.component'
import {ProvidersCreateComponent} from './components/providers/providers-create/providers-create.component'
import {CategoriesCrudComponent} from './views/categories-crud/categories-crud.component'
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
const routes: Routes = [{
  path:"",
  component: HomeComponent
},{
  path:"providers",
  component: ProvidersCrudComponent
},
{
  path:"providers/create",
  component: ProvidersCreateComponent
},{
  path:"categories",
  component: CategoriesCrudComponent
},{
  path:"categories",
  component: CategoriesCrudComponent
},{
  path:"categories/create",
  component: CategoriesCreateComponent
},{
  path:"categories/update/:id",
  component: CategoriesUpdateComponent
},{
  path:"products",
  component: ProductsCrudComponent
},{
  path:"products/create",
  component: ProductCreateComponent
},{
  path:"products/update/:id",
  component: ProductUpdateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
