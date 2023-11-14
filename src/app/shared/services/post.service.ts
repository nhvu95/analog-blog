import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostInfo } from '../../../server/models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  likePost(postSlug: string, like: boolean): Observable<void> {
    return this.http.put<void>(`/api/v1/like-post`, {
      slug: postSlug,
    });
  }

  viewPost(postSlug: string): Observable<any> {
    return this.http.put<any>(`/api/v1/view-post`, {
      slug: postSlug,
    });
  }

  getAll(): Observable<IPostInfo[]> {
    return this.http.get<IPostInfo[]>('/api/v1/get-all-post');
  }
}
