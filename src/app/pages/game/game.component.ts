import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public hand!: "paper" | "rock" | "scissors";
  public oppenent!: "paper" | "rock" | "scissors";

  selectHand(hand: "paper" | "rock" | "scissors") {
    if (this.hand) return

    this.hand = hand;
  }
}
