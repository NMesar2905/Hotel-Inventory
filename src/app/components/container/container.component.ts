import { AfterContentInit, Component, ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-container',
  standalone: false,
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  // providers: [RoomsService]
})
export class ContainerComponent implements AfterContentInit{

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  // constructor(@Host() private roomsService: RoomsService){ }

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Nicolas';
  }

}
