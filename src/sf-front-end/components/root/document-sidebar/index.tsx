import * as React from "react";
import { Workspace } from "sf-front-end/models";
import RegisteredComponent from "sf-front-end/components/registered";
import { FrontEndApplication } from "sf-front-end/application";
import { DOCUMENT_PANE_COMPONENT_NS } from "sf-front-end/dependencies";
import { HIDE_LEFT_SIDEBAR_SETTIING } from "sf-front-end/constants";

export class DocumentSidebarComponent extends React.Component<{ app: FrontEndApplication, workspace: Workspace }, any> {
  render() {
    return this.props.app.settings.get(HIDE_LEFT_SIDEBAR_SETTIING) === true ? null : <div className="m-sidebar left">
      <RegisteredComponent {...this.props} ns={[DOCUMENT_PANE_COMPONENT_NS, "**"].join("/")} />
    </div>;
  }
}