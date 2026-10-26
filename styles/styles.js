// styles.js
// Al styling er samlet her, så den kan genbruges på tværs af skærmene
// og rettes ét sted. Opgavekravet om styling i en separat fil løses her.

import { StyleSheet } from 'react-native';

// Farverne er samlet øverst, så de er nemme at ændre samlet.
const farver = {
  baggrund: '#ffffff',
  tekst: '#1c1c1e',
  daempet: '#6b6b70',
  streg: '#e4e4e7',
  kritisk: '#c0392b',
  felt: '#f4f4f5',
  accent: '#2563eb',
};

export default StyleSheet.create({
  // Fælles ramme om alle skærme
  side: {
    flex: 1,
    backgroundColor: farver.baggrund,
    padding: 20,
  },

  overskrift: {
    fontSize: 24,
    fontWeight: '600',
    color: farver.tekst,
    marginBottom: 16,
  },

  // Én række i listen på oversigten
  raekke: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: farver.streg,
  },

  // Miniaturebillede i listen
  miniBillede: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
  },

  // Pladsholder for varer uden billede, så rækkerne flugter
  miniTom: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: farver.felt,
  },

  vareNavn: {
    flex: 1, // fylder pladsen mellem billede og dage
    fontSize: 17,
    color: farver.tekst,
  },

  dage: {
    fontSize: 15,
    color: farver.daempet,
  },

  // Bruges når en vare udløber inden for to dage
  dageKritisk: {
    fontSize: 15,
    fontWeight: '600',
    color: farver.kritisk,
  },

  tom: {
    fontSize: 15,
    color: farver.daempet,
    marginTop: 24,
  },

  // Inputfelter
  label: {
    fontSize: 15,
    color: farver.tekst,
    marginTop: 20,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: farver.streg,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: farver.tekst,
  },

  knapAfstand: {
    marginTop: 14,
  },

  knapBund: {
    paddingTop: 12,
  },

  // Billedet brugeren lige har taget, på den hurtige skærm
  forhaandsvisning: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: farver.felt,
  },

  // Vises før der er taget et billede
  tomRamme: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: farver.felt,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tomRammeTekst: {
    fontSize: 15,
    color: farver.daempet,
  },

  // De tre genvejsknapper for holdbarhed
  hurtigRaekke: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  hurtigKnap: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: farver.accent,
    alignItems: 'center',
  },

  hurtigKnapTekst: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Feltet hvor man selv skriver antal dage, med Gem-knappen ved siden af
  egetAntalRaekke: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  egetAntalFelt: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: farver.streg,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: farver.tekst,
  },

  hjaelpetekst: {
    fontSize: 13,
    color: farver.daempet,
    marginTop: 20,
    lineHeight: 18,
  },

  // Detaljeskærmen
  detaljeBillede: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: farver.felt,
  },

  detaljeNavn: {
    fontSize: 26,
    fontWeight: '600',
    color: farver.tekst,
    marginBottom: 12,
  },

  detaljeTekst: {
    fontSize: 16,
    color: farver.daempet,
    marginBottom: 6,
  },
});