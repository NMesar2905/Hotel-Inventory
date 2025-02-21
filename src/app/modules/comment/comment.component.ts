import { Component, OnInit } from '@angular/core';
import { CommentService } from './services/comment.service';
import { map, Observable, pluck } from 'rxjs';
import { Comments } from './comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  // comments$ !: Observable<Comments[]>;
  comment$ !: Observable<Comments[]>; 

  constructor(private commentService: CommentService,
    private activatedRoute : ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) =>{
      console.log(data['comments']);
    });
    // this.comments$ = this.commentService.getComments();
    this.comment$ = this.activatedRoute.data.pipe(pluck('comments'));
  }
}
