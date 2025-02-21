import { Component, Self } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [RoomsService]
})
export class EmployeeComponent {

  empName: String = 'John';
  constructor(){}

}
