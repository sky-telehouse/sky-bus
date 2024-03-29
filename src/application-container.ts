import { Container } from 'inversify';
import { BusModule } from '@node-ts/bus-core';
import { LoggerModule } from '@node-ts/logger-core';
import { WinstonModule } from '@node-ts/logger-winston';
import { BusWorkflowModule } from '@node-ts/bus-workflow';
import { HandlersModule } from './handlers/handlers-module';
import 'reflect-metadata';
import TypeormModule from './modules/typeorm-module';
import ApiModule from './modules/api-module';

export class ApplicationContainer extends Container {
  constructor() {
    super();
    this.load(
      new LoggerModule(),
      new WinstonModule(),
      new BusModule(),
      new BusWorkflowModule(),
      new HandlersModule(),
      TypeormModule,
      ApiModule,
    );
  }
}
