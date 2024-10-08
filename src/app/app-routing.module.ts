import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './Components/account-setting/account-setting.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { GettingStartedComponent } from './Components/getting-started/getting-started.component';
import { KycUIComponent } from './Components/kyc-ui/kyc-ui.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { QrCodeComponent } from './Components/qr-code/qr-code.component';
import { ReferenceComponent } from './Components/reference/reference.component';
import { SecurityPrivacyComponent } from './Components/security-privacy/security-privacy.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpDetailsComponent } from './Components/sign-up-details/sign-up-details.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { TipsUIComponent } from './Components/tips-ui/tips-ui.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { WithdrawUIComponent } from './Components/withdraw-ui/withdraw-ui.component';

const routes: Routes = [
  // {path:"welcome", component:WelcomeComponent},
    {path:"sign-up", component:SignUpComponent},
    {path:"sign-up/details", component:SignUpDetailsComponent},
    // {path:"kyc", component:KycUIComponent},
    // {path:"dashboard", component:DashboardComponent},
    {path:"sign-in", component:SignInComponent},
    // {path:"qr-code", component:QrCodeComponent},

    // {path:"tips", component:TipsUIComponent},
    // {path:"withdraw", component:WithdrawUIComponent},
  //   {path:"account-setting", component:AccountSettingComponent},
  //   // {path:"forget-password", component:ForgetPasswordComponent},
  //   // {path:"change-password", component:ChangePasswordComponent},
  //   {path:"getting-started", component:GettingStartedComponent},
  //   {path:"notifications", component:NotificationsComponent},
  //   {path:"reference", component:ReferenceComponent},
  //   {path:"security-privacy", component:SecurityPrivacyComponent},
  //   // {path:"verify-account", component:VerifyEmailComponent},
    { path:'', redirectTo:'/sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
