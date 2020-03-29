export interface Propietario {
    id: number;
    nombre: string;
    correo: string;
    contraseña ?: string;
    ntelefono: string;
    direccion: string;
    rol: string;
}