import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import { ResultService } from 'src/Service/result.service';
import { AgentService } from 'src/service/agents.service';
import { ShopAgent } from 'src/service/shopAgents.service';

interface PlantFormData {
  color: string;
  dificult: number;
  wateringFrequency: number;
  size: number;
  sunlight: number;
  harmfullness: number;
}

let data = [];
let agents = [];
let shopAgents = [];
let zmienna, questionToShop, questionToClient;
let functions = [];

@Controller()
export class ResultController {
  constructor(
    @Inject(ResultService)
    private readonly resultService: ResultService, 
  ) {  }

  @Post('result')
  async getDataAndSend(@Body() FormData: PlantFormData, @Res() res) {
    data = [];
   // console.log("Informacja od uzytkownika: "  + FormData.color);
    await this.resultService.emitEvent('clientData', FormData);
    zmienna = async () => {
      await res.render('result', { data })
    };
  }

  async onModuleInit() {
    this.resultService.onEvent('clientData', async(formData) => {
      let i = 0;
      do{
        let temp = new AgentService();
        temp.setIdentifier(i);
        temp.setFormData(formData);
        agents.push(temp);
        await this.negotiationClient(agents[i]);
        functions.push(questionToClient = async (plant) => {
          //console.log("client ma"+plant)
          await agents[i].getPlanttoClient(plant);
        })
        i++;
      }while(i < 2000);
      i = 0;
      do{
        let temp = new ShopAgent();
        temp.getShop((await this.resultService.findOneShop(i%4+1)).name);
        shopAgents.push(temp);
        await this.negotiationShop(shopAgents[i], functions[i]);
        i++;
      }while(i < 2000);

    //console.log('Otrzymano dane od klienta:', formData);

    const response = {
        message: 'Odpowiedź od sprzedawcy',
        suggestion: 'Propozycja rośliny',
    };

    await this.resultService.emitEvent('sellerResponse', response);
    });

    await this.sendDataToUser();
  }

  async negotiationClient(agent){

  }

  async negotiationShop(agent, questionToClient){
    const randomNum = Math.floor(Math.random() * (21)) + 1;
    await this.resultService.findOnePlant(randomNum).then(result => {
      //console.log(result)
      questionToClient(result)
      })
      questionToShop = async () => {
      };
  }

  async sendDataToUser() {
    this.resultService.onEvent('sellerResponse', async(response) => {
        //console.log('Otrzymano dane od sprzedawcy:', response);
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
            //console.log(k);
            //console.log(i);
            //console.log("Tutaj: " + data[i-k]);
          } else {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }while(i < 7); 
        zmienna();
    });
  }
}