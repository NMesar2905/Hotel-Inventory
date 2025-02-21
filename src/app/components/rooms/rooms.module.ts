import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from '../rooms-list/rooms-list.component';
import { RoomsBookingComponent } from '../rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from '../../forms/rooms-add/rooms-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { RouteConfigToken } from '../../services/routeConfig.service';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    RoomsAddComponent,
    RoomsBookingComponent,
    RoomsComponent,
    RoomsListComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule,
    FilterPipe
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: { title: 'Room' },
    },
  ]
})
export class RoomsModule { }
