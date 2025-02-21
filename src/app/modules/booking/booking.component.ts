import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './service/booking.service';
import { map, mergeMap, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomValidator } from './validators/custom-validator';


@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  bookingForm !: FormGroup;
  id$ !: Observable<any>;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const roomId = this.router.snapshot.paramMap.get('roomid');

    console.log("ESTE ES EL ID: ", roomId)
    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: roomId, disabled: true }, { validators: Validators.required }),
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar('!')]],
      address: this.fb.group({
        adrresssLine1: ['', { validators: [Validators.required] }],
        adrresssLine2: ['', { validators: [Validators.required] }],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
    }, { updateOn: 'blur', validators: [CustomValidator.validateDate] });

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // })

    this.bookingForm.valueChanges.pipe(
      mergeMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => { console.log(data) });
    this.bookingForm.reset({
      roomId: '',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        adrresssLine1: '',
        adrresssLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuestControl() {
    return this.fb.group({ guestName: ['', { validators: [Validators.required] }], age: new FormControl(''), })
  }
  addGuest() {
    this.guests.push(
      this.addGuestControl()
    );
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  getBookingData() {
    this.bookingForm.patchValue(
      {
        guestEmail: 'test@gmail.com',
        checkinDate: new Date(),
      }
    )
  }



}

export class Booking {

}