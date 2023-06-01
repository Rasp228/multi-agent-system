import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class AgentsService {
  private emitter: EventEmitter2;

  constructor() {
    this.emitter = new EventEmitter2();
  }

  emitEvent(eventName: string, data: any) {
    this.emitter.emit(eventName, data);
  }

  onEvent(eventName: string, listener: (data: any) => void) {
    this.emitter.on(eventName, listener);
  }
}