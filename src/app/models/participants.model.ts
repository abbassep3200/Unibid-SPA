import { Deserializable } from '../core/deserializable.model';

export class Participants implements Deserializable {
  icon: string[];
  count: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
