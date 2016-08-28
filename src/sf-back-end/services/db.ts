import { IActor } from "sf-core/actors";
import { titleize } from "inflection";
import * as MemoryDsBus from "mesh-memory-ds-bus";
import { IApplication } from "sf-core/application";
import { PostDsNotifierBus } from "sf-core/busses";
import { loggable, document } from "sf-core/decorators";
import { BaseApplicationService } from "sf-core/services";
import { ApplicationServiceDependency } from "sf-core/dependencies";
import {
  DSAction,
  DSFindAction,
  DSInsertAction,
  DSRemoveAction,
  DSUpdateAction,
  PostDSAction
} from "sf-core/actions";

@loggable()
export default class DBService extends BaseApplicationService<IApplication> {

  private _db:IActor;

  didInject() {
    this._db = new PostDsNotifierBus(MemoryDsBus.create(), this.bus);
  }

  /**
   * finds one or more items against the database
   */

  @document("finds an item in the database")
  dsFind(action: DSFindAction) {
    return this._db.execute(action);
  }

  /**
   * removes one or more items against the db
   */

  @document("removes an item in the database")
  dsRemove(action: DSRemoveAction) {
    return this._db.execute(action);
  }

  /**
   * inserts one or more items against the db
   */

  @document("inserts an item in the database")
  dsInsert(action: DSInsertAction) {
    return this._db.execute(action);
  }

  /**
   */

  @document("updates an item in the database")
  dsUpdate(action: DSUpdateAction) {
    return this._db.execute(action);
  }
}

export const dependency = new ApplicationServiceDependency("db", DBService);
