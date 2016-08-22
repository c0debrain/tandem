import * as React from "react";
import { Workspace } from "sf-front-end/models";
import RegisteredComponent from "sf-front-end/components/registered";
import { FrontEndApplication } from "sf-front-end/application";
import { ENTITY_PANE_COMPONENT_NS } from "sf-front-end/dependencies";
import { SettingKeys } from "sf-front-end/constants";

export class SelectionSidebarComponent extends React.Component<{ app: FrontEndApplication, workspace: Workspace }, any> {
  render() {
    return this.props.app.settings.get(SettingKeys.HIDE_RIGHT_SIDEBAR) === true ? null : <div className="m-sidebar right">
      <RegisteredComponent {...this.props} ns={[ENTITY_PANE_COMPONENT_NS, "**"].join("/")} />
    </div>;
  }
}

