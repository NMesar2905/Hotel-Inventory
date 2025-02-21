import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from '../../services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  standalone: false,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy {

  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomList
  title = 'Room List';
  roomsList: RoomList[] = [];
  // stream = new Observable(observer => {
  //   observer.next('user1');
  //   observer.next('user2');
  //   observer.next('user3');
  //   observer.next('user4');
  //   observer.complete;
  //   // observer.error('error');
  // })

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  }

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>

  totalBytes = 0;

  subscription !: Subscription;
  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ !: Observable<RoomList[]>;

  roomsCount$ !: Observable<number>;

  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService
  ) {

    this.rooms$ = this.roomsService.getRooms$.pipe(
      catchError((err) => {
        // console.log(err);
        this.error$.next(err.message);
        return of([]);
      })
    );

    this.roomsCount$ = this.roomsService.getRooms$.pipe(
      map((rooms) => rooms.length)
    )
  }



  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('REquest has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    })

    // this.stream.subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('complete'),
    //   error: (error) => console.log(error)
    // });
    // this.stream.subscribe((data) => console.log(data));
    this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
      this.roomsList = rooms;
    });
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponent.last.title = "Last Title";
  }

  ngAfterViewChecked(): void {

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  priceFilter = new FormControl(0);

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Suite',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 750,
      photos: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12.Nov.11-Nov-2021'),
      rating: 2.6
    };

    // this.roomList.push(room);
    // this.roomsList = [...this.roomsList, room];
    this.roomsService.addRoom(room).subscribe((data) => { this.roomsList = data; })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Suite Edited',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 7500,
      photos: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12.Nov.11-Nov-2021'),
      rating: 2.6
    };

    this.roomsService.editRoom(room).subscribe((data) => { this.roomsList = data; })
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomsList = data;
    })
  }
}
