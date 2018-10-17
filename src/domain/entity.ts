import { Item } from "./item";

export class Entity {
    id?: string;
    name: string;
    active: boolean;
    description: string;
    dateCreated?: Date;
    items?: Item[];
}
