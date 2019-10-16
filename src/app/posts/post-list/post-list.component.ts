import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    isLoading=false;
    totalPosts = 0;
    postsPerPage=2;
    currentPage=1;
    pageSizeOptions=[1,2,5,10]
    private postsSub: Subscription;
    constructor(public postsService: PostsService) {

    }
    ngOnInit() {
       this.isLoading=true;
        this.postsService.getPosts(this.postsPerPage,this.currentPage);
        this.postsSub = this.postsService.getPostUpdateListner()
        .subscribe((postData: {posts:Post[],postCount:number}) => {
            this.isLoading=false;
            this.totalPosts =postData.postCount;
            this.posts = postData.posts;
        });
    }
    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
    onDelete(postId: string) {
        this.postsService.deletePost(postId).subscribe(() =>{
            this.postsService.getPosts(this.postsPerPage,this.currentPage);
        });
    }
    onChangePage(pageData:PageEvent){
        this.currentPage=pageData.pageIndex+1;
        this.postsPerPage =pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage,this.currentPage);
    }
}