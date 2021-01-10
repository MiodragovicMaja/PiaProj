import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { GuestComponent } from './components/guest/guest.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BookComponent } from './components/book/book.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { ZanrComponent } from './components/zanr/zanr.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  {path:'', component: GuestComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:UserDashboardComponent},
  {path:'profile/:username', component:ProfileComponent},
  {path:'admin', component:AdminComponent},
  {path:'newbook', component:NewBookComponent},
  {path:'bookPage/:id', component:BookPageComponent},
  {path:'changepassword', component:ChangePasswordComponent},
  {path:'book', component:BookComponent},
  {path:'zanr', component:ZanrComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
