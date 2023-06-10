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
}