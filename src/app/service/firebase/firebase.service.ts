import {Injectable} from '@angular/core';
import {ApiServerService} from '../api-server/api-server.service';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class FirebaseService {

  private firebaseProServer = 'https://us-central1-personal-web-bde13.cloudfunctions.net';
  private firebaseLocalServer = 'http://localhost:5000/personal-web-bde13/us-central1';

  constructor(private apiServiceService: ApiServerService, private http: HttpClient) {
  }

  getGallery() {
    const url = this.apiServiceService.createUrl(this.firebaseProServer).dictionary('/personal')
      .dictionary('/gallery').getUrl();

    return this.http.get(url);
  }
}
