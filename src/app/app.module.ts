import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { StructureComponent } from './structure/structure.component';
import { MemoriesComponent } from './memories/memories.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import {RouterModule, Routes} from '@angular/router';

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
    StructureComponent,
    MemoriesComponent,
    WhoWeAreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
