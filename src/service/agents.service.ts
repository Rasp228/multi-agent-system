import { Injectable } from '@nestjs/common';

interface PlantFormData {
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
    private proposal: string;
    private goal: string;
    private plant;
  
    private proposals: string[];
    private plantData: PlantFormData;
  
    constructor() {
      this.id = 0;
      this.proposal = '';
      this.goal = '';
      this.proposals = [];
      this.plant;
    }
    setFormData(formData: PlantFormData): void {
        this.plantData = formData;
    }
    
    setIdentifier(identifier: number): void {
      this.id = identifier;
    }
  
    setProposal(proposal: string): void {
      this.proposal = proposal;
    }
  
    setGoal(goal: string): void {
      this.goal = goal;
    }
  
    getProposals(): string[] {
      return this.proposals;
    }
  
    getProposedGoal(): string {
      return this.goal;
    }

    getPlanttoClient(nPlant){
      this.plant = nPlant;
    }

    getPlanttoShow(){
      return this.plant;
    }
}