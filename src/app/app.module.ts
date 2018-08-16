import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProjectComponent } from './project/project.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { WhoIAmComponent } from './who-i-am/who-i-am.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

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
    ExperimentComponent,
    WhoIAmComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
