import { GastoComun } from "./gastocomun";

export interface Boleta {
    id: number;
    mes: string;
    valor: number;
    fechaVencimiento: Date;
    pagada: boolean;
    gastosComunes: GastoComun[];

}