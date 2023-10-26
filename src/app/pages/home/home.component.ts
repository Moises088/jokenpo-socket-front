import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public roomCode = "";

  constructor(
    private readonly router: Router,
    private readonly socket: SocketService
  ) { }

  ngOnInit(): void {
    this.socket.getSocket().on('roomCreated', (roomCode: string) => {
      if (!roomCode) {
        alert("Sala não encontrada")
      } else {
        this.router.navigate(["/game/" + roomCode])
      }
    });

    this.socket.getSocket().on('roomEntered', (roomCode: string) => {
      if (!roomCode) {
        alert("Sala não encontrada")
      } else {
        this.router.navigate(["/game/" + roomCode])
      }
    });
  }

  createRoom() {
    this.socket.getSocket().emit('createRoom', {});
  }

  enterRoom() {
    this.socket.getSocket().emit('enterRoom', this.roomCode);
  }
}
