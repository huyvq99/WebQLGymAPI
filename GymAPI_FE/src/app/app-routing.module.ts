import { BillComponent } from './bill/bill.component';
import { BillService } from './../shared/bill.service';
import { CardComponent } from './card/card.component';
import { ServicedbComponent } from './servicedb/servicedb.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardtypeComponent } from './cardtype/cardtype.component';
import { FoodCatalogComponent } from './food-catalog/food-catalog.component';
import { FoodComponent } from './food/food.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { FacilitiesComponent } from './facilities/facilities.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      // {
      //   path: 'food-catalog',
      //   component: FoodCatalogComponent,
      // },
      // {
      //   path: 'food',
      //   component: FoodComponent,
      // }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'layout-main',
    component: LayoutMainComponent,
    children: [
      {
        path: 'food-catalog',
        component: FoodCatalogComponent,
      },
      {
        path: 'card-type',
        component:CardtypeComponent,
      },
      {
        path: 'food',
        component: FoodComponent,
      },
      {
        path: 'equipment',
        component: EquipmentsComponent,
      }
      ,
      {
        path: 'facilities',
        component: FacilitiesComponent,
      }
      ,
      {
        path: 'services',
        component: ServicedbComponent,
      }
      ,
      {
        path: 'cards',
        component: CardComponent,
      }
      ,
      {
        path: 'bills',
        component: BillComponent,
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
