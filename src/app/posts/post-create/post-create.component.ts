import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  node = 'create';
  postId: string;
  post: Post;
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.node = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      }
      else {
        this.node = 'create';
        this.postId = null;

      }
    });
  }
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.node === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }

}
