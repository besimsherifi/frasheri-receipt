import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { InvoicesComponent } from './components/invoices/invoices.component';


const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'create', component: CreateComponent },
  { path: 'create/:id', component: CreateComponent },
  { path:'invoices', component: InvoicesComponent },
  { path:'**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
