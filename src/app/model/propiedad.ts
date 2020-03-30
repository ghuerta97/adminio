import { Propietario } from "./propietario";
import { Boleta } from "./boleta";

export interface Propiedad {
    idPropiedad: number;
    numeroPropiedad: number;
    m2: number;
    deuda ?: number;
    propietario: Propietario;
    boletas:Boleta[];
    checked ?: boolean
}