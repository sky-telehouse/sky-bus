import { WorkflowData } from '@node-ts/bus-workflow';
import { SputnikOpenDoorCommand } from '../../types/sputnik/openDoorCommand';

export class SputnikOpenDoorCommandData extends WorkflowData {
  $name = 'sputnik/open-door';

  sputnikEvent: SputnikOpenDoorCommand;

  logsWritten: boolean;
}
