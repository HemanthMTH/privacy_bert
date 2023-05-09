import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MembersComponent } from './components/members/members.component';
import { MatrixComponent } from './components/matrix/matrix.component';
import { ToggleComponent } from './components/toggle/toggle.component';

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
    path: 'matrix',
    component: ToggleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
