export interface Mantenimiento {
    id?: number;
    nombre?: string;
    descripcion?: string;
    direccion?: string;
    fechaRegistro?: Date;
    aceptado?: boolean;
    costo?: number;
    estadoPago?: string;
    finalizado?: boolean;
    fechaFin?: Date;
    usuarioFk?: any;
    areaFk?: any;
    empleadoFk?: any;
}