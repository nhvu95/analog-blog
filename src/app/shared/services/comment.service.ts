import { Injectable } from '@angular/core';
import { ICommentInfo } from '../../../server/models/comment.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  comment(_comment: ICommentInfo): Observable<any> {
    return this.http.get<void>(
      `/api/v1/comment?slug=${_comment.slug}&comment=${_comment.content}&author=${_comment.author}`
    );
  }

  likeComment(comment: ICommentInfo): Observable<any> {
    return this.http.get<any>(
      `/api/v1/like-comment?commentId=${comment.id}&unlike=${comment.alreadyLike}`
    );
  }

  dislikeComment(comment: ICommentInfo): Observable<any> {
    return this.http.get<any>(
      `/api/v1/dislike-comment?commentId=${comment.id}&unlike=${comment.alreadyDislike}`
    );
  }

  getAllComment(slug: string): Observable<ICommentInfo[]> {
    return this.http.get<ICommentInfo[]>(
      `/api/v1/get-post-comment?slug=${slug}`
    );
  }
}
