import { Component } from '@angular/core';
import { RoomList } from '../../components/rooms/rooms';
import { RoomsService } from '../../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  standalone: false,
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent {

  room: RoomList = {
    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0
  }

  successMessage: string ='';

  constructor(private roomService: RoomsService) { }

  AddRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMessage = "Room Added Succesfully";
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        checkInTime: new Date(),
        checkOutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0
      });
    });
  }

}
