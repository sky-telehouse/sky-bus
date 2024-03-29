import * as express from 'express';
import {
  interfaces,
  controller,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import { IridiumTestRecievedEvent } from '../../messages/iridium/iridium-test-recieved.event';
import { IridiumTest } from '../../types/iridumTest';

@controller('/iridium')
export class IridiumController implements interfaces.Controller {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  @httpPost('/test')
  private async create(@request() req: express.Request, @response() res: express.Response) {
    const registeredIridiumTestEvent: IridiumTest = { ...req.body };
    // FIXME: publish нужен для ивентов, а в данном случае дёргается метод -- command,
    // для него используется send
    this.bus.publish(new IridiumTestRecievedEvent(registeredIridiumTestEvent)).then(
      () => res.sendStatus(204),
    )
      .catch(() => res.sendStatus(500));
  }
}
