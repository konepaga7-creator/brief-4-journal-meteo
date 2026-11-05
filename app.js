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
  console.log(" ==================================================");
  console.log( " JOURNAL MÉTÉOROLOGIQUE DE LA FERME"  );
  console.log("Suivi agroclimatique de la ferme pédagogique"   );
  console.log("==================================================");
}

function afficherMenu() {
  console.log('');
  console.log("--------------------- MENU ---------------------");
  console.log("1. Ajouter un relevé");
  console.log("2. Lister les relevés");
  console.log("3. Rechercher (identifiant, date, journées pluvieuses)");
  console.log("4. Trier (température, pluie)");
  console.log("5. Synthèse de la série");
  console.log("0. Quitter");
}

async function chargerJournal() {
  try {
    const releves = await chargerJson(FICHIER_DONNEES);
    console.log(`${releves.length} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
    return releves;
  } catch (erreur) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le journal démarre vide.`);
    return [];
  }
}

async function ajouter(releves) {
  console.log("--- Ajouter un relevé ---");

  const id = await demander("Identifiant (ex. M11) : ");
  if (id === null) {
    return;
  }
  const date = await demander("Date du relevé (AAAA-MM-JJ) : ");
  if (date === null) {
    return;
  }
  const temperatureC = await demander("Température en °C : ");
  if (temperatureC === null) {
    return;
  }
  const pluieMm = await demander("Pluie en mm : ");
  if (pluieMm === null) {
    return;
  }
  const humiditeAirPct = await demander("Humidité relative de l'air en % : ");
  if (humiditeAirPct === null) {
    return;
  }

  const saisie = { id: id.toUpperCase(), date, temperatureC, pluieMm, humiditeAirPct };
  const erreurs = ajouterReleve(releves, saisie);

  if (erreurs.length > 0) {
    console.log("Relevé refusé :");
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le journal compte toujours ${releves.length} relevé(s).`);
    return;
  }

  try {
    await enregistrerJson(FICHIER_DONNEES, releves);
  } catch (erreur) {
    console.log(`Relevé ajouté en mémoire, mais non enregistré : ${erreur.message}`);
    return;
  }
  console.log(`Relevé ${saisie.id} ajouté. Le journal compte ${releves.length} relevé(s).`);
}

function lister(releves) {
  console.log(`--- Liste des relevés (${releves.length}) ---`);
  console.log(listerReleves(releves));
}

async function rechercher(releves) {
  console.log("--- Rechercher ---");
  console.log("1. Par identifiant");
  console.log("2. Par date");
  console.log(`3. Les journées pluvieuses (au moins ${SEUIL_JOUR_PLUVIEUX} mm)`);

  const choix = await demander("Votre choix : ");
  if (choix === null) {
    return;
  }

  switch (choix) {
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
      console.log("Choix inconnu : retour au menu.");
  }
}

async function rechercherParId(releves) {
  const saisie = await demander("Identifiant : ");
  if (saisie === null) {
    return;
  }
  const id = saisie.toUpperCase();
  const releve = trouverParId(releves, id);
  if (releve === undefined) {
    console.log(`Relevé ${id} introuvable.`);
    return;
  }
  console.log(formaterReleve(releve));
}

async function rechercherParDate(releves) {
  const date = await demander("Date (AAAA-MM-JJ) : ");
  if (date === null) {
    return;
  }
  const releve = trouverParDate(releves, date);
  if (releve === undefined) {
    console.log(`Relevé du ${date} introuvable.`);
    return;
  }
  console.log(formaterReleve(releve));
}

function afficherJoursPluvieux(releves) {
  const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
  console.log(`${pluvieux.length} journée(s) avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie :`);
  console.log(listerReleves(pluvieux));
}

async function trier(releves) {
  console.log("--- Trier ---");
  console.log("1. Par température croissante");
  console.log("2. Par pluie croissante");

  const choix = await demander("Votre choix : ");
  if (choix === null) {
    return;
  }

  switch (choix) {
    case '1':
      console.log(listerReleves(trierParTemperature(releves)));
      break;
    case '2':
      console.log(listerReleves(trierParPluie(releves)));
      break;
    default:
      console.log("Choix inconnu : retour au menu.");
  }
}

function afficherSynthese(releves) {
  const moyenne = moyenneTemperature(releves);
  const minMax = temperatureMinMax(releves);
  const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);

  console.log("--- Synthèse de la série ---");
  console.log(`Nombre de relevés : ${releves.length}`);

  if (moyenne === null) {
    console.log("Température moyenne : aucune donnée");
  } else {
    console.log(`Température moyenne : ${moyenne} °C`);
  }

  if (minMax === null) {
    console.log("Températures minimale et maximale : aucune donnée");
  } else {
    console.log(`Température minimale : ${minMax.min} °C · maximale : ${minMax.max} °C`);
  }

  console.log(`Cumul de pluie : ${cumulPluie(releves)} mm`);
  console.log(`Journées avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie : ${pluvieux.length}`);
  console.log('Rappels :');
  console.log('  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.');
  console.log(`  - Le seuil de ${SEUIL_JOUR_PLUVIEUX} mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.`);
  console.log("  - L'humidité relative de l'air (en %) n'est pas l'humidité du sol.");
}

async function main() {
  ouvrirSaisie();
  try {
    afficherAccueil();
    const releves = await chargerJournal();

    let continuer = true;
    while (continuer) {
      afficherMenu();
      const choix = await demander('Votre choix : ');

      if (choix === null) {
        continuer = false;
      } else {
        try {
          switch (choix) {
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
              afficherSynthese(releves);
              break;
            case '0':
              console.log("Au revoir !");
              continuer = false;
              break;
            default:
              console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
          }
        } catch (erreur) {
          if (erreur.message.startsWith("TODO")) {
            console.log(`À compléter : ${erreur.message}`);
          } else {
            console.log(`Erreur inattendue : ${erreur.message}`);
          }
        }
      }
    }
  } finally {
    fermerSaisie();
  }
}

main();


