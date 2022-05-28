export interface Pokemon {
    id: number;
    name: string;
    types: Array<string>;
    image: string;
    moves: Array<any>;
    abilities: Array<any>;
  }

export interface MoveInterface {
    selected: boolean;
    id?: number;
    name?: string;
    effectEntries?: string;
    accuracy?: number;
    damageClass?: string
  
  }