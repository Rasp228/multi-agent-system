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
  private isAvailable: boolean;
  private shop;
  private plantList: any[] = [];

  constructor() {
    this.isAvailable = true;
  }

  changeAvailability(n: boolean){
    this.isAvailable = n;
  }

  setShop(n){
    this.shop = n;
  }

  compareData(n: PlantFormDataSimple){
    for (const plant of this.shop) {
      const isMatch = this.areParamsMatched(n, plant);
      if (isMatch && !this.plantList.includes(plant)) {
        this.plantList.push(plant);
      }
    }
    return this.plantList;
  }

  getAvailability(): boolean{
    return this.isAvailable;
  }

  areParamsMatched(n: PlantFormDataSimple, plant): boolean {
    const isColorMatched = true;
    let isDifficultyMatched = false, isWateringFrequencyMatched = false, isSizeMatched = false, isSunlightMatched = false, isHarmfulnessMatched = false;
    let pDifficult: number[] = this.normalizeNumbers(plant.dificult);
    let pWateringFrequency: number[] = this.normalizeNumbers(plant.wateringFrequency);
    let pSize: number[] = this.normalizeNumbers(plant.size);
    let pSunlight: number[] = this.normalizeNumbers(plant.sunlight);
    let pHarmfulness: number[] = this.normalizeNumbers(plant.harmfullness);
    
    const MAX_DIFFERENCE = Math.floor(Math.random() * 2);

    if(pDifficult[n.dificult] > MAX_DIFFERENCE){
      isDifficultyMatched = true;
    }else{
      isDifficultyMatched = false;
    }
    if(pWateringFrequency[n.wateringFrequency] > MAX_DIFFERENCE){
      isWateringFrequencyMatched = true;
    }else{
      isWateringFrequencyMatched = false;
    }
    if(pSize[n.size] > MAX_DIFFERENCE){
      isSizeMatched = true;
    }else{
      isSizeMatched = false;
    }
    if(pSunlight[n.sunlight] > MAX_DIFFERENCE){
      isSunlightMatched = true;
    }else{
      isSunlightMatched = false;
    }
    if(pHarmfulness[n.harmfullness] > MAX_DIFFERENCE){
      isHarmfulnessMatched = true;
    }else{
      isHarmfulnessMatched = false;
    }
    let temp = 0, result = false;
    if(isColorMatched){ temp++ }
    if(isDifficultyMatched){ temp++ }
    if(isWateringFrequencyMatched){ temp++ }
    if(isSizeMatched){ temp++ }
    if(isSunlightMatched){ temp++ }
    if(isHarmfulnessMatched){ temp++ }

    if (temp > 2 + Math.floor(Math.random() * 3)){
      result = true;
    }
  
    return result;
  }

  normalizeNumbers(number: number): number[]{
    let temp: number[] = [0, 0, 0, 0];
    temp[3] = number % 10;
    temp[2] = Math.floor((number % 100) / 10);
    temp[1] = Math.floor((number % 1000) / 100);
    temp[0] = Math.floor(number / 1000);
    return temp;
  }
}