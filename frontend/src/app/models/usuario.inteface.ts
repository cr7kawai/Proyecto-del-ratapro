export interface Usuario{
    id?: number,
    nombre?: string,
    apePaterno?: string,
    apeMaterno?: string,
    email?: string,
    password?: string,
    telefono?: string,
    fechaNach?: Date,
    rolFk?: number,
    empresaFk?: number,
    areaFk?: number
}