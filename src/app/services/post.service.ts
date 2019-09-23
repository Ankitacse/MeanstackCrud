import { Post } from '../models/post.model';


export class PostsService{
 private posts:Post []=[];

 getPosts(){
     return this.posts;
 }
}