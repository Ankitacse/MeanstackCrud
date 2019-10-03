import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  mode = 'create';
  postId: string;
  post: Post;
  form:FormGroup;
  isLoading = false;
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.form= new FormGroup({
'title':new FormControl(null,
  {validators:
  [Validators.required,Validators.minLength(3)]
}),
'content':new FormControl(null,
  {validators:
  [Validators.required,Validators.minLength(3)]
})
  
    });



    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(postData => {
         this.isLoading=false;
          this.post = { id: postData._id, title: postData.title, content: postData.content }
        this.form.setValue({
          title:this.post.title,
           content:this.post.content
        });
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading=true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }
    else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }

}
