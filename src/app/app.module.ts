import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common//http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ProjectComponent} from './project/project.component';
import {ExperienceComponent} from './experience/experience.component';
import {WhoIAmComponent} from './who-i-am/who-i-am.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {ChatComponent} from './who-i-am/chat/chat.component';
import {ChatService} from './service/chat/chat.service';
import {FormsModule} from '@angular/forms';
import {GithubService} from './service/github/github.service';
import {ApiServerService} from './service/api-server/api-server.service';
import {HeaderService} from './service/header/header.service';
import { GithubProjectComponent } from './project/github-project/github-project.component';
import { NotifAlertComponent } from './shared/notif-alert/notif-alert.component';
import {AlertService} from './service/alert/alert.service';
import {FirebaseService} from './service/firebase/firebase.service';

const router: Routes = [
  {path: '', component: MainComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PageNotFoundComponent,
    HomeComponent,
    GalleryComponent,
    ProjectComponent,
    ExperienceComponent,
    WhoIAmComponent,
    ChatComponent,
    GithubProjectComponent,
    NotifAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    ChatService,
    GithubService,
    ApiServerService,
    HeaderService,
    AlertService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
