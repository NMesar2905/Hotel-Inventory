import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { loginGuard } from './guards/login.guard';
import { canLoadLoginGuard } from './guards/can-load-login.guard';

const routes: Routes = [
  {path:'employee', component: EmployeeComponent, canActivate: [loginGuard]},
  {path:'login', component: LoginComponent},
  {path:'rooms', loadChildren : ()=> import('./components/rooms/rooms.module').then(m=>m.RoomsModule), 
    canActivate: [loginGuard], canMatch:[canLoadLoginGuard]
  },
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'booking', loadChildren: () => import('./modules/booking/booking.module').then(m => m.BookingModule), 
    // canActivate: [loginGuard]
  },
  { path: 'comments', loadChildren: () => import('./modules/comment/comment.module').then(m => m.CommentModule) },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
