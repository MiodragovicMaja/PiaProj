import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent} from './posts/post-create/post-create.component';
import { PostListComponent} from './posts/post-list/post-list.component';
import { HeaderComponent} from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatExpansionModule} from "@angular/material/expansion"

import {HttpClientModule} from "@angular/common/http";
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { ClarityModule } from '@clr/angular';
import { GuestComponent } from './components/guest/guest.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BookComponent } from './components/book/book.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ZanrComponent } from './components/zanr/zanr.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    RegistrationComponent,
    LoginComponent,
    AdminComponent,
    GuestComponent,
    ProfileComponent,
    UserDashboardComponent,
    BookComponent,
    NewBookComponent,
    BookPageComponent,
    ChangePasswordComponent,
    ZanrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
