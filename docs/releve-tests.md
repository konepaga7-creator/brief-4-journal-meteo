# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : 

moyenne de la température= (27+28+26+29+27+30+28+26+29+30)/10 = 28°C
température minimale = 26°C,id:"M03","M08"
température maximale = 30°C,id:"M06,"M10"
cumul de pluie = (0+5+12+0+3+0+8+15+0+2) = 45 mm


**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
# Tests de l'ajout de relevés (choix 1 et 2)

Les tests ont été faits avec node app.js, menu choix 1. Le journal comptait 11 relevés au départ (après l'ajout de M11).

| N° | Règle testée | Saisie (id / date / température / pluie / humidité) | Résultat attendu | Résultat obtenu | OK |


| 1 | Identifiant obligatoire | (vide) / 2026-10-26 / 25 / 4 / 70 | Refusé : « L'identifiant est obligatoire. » Journal inchangé (11) | Conforme | Oui |

| 2 | Identifiant unique | m11 / 2026-10-26 / 25 / 4 / 70 | Refusé : « L'identifiant M11 existe déja. » Journal inchangé (11) | Conforme | Oui |

| 3 | Date réelle | M12 / 2026-02-30 / 25 / 4 / 70 | Refusé : « La date doit exister et être au format AAAA-MM-JJ. » Journal inchangé (11) | Conforme | Oui |

| 4 | Température = nombre | M12 / 2026-10-26 / abc / 4 / 70 | Refusé : « La température doit être un nombre (en °C). » Journal inchangé (11) | Conforme | Oui |

| 5 | Pluie positive ou nulle | M12 / 2026-10-26 / 25 / -3 / 70 | Refusé : « La pluie doit être un nombre positif ou nul (en mm). » Journal inchangé (11) | Conforme | Oui |

| 6 | Humidité entre 0 et 100 | M12 / 2026-10-26 / 25 / 4 / 150 | Refusé : « L'humidité de l'air doit être un nombre entre 0 et 100 (en %). » Journal inchangé (11) | Conforme | Oui |

| 7 | Valeur limite : température négative | M13 / 2026-10-27 / -2 / 4 / 70 | Accepté, journal à 12 relevé(s) | Conforme | Oui |

| 8 | Valeur limite : humidité 100 % | M14 / 2026-10-28 / 25 / 4 / 100 | Accepté, journal à 13 relevé(s) | Conforme | Oui |

| 9 | Trois erreurs en même temps | M12 / 2026-02-30 / 25 / -3 / 150 | Refusé avec 3 lignes d'erreur (date, pluie, humidité). Journal inchangé (13) | Conforme | Oui |

## Conclusion

Les six règles de validation refusent bien les valeurs interdites, sans modifier le journal. Les deux valeurs limites (-2 °C et 100 %) sont acceptées. Une saisie avec plusieurs erreurs affiche un message par règle non respectée.

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
