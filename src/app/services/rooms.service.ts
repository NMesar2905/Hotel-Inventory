import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../components/rooms/rooms';
import { environment } from '../../../environment/environment';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = []

  // header = new HttpHeaders({'token': '1234assadafaf'});
  getRooms$!: Observable<RoomList[]>;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    console.log(this.config.apiEndpoint);
    console.log("Rooms Service Called ...");

    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
      shareReplay(1)
    );
  }


  getRooms() {
    const header = new HttpHeaders({
      'token': '1234assadafaf'
    });
    return this.http.get<RoomList[]>('/api/rooms', { headers: header });
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    });
    return this.http.request(request);
  }
}
