import { Injectable } from '@angular/core';
import {ICommentInfo} from "../../../server/models/comment.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  BASE_URL = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  comment(_comment: ICommentInfo): Observable<any> {
    return this.http.post<void>(  this.BASE_URL + `/api/v1/posts/${_comment.slug}/comments`, _comment);
  }

  likeComment(comment: ICommentInfo): Observable<any> {
    return this.http.put<any>(this.BASE_URL + `/api/v1/posts/${comment.slug}/comments/${comment.id}/like`, {"liked": comment.alreadyLike});
  }

  getAllComment(slug: string): Observable<ICommentInfo[]> {
    return this.http.get<ICommentInfo[]>(this.BASE_URL +`/api/v1/posts/${slug}/comments`);
  }
}
