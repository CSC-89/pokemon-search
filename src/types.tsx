export type DamageClass = {
  name: string,
  url: string
}

export type Types = {
  name: string,
  color: string
}

export type Pokemon = {
  id: number;
  name: string;
  types: Array<Types>;
  image: string;
  moves: Array<Move>;
  abilities: Array<Ability>;
}

export type Ability = {
  id: number, 
  name: string,
  effectEntries?: string,
  accuracy?: string, 
  damageClass?: string
}

export type Move = {
  id: number;
    name: string;
    effectEntries?: string;
    accuracy: number;
    damageClass?: DamageClass;
}

export type MoveSelection = {
  selected: boolean;
  data?: Move;
}
