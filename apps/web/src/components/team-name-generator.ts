const adjectivesFr = [
    "Vertical",
    "Sauvage",
    "Furieux",
    "Légendaire",
    "Brutal",
    "Aérien",
    "Instable",
    "Rapide",
    "Sacré",
    "Mythique",
    "Ultime",
    "Titanesque",
    "Nocturne",
    "Gelé",
    "Explosif",
    "Agile",
    "Indomptable",
    "Épique",
    "Primal",
    "Invisible",
    "Acrobatique",
    "Massif",
    "Redoutable",
    "Fantomatique",
    "Vertigineux",
];

const nounsFr = [
    "Grimpeurs",
    "Dynos",
    "Blocs",
    "Prises",
    "Chaussons",
    "Ascendeurs",
    "Alpinistes",
    "Mutants",
    "Singes",
    "Goats",
    "Crochets",
    "Magnésiens",
    "Crushers",
    "Bandits",
    "Survivants",
    "Voltigeurs",
    "Pirates",
    "Nomades",
    "Prédateurs",
    "Titans",
    "Fantômes",
    "Guerriers",
    "Explorateurs",
    "Aventuriers",
    "Escaladeurs",
];

export default function generateTeamName() {
    const adjective =
        adjectivesFr[Math.floor(Math.random() * adjectivesFr.length)];

    const noun = nounsFr[Math.floor(Math.random() * nounsFr.length)];

    return ` ${noun} ${adjective}`;
}

console.log(generateTeamName());
