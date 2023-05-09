import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MembersComponent } from './components/members/members.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
      path: 'members',
      component: MembersComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
