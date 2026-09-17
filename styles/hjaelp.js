// hjaelp.js
// Små hjælpefunktioner til datoer, som bruges af flere skærme.

// Regner ud hvor mange hele dage der er til en udløbsdato.
// Begge datoer sættes til midnat, så "i morgen" altid giver 1 og ikke 0,
// uanset hvad klokken er lige nu.
export function dageTilbage(isoDato) {
  const idag = new Date();
  idag.setHours(0, 0, 0, 0);

  const udloeb = new Date(isoDato);
  udloeb.setHours(0, 0, 0, 0);

  const millisekunderPrDag = 1000 * 60 * 60 * 24;
  return Math.round((udloeb - idag) / millisekunderPrDag);
}

// Viser en dato som f.eks. "18. sep. 2026"
export function formatDato(isoDato) {
  return new Date(isoDato).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
