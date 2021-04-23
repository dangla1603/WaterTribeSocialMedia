import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AjaxService } from './services/ajax.service';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FilterPipe } from './friend-list/filter.pipe';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { ProfileComponent } from './profile/profile.component';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { PostComponent } from './new-feed/post/post.component';
import { UsersPostsComponent } from './new-feed/users-posts/users-posts.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NewPasswordComponent } from './forget-password/new-password/new-password.component';
import { AllUserProfileComponent } from './profile/all-user-profile/all-user-profile.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FriendListComponent,
    FilterPipe,
    ForgetPasswordComponent,
    PostComponent,
    ProfileComponent,
    NewFeedComponent,
    UsersPostsComponent,
    UserProfileComponent,
    UpdateUserComponent,
    NewPasswordComponent,
    AllUserProfileComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AjaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }