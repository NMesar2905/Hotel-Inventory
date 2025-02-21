import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  standalone: false,
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss'
})
export class RoomsBookingComponent implements OnInit{

  constructor(private router: ActivatedRoute){}

  id:number = 0;
  id$ !: Observable<any>;

  ngOnInit(): void{
    // this.id = this.router.snapshot.params['id'];
    // this.router.params.subscribe((params) => {this.id = params['id']})
    this.id$ = this.router.paramMap.pipe(map((params) => params.get('id')));
    // this.id$ = this.router.params.pipe(
    //   map(params => params['id'])
    // )
  }

}
