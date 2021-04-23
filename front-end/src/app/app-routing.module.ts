import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewPasswordComponent } from './forget-password/new-password/new-password.component';
import { AllUserProfileComponent } from './profile/all-user-profile/all-user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';


const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'main-page',component:MainPageComponent},
  {path: 'register',component:RegisterPageComponent},
  {path: 'forget-password',component:ForgetPasswordComponent},
  {path: 'profile/:username',component:ProfileComponent},
  {path: 'list-friend',component:FriendListComponent},
  {path: 'update-user/:username', component:UpdateUserComponent},
  {path: 'new-password/:uri', component:NewPasswordComponent},
  {path: 'chat-room', component:ChatRoomComponent},
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'all-user-profile/:username', component:AllUserProfileComponent},
  {path: '$', redirectTo: 'new-password', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
