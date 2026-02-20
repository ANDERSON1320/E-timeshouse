import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private apiUrl = `${environment.apiUrl}/files`;

    constructor(private http: HttpClient) { }

    uploadFile(file: File): Observable<{ fileName: string; fileDownloadUri: string }> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        return this.http.post<{ fileName: string; fileDownloadUri: string }>(`${this.apiUrl}/upload`, formData);
    }
}
