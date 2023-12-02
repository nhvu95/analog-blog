import { Injectable } from '@angular/core';
import { ICommentInfo } from '../../../server/models/comment.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  comment(_comment: ICommentInfo): Observable<any> {
    return this.http.post<void>(this.BASE_URL + `/api/v1/comment`, {
      slug: _comment.slug,
      comment: _comment.content,
      author: _comment.author,
    });
  }

  likeComment(comment: ICommentInfo): Observable<any> {
    return this.http.put<any>(this.BASE_URL + `/api/v1/like-comment`, {
      commentId: comment.id,
      unlike: comment.alreadyLike,
    });
  }

  dislikeComment(comment: ICommentInfo): Observable<any> {
    return this.http.put<any>(this.BASE_URL + `/api/v1/dislike-comment`, {
      commentId: comment.id,
      unlike: comment.alreadyDislike,
    });
  }

  getAllComment(slug: string): Observable<ICommentInfo[]> {
    return this.http.get<ICommentInfo[]>(
      this.BASE_URL + `/api/v1/get-post-comment?slug=${slug}`
    );
  }
}
