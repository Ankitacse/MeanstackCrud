import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/post.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit ,OnDestroy{
    // posts=[
    //     {title:'First Post' , content:'This is  first post\'s content'},
    //     {title:'second Post' , content:'This is  second post\'s content'},
    //     {title:'third Post' , content:'This is  third post\'s content'}
    // ]; 
    // @Input() posts:Post []=[];
    posts: Post[] = [];
    private postsSub :Subscription;
    constructor(public postsService: PostsService) {
 
    }
    ngOnInit() {
        this.posts = this.postsService.getPosts();
       this.postsSub= this.postsService.getPostUpdateListner().subscribe((posts:Post[])=>{
         this.posts = posts;
        });
    }
 ngOnDestroy(){
     this.postsSub.unsubscribe();
 }
}