import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  file?: File | null;
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWUxOTU1OTgtY2ZlYi00MDAyLWI0OTItOTAxNjU0ZDFlNWQxIiwidHlwZSI6ImFwaV90b2tlbiJ9.aXlgJSLGFdWx78Uqu8KrtsH7zfcyGM4jl7gOsBGVh9Q';

  constructor(
    private httpClient: HttpClient
  ) {  }

  fileChange(files: any) {
    this.file = files.target.files.item(0);
  }

  uploadFile() {
    if(!this.file) {
      alert('Please select a file');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${this.token}`,
    };

    const formData = new FormData();
    formData.append('providers', 'amazon');
    formData.append('file', this.file!);

    this.httpClient.post<any>(
      'https://api.edenai.run/v2/image/face_detection',
      formData,
      {headers},
    ).subscribe((response: any) => {
        console.log(response.amazon.items[0].landmarks.left_eye);
    });
  }

}
