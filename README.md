# Journal météorologique de la ferme


## Contexte

Le journal météorologique est utilisé par le responsable de la ferme pédagogique pour suivre les conditions des activités. Il permet de saisir, stocker dans un fichier JSON, retrouver une journée par sa date ou son identifiant et lister une courte série de 10 jours. Avec seulement 10 jours on ne peut pas parler de climat, car le climat se caractérise sur une longue période de 30 ans. On décrit uniquement la météo passée de ces journées. L'humidité relative de l'air n'est pas l'humidité du sol.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-4-journal-meteo.git
cd brief-4-journal-meteo
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités


- [ x] Données lues et enregistrées dans `donnees/releves.json`
- [x ] Ajouter un relevé, saisies invalides refusées sans arrêter le programme
- [x ] Lister les relevés, message si le journal est vide
- [x ] Rechercher par identifiant ou par date ; journées pluvieuses (au moins 10 mm)
- [ x] Trier par température ou par pluie
- [x ] Synthèse : température moyenne, minimale et maximale de la série, cumul de pluie, journées pluvieuses
- [ ] Bonus : supprimer et modifier un relevé (choix 6 et 7)
- [ ] Bonus : tri par température décroissante, journée la plus chaude

## Données

 Les données sont stockées dans le fichier releves.json.
Il contient 10 relevés météorologiques au départ. Mais ces données sont fictives, elles ont été inventées pour le brief, ce ne sont pas de vraies mesures météorologiques.

## Limites

D'abord une seule mesure par jour : on a une seule température par jour, donc le minimum et le maximum calculés sont ceux de la série.Ensuite un seuil de pluie arbitraire de 10 mm ne permet pas de conclure à une inondation ou à un besoin d'irrigation. Enfin La série de 10 jours ne permet pas de définir le climat de la région, on ne peut que décrire la météo de ces 10 jours.
## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Pagadjoufougou Abdoulaye Koné

konepaga7-creator!

Ce projet a été réalisé avec l'entraide des candidats du Brief Projet 4 de la classe Ubuntu.Je remercie particulièrement M. Anoh Levi, de la classe 2, qui travaille sur le même brief, pour son aide au niveau des explications des fonctions utilisées.Je remercie aussi Kamagaté Salia, qui m'a aidée à cloner le lien du projet avant de commencer.J'ai également travaillé via Google Meet avec M. Kimou Appiah Johan Junior, consultant AMOA, chef de projet et développeur Full Stack web, mobile et bureau. Il m'a apporté des conseils et des suggestions tout au long du projet.Durant tout le projet, Meta AI et Claude m'ont aidée à retrouver les lignes avec des erreurs, à faire mes commits en anglais et à remplir mon journal avec une bonne formulation, pour faciliter la compréhension à un quelconque lecteur.
