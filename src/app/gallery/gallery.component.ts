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
  opacityInterval = setInterval(() => {});

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
      clearInterval(this.opacityInterval);
      this.currentIndex--;
      this.currentImg = this.imgCollection[this.currentIndex - 1].url;

      let opacity = 0.1;

      this.opacityInterval = setInterval(() => {
        if (opacity === 1.0) {
          clearInterval(this.opacityInterval);
        }

        document.getElementById('galleryImg').style.opacity = opacity.toString();
        opacity += 0.3;
      }, 100);
    }
  }

  rightSlide() {
    if (this.currentIndex !== this.totalIndex) {
      clearInterval(this.opacityInterval);
      this.currentIndex++;
      this.currentImg = this.imgCollection[this.currentIndex - 1].url;

      let opacity = 0.1;

      this.opacityInterval = setInterval(() => {
        if (opacity === 1.0) {
          clearInterval(this.opacityInterval);
        }

        document.getElementById('galleryImg').style.opacity = opacity.toString();
        opacity += 0.3;
      }, 100);
    }
  }
}
