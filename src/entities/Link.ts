// User Entity
// We’ll store the following user data:

// userId: a generated UUID
// username: any string; must be unique
// passwordHash: must be unique
// isPro: a boolean that defaults to false
// non-pro accounts can only have up to 5 shortened links
// isAdmin: a boolean that defaults to false
// We’ll create an admin account for handling reporting later

import { Entity, PrimaryColumn, Column, ManyToOne, Relation } from 'typeorm';
import { User } from './User';

@Entity()
export class Link {
  @PrimaryColumn()
  linkId: string;

  @Column()
  originalUrl: string;

  @Column()
  lastAccessedOn: Date;

  @Column({ default: 0 })
  numHits: number;

  @ManyToOne(() => User, (user) => user.links, { cascade: ['insert', 'update'] })
  user: Relation<User>;
}
