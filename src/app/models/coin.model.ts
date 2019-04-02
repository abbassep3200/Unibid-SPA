import { Deserializable } from '../core/deserializable.model';

export class Coin implements Deserializable {
  count: number;
  price: number;
  bids: number;
  discountCoupon: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}