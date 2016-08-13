import { IActor } from "sf-core/actors";
import { UpsertBus } from "sf-common/busses";
import { IApplication } from "sf-core/application";
import { BaseApplicationService } from "sf-core/services";
import { ApplicationServiceDependency } from "sf-core/dependencies";


export default class UpsertService extends BaseApplicationService<IApplication> {

  private _bus:IActor;

  didInject() {
    this._bus = UpsertBus.create(this.bus);
  }

  /**
   */

  public upsert(action) {
    return this._bus.execute(action);
  }
}

export const dependency = new ApplicationServiceDependency("upsert", UpsertService);
