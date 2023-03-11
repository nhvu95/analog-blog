import { Injectable } from '@angular/core';
import {ICommentInfo} from "../../../server/models/comment.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  comment(comment: ICommentInfo): Observable<void> {
    return this.http.post<void>("/api/v1/comment", comment);
  }

  likeComment(comment: ICommentInfo): Observable<void> {
    return this.http.put<void>("/api/v1/comment", {slug: comment.slug, id: comment.id, alreadyLike: comment.alreadyLike});
  }

  getAllComment(slug: string): Observable<ICommentInfo[]> {
    return this.http.get<ICommentInfo[]>("/api/v1/comment", {params: {slug}});
  }
}
