import { DataType } from "./dataType";

export class Item {
    name?: string;
    description?: string;
    title?: string;
    order?: number;
    dataType?: DataType;
    active?: boolean;
    required?: boolean;
    readOnly?: boolean;
    dateCreated?: Date;
}