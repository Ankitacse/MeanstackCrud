import { Component,Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';


@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.scss']
})

export class PostListComponent{
// posts=[
//     {title:'First Post' , content:'This is  first post\'s content'},
//     {title:'second Post' , content:'This is  second post\'s content'},
//     {title:'third Post' , content:'This is  third post\'s content'}
// ]; 
@Input() posts:Post []=[];
}