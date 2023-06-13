import { Injectable } from '@nestjs/common';

interface PlantFormData {
  maxCost: number;
  color: string;
  colorPriority: number;
  dificult: number;
  dificultPriority: number;
  wateringFrequency: number;
  wateringFrequencyPriority: number;
  size: number;
  sizePriority: number;
  sunlight: number;  
  sunlightPriority: number;
  harmfullness: number;
  harmfullnessPriority: number;
}
interface PlantFormDataSimple {
  color: string;
  dificult: number;
  wateringFrequency: number;
  size: number;
  sunlight: number;  
  harmfullness: number;
}
interface Plant {
  ID: number;
  shopID: number;
  name: string;
  color: string;
  dificult: number;
  wateringFrequency: number;
  size: number;
  sunlight: number;
  harmfullness: number;
  images: string;
  price: number;
}

@Injectable()
export class AgentService {
    private plantData: PlantFormData;
    private plantList: Plant[];
    constructor() {}

    setFormData(formData: PlantFormData): void {
        this.plantData = formData;
    }

    setProposition(n: Plant[]){
      this.plantList = n;
    }

    async findBestMatchedPlant() {
      let bestMatchedPlant = null;
      let bestMatchScore = 0;
  
      if(this.plantList!=null){
        for (let i = 0; i<15; i++) {
          if(this.plantList[i] == null){
            return bestMatchedPlant;
          }
          const plant = this.plantList[i];
          const matchScore = this.calculateMatchScore(plant);
          if (matchScore >= bestMatchScore) {
            bestMatchScore = matchScore;
            bestMatchedPlant = plant;
          }
        }
      }
      return bestMatchedPlant;
    }
  
    calculateMatchScore(plant): number {
      let pDifficult: number[] = this.normalizeNumbers(plant.dificult);
      let pWateringFrequency: number[] = this.normalizeNumbers(plant.wateringFrequency);
      let pSize: number[] = this.normalizeNumbers(plant.size);
      let pSunlight: number[] = this.normalizeNumbers(plant.sunlight);
      let pHarmfulness: number[] = this.normalizeNumbers(plant.harmfullness);
      let colorMatch = 0, difficultyMatch = 0, wateringFrequencyMatch = 0, sizeMatch = 0, sunlightMatch = 0, harmfulnessMatch = 0;

      const colorsAreSimilar = this.calculateColorDifference(plant.color, this.plantData.color);
      let temp = 765;
      temp = temp - colorsAreSimilar;
      colorMatch = (temp/20) * this.plantData.colorPriority;

      difficultyMatch = pDifficult[this.plantData.dificult -1] * this.plantData.dificultPriority;
      if(pDifficult[this.plantData.dificult -2] != null){
        difficultyMatch += pDifficult[this.plantData.dificult -2] * this.plantData.dificultPriority/2;
      }
      if(pDifficult[this.plantData.dificult] != null){
        difficultyMatch += pDifficult[this.plantData.dificult] * this.plantData.dificultPriority/2;
      }

      wateringFrequencyMatch = pWateringFrequency[this.plantData.wateringFrequency -1] * this.plantData.wateringFrequencyPriority;
      if(pWateringFrequency[this.plantData.wateringFrequency -2] != null){
        wateringFrequencyMatch += pWateringFrequency[this.plantData.wateringFrequency -2] * this.plantData.wateringFrequencyPriority/2;
      }
      if(pWateringFrequency[this.plantData.wateringFrequency] != null){
        wateringFrequencyMatch += pWateringFrequency[this.plantData.wateringFrequency] * this.plantData.wateringFrequencyPriority/2;
      }

      sizeMatch = pSize[this.plantData.size -1] * this.plantData.sizePriority;
      if(pSize[this.plantData.size -2] != null){
        sizeMatch += pSize[this.plantData.size -2] * this.plantData.sizePriority/2;
      }
      if(pSize[this.plantData.size] != null){
        sizeMatch += pSize[this.plantData.size] * this.plantData.sizePriority/2;
      }

      sunlightMatch = pSunlight[this.plantData.sunlight -1] * this.plantData.sunlightPriority;
      if(pSunlight[this.plantData.sunlight -2] != null){
        sunlightMatch += pSunlight[this.plantData.sunlight -2] * this.plantData.sunlightPriority/2;
      }
      if(pSunlight[this.plantData.sunlight] != null){
        sunlightMatch += pSunlight[this.plantData.sunlight] * this.plantData.sunlightPriority/2;
      }

      harmfulnessMatch = pHarmfulness[this.plantData.harmfullness -1] * this.plantData.harmfullnessPriority;
      if(pHarmfulness[this.plantData.harmfullness -2] != null){
        harmfulnessMatch += pHarmfulness[this.plantData.harmfullness -2] * this.plantData.harmfullnessPriority/2;
      }
      if(pHarmfulness[this.plantData.harmfullness] != null){
        harmfulnessMatch += pHarmfulness[this.plantData.harmfullness] * this.plantData.harmfullnessPriority/2;
      }
  
      let rand = Math.floor(Math.random() * 8);

      let matchScore =
        colorMatch +
        difficultyMatch +
        wateringFrequencyMatch +
        sizeMatch +
        sunlightMatch +
        harmfulnessMatch + rand;

        if(this.plantData.maxCost < plant.price){
          matchScore = -1;
        }
      return matchScore;
    }

    getSimpleFormData(): PlantFormDataSimple{
      const simplifiedData: PlantFormDataSimple = {
        color: this.plantData.color,
        dificult: this.plantData.dificult,
        wateringFrequency: this.plantData.wateringFrequency,
        size: this.plantData.size,
        sunlight: this.plantData.sunlight,
        harmfullness: this.plantData.harmfullness,
      };
      return simplifiedData;
    }

    normalizeNumbers(number: number): number[]{
      let temp: number[] = [0, 0, 0, 0];
      temp[3] = number % 10;
      temp[2] = Math.floor((number % 100) / 10);
      temp[1] = Math.floor((number % 1000) / 100);
      temp[0] = Math.floor(number / 1000);
      return temp;
    }

    convertHexColor(color: string): string {
      return color.replace("#", "");
    }
    
    calculateColorDifference(color1: string, color2: string): number {
      const convertedColor1 = this.convertHexColor(color1);
      const convertedColor2 = this.convertHexColor(color2);
    
      let matching = 0;
      for (let i = 0; i < convertedColor1.length; i += 2) {
        const value1 = parseInt(convertedColor1.substr(i, 2), 16);
        const value2 = parseInt(convertedColor2.substr(i, 2), 16);
        matching += Math.abs(value1 - value2);
      }
      return matching;
    }
}