import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AccountmenupageComponent } from './pages/accountmenupage/accountmenupage.component';
import { UpdateaccountpageComponent } from './pages/updateaccountpage/updateaccountpage.component';
import { FramePageComponent } from './shared/master/frame.page';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { AccountmainpageComponent } from './pages/accountmainpage/accountmainpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/master/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SignuppageComponent,
    AccountmenupageComponent,
    UpdateaccountpageComponent,
    FramePageComponent,
    AccountmainpageComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot({
    //   positionClass :'toast-bottom-right'
    // })
    ToastrModule.forRoot({positionClass :'toast-top-center'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
