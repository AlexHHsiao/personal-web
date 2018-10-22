import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../service/firebase/firebase.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getGallery().subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
