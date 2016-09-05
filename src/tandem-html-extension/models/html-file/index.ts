import * as pretty from "pretty";
import { parseHTML } from "tandem-html-extension/ast";
import { MimeTypes } from "tandem-html-extension/constants";
import { IExpression } from "tandem-common/ast";
import { DocumentFile } from "tandem-front-end/models/base";
import { Dependencies } from "tandem-common/dependencies";
import { FileFactoryDependency } from "tandem-common/dependencies";
import { HTMLDocumentRootEntity, HTMLFragmentExpression } from "tandem-html-extension/ast";

export class HTMLFile extends DocumentFile<HTMLDocumentRootEntity> {
  readonly type: string = MimeTypes.HTML_MIME_TYPE;
  async parse(content: string) {
    return parseHTML(content);
  }
  createEntity(ast: HTMLFragmentExpression, dependencies: Dependencies) {
    return new HTMLDocumentRootEntity(ast, this, dependencies);
  }
}

export const htmlFileModelDependency = new FileFactoryDependency(MimeTypes.HTML_MIME_TYPE, HTMLFile);
