import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeDetailsComponent} from '../recipe-details/recipe-details.component';
import {HomeComponent} from '../home/home.component';


const routes: Routes = [
  { path: 'details/:id', component: RecipeDetailsComponent},
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
