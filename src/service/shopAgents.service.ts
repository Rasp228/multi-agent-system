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
  private plantList: [];

  constructor() {
    this.id = 0;
    this.isAvailable = true;
  }

  changeAvailability(n: boolean){
    this.isAvailable = n;
  }

  setShop(n){
    this.shop = n;
  }

  compareData(n: PlantFormDataSimple){
    let temp: PlantFormDataSimple;
    temp = n;

    if(temp.color == this.shop.color){ // poprawić porównywanie bo w shop przecież powinna być lista roślin
      this.plantList.push()// wkladać poprawne rosliny
      console.log("test czy cos")    // porównywanie z tym co ma w shop
    }

    return this.plantList;
  }

  getAvailability(): boolean{
    return this.isAvailable;
  }
}