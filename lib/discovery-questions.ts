export type DiscoveryQuestion = {
  id: string;
  text: string;
};

export type DiscoverySection = {
  id: string;
  title: string;
  intro: string;
  questions: DiscoveryQuestion[];
};

export const discoverySections: DiscoverySection[] = [
  {
    id: "nykytila",
    title: "Toiminnan nykytila",
    intro:
      "Tässä osiossa kartoitamme nykyistä myynti- ja tapahtumaprosessianne. Vastaukset voivat olla lyhyitä tai yksityiskohtaisia.",
    questions: [
      {
        id: "prosessi",
        text: "Miten myynti- ja tapahtumaprosessi etenee tällä hetkellä alusta loppuun?",
      },
      {
        id: "kanavat",
        text: "Mistä kanavista liidit ja yhteydenotot yleensä tulevat?",
      },
      {
        id: "manuaalinen",
        text: "Mitkä vaiheet hoituvat nyt täysin manuaalisesti?",
      },
      {
        id: "muisti",
        text: "Missä kohtaa tietoa katoaa tai jää helposti vain yhden henkilön muistin varaan?",
      },
    ],
  },
  {
    id: "asiakkuudet",
    title: "Asiakkuudet ja myynti",
    intro:
      "Tässä osiossa selvitämme, mitä asiakastietoja haluatte hallita ja miten myynti etenee.",
    questions: [
      {
        id: "tiedot",
        text: "Mitä tietoja haluatte tallentaa asiakkaista ja yhteyshenkilöistä?",
      },
      {
        id: "historia",
        text: "Tarvitsetteko näkymän, jossa näkee asiakkaan koko historian: yhteydenotot, tarjoukset, tapahtumat, muistiinpanot ja tehtävät?",
      },
      {
        id: "putki",
        text: "Millaisia vaiheita myyntiputkessa haluatte seurata?",
      },
    ],
  },
  {
    id: "peilit",
    title: "Tapahtumat ja peilit",
    intro:
      "Tässä osiossa keskitymme peilivarauksiin ja kalenterinäkymään. Kuvatkaa nykyinen tilanne.",
    questions: [
      {
        id: "maara",
        text: "Kuinka monta peiliä teillä on käytössä, ja tarvitseeko niitä erotella jollain tavoin esimerkiksi mallin, koon tai sijainnin mukaan?",
      },
      {
        id: "saatavuus",
        text: "Mitä peilin saatavuuden seurannassa pitäisi näkyä?",
      },
      {
        id: "nakymat",
        text: "Tarvitsetteko näkymän, josta näkee helposti tulevat tapahtumat, vapaat ajankohdat ja mahdolliset päällekkäisyydet?",
      },
      {
        id: "tilanteet",
        text: "Onko teillä tilanteita, joissa sama peili voi olla varauksessa, huollossa tai kuljetuksessa, ja nämä pitäisi erottaa toisistaan?",
      },
    ],
  },
  {
    id: "automaatio",
    title: "Automaatio ja viestintä",
    intro:
      "Tässä osiossa tarkennamme sähköpostiautomaation tarpeita.",
    questions: [
      {
        id: "sahkopostit",
        text: "Millaisia sähköposteja haluaisitte lähettää automaattisesti?",
      },
    ],
  },
  {
    id: "raportointi",
    title: "Raportointi",
    intro:
      "Tässä osiossa kartoitamme raportointitarpeita — mitä tietoja haluatte seurata säännöllisesti.",
    questions: [
      {
        id: "tarkeat",
        text: "Mitkä tiedot ovat teille tärkeimpiä seurata viikoittain tai kuukausittain?",
      },
      {
        id: "esimerkit",
        text: "Haluatteko nähdä esimerkiksi tapahtumien määrän, peilien käyttöasteen, avoimet tarjoukset tai myynnin etenemisen?",
      },
      {
        id: "mittari",
        text: "Onko jokin yksittäinen mittari, jota seuraatte nyt erityisen tarkasti?",
      },
    ],
  },
  {
    id: "toteutus",
    title: "Käytännön toteutus",
    intro:
      "Nämä kysymykset auttavat arvioimaan teknistä toteutusta. Jos ette ole varmoja, voitte mainita sen vastauksessanne.",
    questions: [
      {
        id: "sahkoposti_jarjestelma",
        text: "Käytättekö Google Workspacea, Microsoft 365:tä tai jotakin muuta sähköpostijärjestelmää?",
      },
      {
        id: "sivusto",
        text: "Tiedättekö, onko sivusto rakennettu esimerkiksi HTML:llä, WordPressillä tai jollain muulla alustalla?",
      },
    ],
  },
];

export const flatQuestions = discoverySections.flatMap((section) =>
  section.questions.map((q) => ({
    ...q,
    sectionId: section.id,
    sectionTitle: section.title,
  }))
);

export const totalQuestionCount = flatQuestions.length;
