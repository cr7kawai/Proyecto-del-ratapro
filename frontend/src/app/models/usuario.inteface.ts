export interface Usuario{
    id?: number,
    nombre?: string,
    apePaterno?: string,
    apeMaterno?: string,
    email?: string,
    password?: string,
    telefono?: string,
    fechaNac?: any,
    rolFk?: any,
    empresaFk?: number,
    areaFk?: any
}