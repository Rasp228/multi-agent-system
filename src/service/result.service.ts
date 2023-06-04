import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { plant } from 'src/entity/plant.entity';
import { shop } from 'src/entity/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
  private emitter: EventEmitter2;

  constructor(    
    @InjectRepository(shop)
    private shopRepository: Repository<shop>,
    @InjectRepository(plant)
    private plantRepository: Repository<plant>,
  ) {
    this.emitter = new EventEmitter2();
  }

  emitEvent(eventName: string, data: any) {
    this.emitter.emit(eventName, data);
  }

  onEvent(eventName: string, listener: (data: any) => void) {
    this.emitter.on(eventName, listener);
  }

  findAllShop(): Promise<shop[]> {
    return this.shopRepository.find();
  }

  findOneShop(ID: number): Promise<shop | null> {
    return this.shopRepository.findOneBy({ ID });
  }

  findOneShopName(name: string): Promise<shop | null> {
    console.log(name);
    return this.shopRepository.findOne({
      where: { name },
      relations: ['plants'], 
    });
  }

  findAllPlant(): Promise<plant[]> {
    return this.plantRepository.find();
  }

  findOnePlant(ID: number): Promise<plant | null> {
    return this.plantRepository.findOneBy({ ID });
  }
}