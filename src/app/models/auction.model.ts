import { Charity } from './charity.model';
import { Participants } from './participants.model';
import { StartedAuction } from './startedAuction.model';
import { Coin } from './coin.model';
import { Deserializable } from '../core/deserializable.model';

export class Auction implements Deserializable {
  charity: Charity;
  participants: Participants;
  startedAuction: StartedAuction;
  coins: Coin[];
  id: number;
  level: number;
  maxLevel: number;
  maxMembers: number;
  image: string;
  liked: boolean;
  participated: boolean;
  tag: string;
  title: string;
  basePrice: number;
  maxPrice: number;
  discount: number;
  remainedTime: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.charity = new Charity().deserialize(input.charity);
    this.participants = new Participants().deserialize(input.participants);
    this.startedAuction = new StartedAuction().deserialize(input.startedAuction);
    // this.coins = new Coins().deserialize(input.startedAuction);
    return this;
  }
}