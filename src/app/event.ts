export interface Event {
  _id: string;
  nimi: string;
  kuvaus: string;
  tapahtumapaikka: string;
  genre: string;
  aloitusaika: string;
  aloituspvm: string;
  lopetusaika: string;
  lopetuspvm: string;
  sijainti: [
    {
      katuosoite: string;
      postinumero: number;
      paikkakunta: string;
      maa: string;
      lat: number;
      long: number;
    }
  ];
  kuvaUrl: string;
}
