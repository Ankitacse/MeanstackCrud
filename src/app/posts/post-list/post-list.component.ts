import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    isLoading=false;
    private postsSub: Subscription;
    constructor(public postsService: PostsService) {

    }
    ngOnInit() {
       this.isLoading=true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListner().subscribe((posts: Post[]) => {
            this.isLoading=false;
            this.posts = posts;
        });
    }
    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }
}