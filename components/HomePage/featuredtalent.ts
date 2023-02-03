export interface featuredtalent {
    id: number,
    name: string,
    img: string,
    role: string,
    about: string,
    skills: Array<skills>,
}

interface skills {
    id: number,
    name: string,
}