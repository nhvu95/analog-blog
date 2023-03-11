import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPostInfo} from "../../../server/models/post.model";

@Injectable({providedIn:'root'})
export class PostService {
  constructor(private http: HttpClient) {
  }

  likePost(postSlug: string, like: boolean): Observable<void> {
   return this.http.put<void>("/api/v1/post", {postSlug, like});
  }

  viewPost(postSlug: string): Observable<void> {
    return this.http.put<void>("/api/v1/post", {postSlug, view:1});
  }

  getAll(): Observable<IPostInfo[]> {
    return this.http.get<IPostInfo[]>("/api/v1/post");
  }

}
