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

@Injectable()
export class AgentService {
    private id: number;
    private plantData: PlantFormData;
  
    constructor() {
      this.id = 0;
    }

    setFormData(formData: PlantFormData): void {
        this.plantData = formData;
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
}