export interface skills {
    id: number,
    name: string,
}

export interface location {
    state: string,
    country: string,
}

export interface talentportfolio {
    id: number,
    name: string,
    img: string,
    experience: string,
    location: object,
    skills: Array<skills>,
}