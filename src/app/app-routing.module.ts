import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { AddUserComponent } from "./user/add-user/add-user.component";

const routes:Routes=[
  {path:'',redirectTo:'/users',pathMatch:'full'},
  {path: 'users', component: UserComponent},
  {path:'users/edit/:directoryId', component:UserDetailComponent},
  {path:'users/add', component:AddUserComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
