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
          if (matchScore > bestMatchScore) {
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
      let biggestValue = [0, 0, 0, 0, 0, 0];
     // let i = 0;
      //do{
        colorMatch = 1;
        difficultyMatch = pDifficult[this.plantData.dificult] * this.plantData.dificultPriority;
        //difficultyMatch = Math.abs(pDifficult[i] - this.plantData.dificult) <= 3 ? Number(this.plantData.dificultPriority)+Number(pDifficult[i]) : 0;
       /* if(biggestValue[1] < difficultyMatch){
          biggestValue[1] = difficultyMatch;
        }else{
          difficultyMatch = biggestValue[1];
        }*/
        wateringFrequencyMatch = pWateringFrequency[this.plantData.wateringFrequency] * this.plantData.wateringFrequencyPriority;
        //wateringFrequencyMatch = Math.abs(pWateringFrequency[i] - this.plantData.wateringFrequency) <= 3 ? Number(this.plantData.wateringFrequencyPriority)+Number(pWateringFrequency[i]) : 0;
        /*if(biggestValue[2] < wateringFrequencyMatch){
          biggestValue[2] = wateringFrequencyMatch;
        }else{
          wateringFrequencyMatch = biggestValue[2];
        }*/
        sizeMatch = pSize[this.plantData.size] * this.plantData.sizePriority;
        //sizeMatch = Math.abs(pSize[i] - this.plantData.size) <= 3 ? Number(this.plantData.sizePriority)+Number(pSize[i]) : 0;
        /*if(biggestValue[3] < sizeMatch){
          biggestValue[3] = sizeMatch;
        }else{
          sizeMatch = biggestValue[3];
        }*/
        sunlightMatch = pSunlight[this.plantData.sunlight] * this.plantData.sunlightPriority;
        //sunlightMatch = Math.abs(pSunlight[i] - this.plantData.sunlight) <= 3 ? Number(this.plantData.sunlightPriority)+Number(pSunlight[i]) : 0;
        /*if(biggestValue[4] < sunlightMatch){
          biggestValue[4] = sunlightMatch;
        }else{
          sunlightMatch = biggestValue[4];
        }*/
        harmfulnessMatch = pHarmfulness[this.plantData.harmfullness] * this.plantData.harmfullnessPriority;
        //harmfulnessMatch = Math.abs(pHarmfulness[i] - this.plantData.harmfullness) <= 3 ? Number(this.plantData.harmfullnessPriority)+Number(pHarmfulness[i]) : 0;
        /*if(biggestValue[5] < harmfulnessMatch){
          biggestValue[5] = harmfulnessMatch;
        }else{
          harmfulnessMatch = biggestValue[5];
        }*/
       // i++;
     // }while(i < 4)
  
      let rand = Math.floor(Math.random() * 4);

      const matchScore =
        colorMatch +
        difficultyMatch +
        wateringFrequencyMatch +
        sizeMatch +
        sunlightMatch +
        harmfulnessMatch + rand;
  
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
      temp[0] = number % 10;
      temp[1] = Math.floor((number % 100) / 10);
      temp[2] = Math.floor((number % 1000) / 100);
      temp[3] = Math.floor(number / 1000);
      return temp;
    }
}