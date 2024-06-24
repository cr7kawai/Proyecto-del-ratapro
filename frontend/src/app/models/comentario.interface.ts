export interface Comentario {
    id?: number;
    descripcion?: string;
    fecha?: Date;
    mantenimientoFk?: any;
    usuarioFk?: any;
}