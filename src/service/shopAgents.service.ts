import { Injectable } from '@nestjs/common';

interface PlantFormDataSimple {
  color: string;
  dificult: number;
  wateringFrequency: number;
  size: number;
  sunlight: number;  
  harmfullness: number;
}

@Injectable()
export class ShopAgent {
  private id: number;
  private isAvailable: boolean;
  private shop;

  constructor() {
    this.id = 0;
    this.isAvailable = true;
  }

  changeAvailability(n: boolean){
    this.isAvailable = n;
  }

  getShop(n){
    this.shop = n;
  }

  compareData(n: PlantFormDataSimple){
    let temp: PlantFormDataSimple;
    temp = n;
    // porównywanie z tym co ma w shop
  }
}