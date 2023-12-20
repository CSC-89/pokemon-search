type DamageClass = {
  name: string,
  url: string
}

export type Pokemon = {
  id: number;
  name: string;
  types: Array<string>;
  image: string;
  moves: Array<any>;
  abilities: Array<any>;
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
    effectEntries: string;
    accuracy: number;
    damageClass: DamageClass;
}

export type MoveSelection = {
  selected: boolean;
  data?: Move;
}
