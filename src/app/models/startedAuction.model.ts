import { Deserializable } from '../core/deserializable.model';

export class StartedAuction implements Deserializable {
  remainedBids: number;
  lastBidPrice: number;
  winnerName: string;
  winnerAvatar: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}