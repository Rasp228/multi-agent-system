import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class plant {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  shopID: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  dificult: number;

  @Column()
  wateringFrequency: number;

  @Column()
  size: number;

  @Column()
  sunlight: number;

  @Column()
  harmfullness: number;

  @Column()
  images: string;
}