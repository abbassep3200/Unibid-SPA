import { Deserializable } from '../core/deserializable.model';

export class Charity implements Deserializable {
  icon: string;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
