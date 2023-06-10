import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { join } from 'path';

@Injectable()
export class JsonService {
  async readDataFile(): Promise<any[]> {
    const filePath = join(process.cwd(), 'db', 'data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }
}
