import IParseMailDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
 parse(data: IParseMailDTO): Promise<string>;
}