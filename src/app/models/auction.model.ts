import { Charity } from './charity.model';
import { Participants } from './participants.model';
import { StartedAuction } from './startedAuction.model';
import { Coin } from './coin.model';
import { AuctionPlan } from './auctionPlan.model';

export class Auction {
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
  likeCount: number;
  participated: boolean;
  plan: AuctionPlan;
  tag: string;
  title: string;
  basePrice: number;
  maxPrice: number;
  discount: number;
  remainedTime: number;
}
