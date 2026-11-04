// Journal météorologique de la ferme — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/releves.json';

async function main() {
  ouvrirSaisie();
  const releves= await chargerJson(FICHIER_DONNEES);// permet d'importer les données du fichier donnees/releves.Json
  console.log('==================================================');
console.log('        JOURNAL MÉTÉOROLOGIQUE DE LA FERME        ');
console.log('    Suivi agroclimatique de la ferme pédagogique  ');
console.log('==================================================');
console.log(' ');
console.log('--------------------- MENU ---------------------');
console.log('1. Ajouter un relevé');
console.log('2. Lister les relevés');
console.log('3. Rechercher (identifiant, date, journées pluvieuses)');
console.log('4. Trier (température, pluie)');
console.log('5. Synthèse de la série');
console.log('0. Quitter');

const choix = await demander('Votre choix : '); // appel la fonction ''demander'' pour permette à l'utilisateur d'ecrire son choix
console.log(choix)
  console.log("À compléter : écrivez le menu dans app.js (fiches/3-ajouter-lister.md).");
  fermerSaisie();
}

main();
