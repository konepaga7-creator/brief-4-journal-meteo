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

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [ ] Données lues et enregistrées dans `donnees/releves.json`
- [ ] Ajouter un relevé, saisies invalides refusées sans arrêter le programme
- [ ] Lister les relevés, message si le journal est vide
- [ ] Rechercher par identifiant ou par date ; journées pluvieuses (au moins 10 mm)
- [ ] Trier par température ou par pluie
- [ ] Synthèse : température moyenne, minimale et maximale de la série, cumul de pluie, journées pluvieuses
- [ ] Bonus : supprimer et modifier un relevé (choix 6 et 7)
- [ ] Bonus : tri par température décroissante, journée la plus chaude

## Données

✏️ *Le fichier, le nombre de relevés, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), les unités. Rappelez qu'ils sont fictifs.*

## Limites

D'abord une seule mesure par jour : on a une seule température par jour, donc le minimum et le maximum calculés sont ceux de la série.Ensuite un seuil de pluie arbitraire de 10 mm ne permet pas de conclure à une inondation ou à un besoin d'irrigation. Enfin La série de 10 jours ne permet pas de définir le climat de la région, on ne peut que décrire la météo de ces 10 jours.
## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
Pagadjoufougou Abdoulaye Koné
konepaga7-creator!
