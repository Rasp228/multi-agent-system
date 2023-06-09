import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import { ResultService } from 'src/Service/result.service';
import { AgentService } from 'src/service/agents.service';
import { shopInitializationService } from 'src/service/shopInitialization.service';
import { ShopAgent } from 'src/service/shopAgents.service';

interface PlantFormData {
  color: string;
  dificult: number;
  wateringFrequency: number;
  size: number;
  sunlight: number;
  harmfullness: number;
}
let data = [], agents = [], shopAgents = [], functions = [];
let webRender, questionToShop, questionToClient, sellerNumber, agentsNumber;

@Controller()
export class ResultController {
  constructor(
    @Inject(ResultService)
    private readonly resultService: ResultService, 
    private readonly sshopInitializationService: shopInitializationService,
  ) {}
/// wejscie na adres
  @Post('result')
  async getDataAndSend(@Body() FormData: PlantFormData, @Res() res) {
    data = [];

    await this.resultService.emitEvent('clientData', FormData);
    webRender = async () => {
      await res.render('result', { data })
    };
  }
///
/// inicjalizacja + oczekiwanie na dane od użytkownika
  async onModuleInit() {
    sellerNumber = 12;
    agentsNumber = 25;
    this.sshopInitializationService.initialization( await this.resultService.findAllPlant(), sellerNumber)
    this.resultService.onEvent('clientData', async(formData) => {
      let i = 0;
      do{
        let temp = new AgentService();
        temp.setIdentifier(i);
        temp.setFormData(formData);
        agents.push(temp);
        await this.negotiationClient(agents[i]);
        functions.push(questionToClient = async (plant) => {
          await agents[i].getPlanttoClient(plant);
        })
        i++;
      }while(i < agentsNumber);

      i = 0;
      do{
        let temp = new ShopAgent();
        temp.getShop((await this.resultService.findOneShop(i%4+1)).name);
        shopAgents.push(temp);
        await this.negotiationShop(shopAgents[i], functions[i]);
        i++;
      }while(i < sellerNumber);

      let response = "response"
      await this.resultService.emitEvent('sellerResponse', response);
    });
    await this.sendDataToUser();
  }
///
/// negocjacja z agentem klienta
  async negotiationClient(agent){

  }
///
/// negocjacja z sklepem
  async negotiationShop(agent, questionToClient){
    const randomNum = Math.floor(Math.random() * (21)) + 1;
    await this.resultService.findOnePlant(randomNum).then(result => {
      questionToClient(result)
    })
    questionToShop = async () => { };
  }
///
/// przesłanie danych do wyświetlenia i zebranie wyników
  async sendDataToUser() {
    this.resultService.onEvent('sellerResponse', async(response) => {
        let i = 0, k = 0;
        do{
          const plantToShow = await agents[i].getPlanttoShow();
          if (plantToShow !== undefined) {
            if (!data.some(obj => obj.name && obj.name.includes(plantToShow.name))){
                data.push(plantToShow);
            }else{
                k++;
            }
            i++;
          } else {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }while(i < agentsNumber); 
        webRender();
    });
  }
///
}