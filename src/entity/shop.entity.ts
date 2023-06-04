import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { plant } from './plant.entity';

@Entity()
export class shop {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;

  @OneToMany(type => plant, plant => plant.shopID)
  @JoinColumn()
  plants: plant[];
}