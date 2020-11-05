import handlebars from "handlebars"
import fs from "fs"
import IParseMailDTO from "../dtos/IParseMailTemplateDTO"
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailDTO): Promise<string> {
    const templateFilrContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFilrContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;