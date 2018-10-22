import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../service/firebase/firebase.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  currentImg = '';
  currentIndex = 1;
  totalIndex = 1;
  imgCollection = [];

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getGallery().subscribe((data) => {
      this.imgCollection = data['success'];
      this.currentImg = this.imgCollection[0].url;
      this.totalIndex = this.imgCollection.length;
    }, (error) => {
      this.currentImg = '../../assets/img/profile.jpg';
    });
  }

  ngOnInit() {
  }

  leftSlide() {
    if (this.currentIndex !== 1) {
      this.currentIndex--;
      this.currentImg = this.imgCollection[this.currentIndex - 1].url;

      document.getElementById('galleryImg').classList.remove('fadeAnimation');
      document.getElementById('galleryImg').classList.add('fadeAnimation');
    }
  }

  rightSlide() {
    if (this.currentIndex !== this.totalIndex) {
      this.currentIndex++;
      this.currentImg = this.imgCollection[this.currentIndex - 1].url;

      document.getElementById('galleryImg').classList.remove('fadeAnimation');
      document.getElementById('galleryImg').classList.add('fadeAnimation');
    }
  }
}
