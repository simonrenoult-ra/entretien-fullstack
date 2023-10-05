import { ClsStore } from "nestjs-cls";

export interface Context extends ClsStore {
  correlationId: string;
  requestId: string;
}
