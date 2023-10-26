import { Component, ViewChild } from '@angular/core';
import { SocketService } from '../socket.service';
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public hand!: "paper" | "rock" | "scissors" | null;
  public oppenent!: "paper" | "rock" | "scissors" | null;
  public roomCode = '';
  public result!: string | null;

  public config: CountdownConfig = {
    demand: true,
    leftTime: 15
  }

  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;

  constructor(
    private readonly socket: SocketService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.roomCode = params['id']; // 'code' é o nome do parâmetro definido na rota
    });

    this.socket.getSocket().on('roomMessage', (data: any) => {
      if (data.result) {
        this.oppenent = data.opponent;
        this.result = data.result;
        this.gameAgain()
      }
      console.log("data", data)
    });
  }

  gameAgain() {
    if (this.countdown) this.countdown.begin()
    setTimeout(() => {
      this.hand = null;
      this.oppenent = null;
      this.result = null;
      this.countdown.restart()
    }, 15 * 1000);
  }

  selectHand(hand: "paper" | "rock" | "scissors") {
    if (this.hand) return

    this.hand = hand;

    this.socket.getSocket().emit('sendMessage', { roomCode: this.roomCode, message: this.hand });
  }
}
