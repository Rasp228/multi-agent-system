import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

let i, j, shop;

@Injectable()
export class shopInitializationService {
    constructor() { i = 0; j = 0; shop = []; }
    async initialization(data, sellerNumber){
        let randomNumbers;
        do{
            data[i].price = Number((Math.random() * (200 - 1) + 1).toFixed(2));
            data[i].number = 0;
            i++
        }while(i<21)
        i = 0; 
        do{
            shop[i] = [];
            randomNumbers = this.generateRandomNumbers(15, 0, 20) as number[];
            do{
                let temp = data[randomNumbers[j]].price;
                const deviation = temp * 0.1;
                const min = temp - deviation;
                const max = temp + deviation;

                data[randomNumbers[j]].price = Number((Math.random() * (max - min) + min).toFixed(2));
                data[randomNumbers[j]].number = Math.floor(Math.random() * 7) + 1;
                
                shop[i].push(data[randomNumbers[j]]);
                data[randomNumbers[j]].price = temp;
                j++;
            }while(j < 15)
            j = 0;
            i++;
        }while(i < sellerNumber)

        if(existsSync(join(process.cwd(), 'db', 'data.json'))){
          console.log('Plik już istnieje, nie wykonano żadnych zmian.');
        } else {
          console.log('Plik nie istnieje, tworzenie nowego pliku i zapis danych...');
          await writeFile(join(process.cwd(), 'db', 'data.json'), JSON.stringify(shop));
          console.log('Dane zostały zapisane.');
        }
    }

    generateRandomNumbers(quantity, min, max){
        const numbers = new Set();
        while (numbers.size < quantity){
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }
}