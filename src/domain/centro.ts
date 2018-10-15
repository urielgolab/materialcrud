import { Item } from "./item";

export class Centro {
    id?: string;
    nombre: string;
    activo: boolean;
    descripcion: string;
    dateCreated?: Date;
    items?: Item[];
}
