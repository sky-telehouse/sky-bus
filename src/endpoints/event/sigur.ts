import * as express from 'express';
import {
  interfaces,
  controller,
  request,
  response,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Bus, BUS_SYMBOLS } from '@node-ts/bus-core';
import {
  SigurGatewayPassed,
  SigurGatewayAccessDenied,
  // SigurGatewayAccessRequired,
} from '../../messages/sigur';
import { SigurGatewayEvent } from '../../types/sigur';

@controller('/sigur')
export class SigurController implements interfaces.Controller {
  constructor(@inject(BUS_SYMBOLS.Bus) private readonly bus: Bus) {}

  @httpPost('/event')
  private async event(
  @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const events = req.body.d;
    for (let i = 0; i < events.length; i++) { // eslint-disable-line no-plusplus
    // for (const event of events) {
      const gatewayEvent: SigurGatewayEvent = {
        passIndex: events[i].i,
        isGatewayPassed: events[i].type === 1,
        gatewayId: events[i].ap,
        uuidPersone: req.body.e,
        timestamp: new Date(events[i].t),
        isIngoingDirection: events[i].d !== 1,
        passCardId: events[i].keyHex,
      };

      if (gatewayEvent.isGatewayPassed) {
        this.bus.publish(new SigurGatewayPassed(gatewayEvent));
      } else {
        this.bus.publish(new SigurGatewayAccessDenied(gatewayEvent));
      }
      // await this.bus.publish(new SigurGatewayAccessRequired(gatewayPassedEvent));
    }

    const lastIndex = events[events.length - 1];

    res.status(204).send({ i: lastIndex });
  }
}
