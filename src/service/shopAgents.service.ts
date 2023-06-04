import { Injectable } from '@nestjs/common';

interface PlantFormData {
  ID: number;
  name: string;
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
  private information: string[];
  private informationFromShop: PlantFormData[];
  private shop: string;
  private plant;

  constructor() {
    this.id = 0;
    this.information = [];
    this.shop = "";
  }

  getProposals(): string[] {
    return this.information;
  }

  getShop(nshop: string) {
    this.shop = nshop;
  }

  getShopName(): string | null{
    return this.shop;
  }

  getDataFromShop(nInformationFromShop: PlantFormData[]){
    this.informationFromShop = nInformationFromShop;
  }

  getInformationFromClient(nInformation: string[]){
    this.information = nInformation;
  }
}