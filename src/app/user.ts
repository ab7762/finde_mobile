import { Event } from "./event";
export interface User {
  etunimi: string;
  sukunimi: string;
  sposti: string;
  salasana: string;
  events: Event[];
  emailVerified: boolean;
  tykatyt: Event[];
}
