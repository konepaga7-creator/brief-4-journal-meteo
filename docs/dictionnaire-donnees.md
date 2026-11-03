# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | M04 |
| date |Date du relevé |date |AAAA-MM-JJ |— |2026-11-02 |
| temperatureC | Température de l'air relevée| nombre|valeur positive ou négative permise |°C | 25|
| pluieMm |Hauteur de pluie tombée | nombre| 0 ou plus|mm |12 |
| humiditeAirPct |Humidité relative de l'air |nombre |entre 0 et 100 |% |85 |

**Listes de valeurs autorisées** : Elles sont similaires aux règles de validation.

**Sources** : SUJET.md + fichier donnees/mesures.json
