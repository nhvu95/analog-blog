import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPostInfo} from "../../../server/models/post.model";

@Injectable({providedIn:'root'})
export class PostService {
  BASE_URL = "https://blog.mindstone.cc";
  constructor(private http: HttpClient) {
  }

  likePost(postSlug: string, like: boolean): Observable<void> {
   return this.http.put<void>(this.BASE_URL+`/api/v1/posts/${postSlug}/like`, {});
  }

  viewPost(postSlug: string): Observable<any> {
    return this.http.put<any>(this.BASE_URL+`/api/v1/posts/${postSlug}/view`, {});
  }

  getAll(): Observable<IPostInfo[]> {
    return this.http.get<IPostInfo[]>(this.BASE_URL+"/api/v1/posts");
  }

}
