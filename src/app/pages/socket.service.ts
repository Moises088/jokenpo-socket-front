import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export const serverUrl = "http://192.168.0.101:3000"

@Injectable({
  providedIn: 'root' // Isso tornará o serviço um serviço singleton
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(serverUrl, { transports: ['websocket'] });
  }
  getSocket() {
    return this.socket;
  }
}
