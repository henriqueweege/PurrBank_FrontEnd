import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FramePageComponent } from './shared/master/frame.page';
import { AccountmenupageComponent } from './pages/accountmenupage/accountmenupage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { AccountmainpageComponent } from './pages/accountmainpage/accountmainpage.component';
import { UpdateaccountpageComponent } from './pages/updateaccountpage/updateaccountpage.component';



const routes: Routes =
    [
        {
            path: '',
            component: HomepageComponent
        },

        {
            path: 'signup',
            component: SignuppageComponent
        },
        {
            path: '',
            component: FramePageComponent,
            children:[
                {path: 'accountmenu', component: AccountmenupageComponent},
                {path: 'accountmainpage', component: AccountmainpageComponent},
                {path: 'updateaccount', component: UpdateaccountpageComponent},

            ]
        }

    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
