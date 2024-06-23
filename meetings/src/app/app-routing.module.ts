import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashBoardComponent
  },
  {
    path: "**",
    redirectTo: "/login"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
