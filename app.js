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



function afficherAccueil() {
  console.log('==================================================');
  console.log('JOURNAL MÉTÉOROLOGIQUE DE LA FERME');
  console.log('Suivi agroclimatique de la ferme pédagogique');
  console.log('==================================================');
}

function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter un relevé');
  console.log('2. Lister les relevés');
  console.log('3. Rechercher (identifiant, date, journées pluvieuses)');
  console.log('4. Trier (température, pluie)');
  console.log('5. Synthèse de la série');
  console.log('0. Quitter');
}



async function chargerJournal() {
  try {
    const releves = await chargerJson(FICHIER_DONNEES);
    console.log(`${releves.length} relevés chargés depuis ${FICHIER_DONNEES}`);
    return releves;
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le journal démarre vide.`);
    return [];
  }
}


async function ajouter(releves) {
  console.log('--- Ajouter un relevé ---');

  const id = await demander('Identifiant (ex. M11) : ');
  if (id === null) return;

  const date = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (date === null) return;

  const temperatureC = await demander('Température en °C : ');
  if (temperatureC === null) return;

  const pluieMm = await demander('Pluie en mm : ');
  if (pluieMm === null) return;

  const humiditeAirPct = await demander("Humidité relative de l'air en % : ");
  if (humiditeAirPct === null) return;

  const saisie = { id: id.toUpperCase(), date, temperatureC, pluieMm, humiditeAirPct };
  const erreurs = ajouterReleve(releves, saisie);

  if (erreurs.length > 0) {
    console.log('Relevé refusé :');
    for (const erreur of erreurs) {
      console.log(`- ${erreur}`);
    }
    console.log(`Le journal compte toujours ${releves.length} relevés.`);
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, releves);
  console.log(`Relevé ${saisie.id} ajouté. Le journal compte ${releves.length} relevés.`);
}



function lister(releves) {
  console.log(`--- Liste des relevés (${releves.length}) ---`);
  console.log(listerReleves(releves));
}



async function rechercherParId(releves) {
  const saisie = await demander('Identifiant : ');
  if (saisie === null) return;

  const id = saisie.toUpperCase();
  const releve = trouverParId(releves, id);
  if (releve === undefined) {
    console.log(`Relevé ${id} introuvable.`);
    return;
  }
  console.log(formaterReleve(releve));
}


async function rechercher(releves) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par date');
  

  const choix = await demander('Votre choix : ');
  if (choix === null) return;

  switch (choix.trim()) {
    case '1':
      await rechercherParId(releves);
      break;
    case '2':
      await rechercherParDate(releves);
      break;
    case '3':
      afficherJoursPluvieux(releves);
      break;
    default:
      console.log('Choix inconnu : retour au menu.');
  }
}


async function main() {
  ouvrirSaisie();
  afficherAccueil();

  const releves = await chargerJournal();

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Votre choix : ');
    if (choix === null) break;

    switch (choix.trim()) {
      case '1':
        await ajouter(releves);
        break;
      case '2':
        lister(releves);
        break;
      case '3':
        await rechercher(releves);
        break;
      case '4':
        await trier(releves);
        break;
      case '5':
        synthese(releves);
        break;
      case '0':
        continuer = false;
        break;
      default:
        console.log('Choix inconnu : tapez un chiffre du menu.');
    }
  }

  fermerSaisie();
  console.log('Au revoir.');
}

main();