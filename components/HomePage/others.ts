export interface others {
    id: number,
    img: string,
    name: string,
    about:string,
    list: Array<list>,
    selected?: boolean,
}

interface list {
    id: number,
    about: string,
}