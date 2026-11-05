# Journal de recherche

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |


| Comment saisir au clavier dans un terminal | Doc Node.js readline + IA| Le navigateur a un prompt() mais Node.js n'en a pas, il faut utiliser le module natif readline avec createInterface pour poser une question, et close() pour fermer|src/saisie.js, utilisé dans app.js.|

| Comment convertir texte en nombre avec virgule |Cours + MDN| versNombre() enlève les espaces, remplace la virgule , par un point ., puis utilise parseFloat. Si le texte n'est pas un nombre, ça renvoie NaN|src/outils.js, utilisé dans app.js pour la température / pluie|

|À quoi servent les tests de outils.js|Cours + Doc Node.js|Les tests ne servent pas dans app.js. Ils servent à vérifier que versNombre() donne le bon résultat pour plusieurs cas : "30,5" -> 30.5, "abc" -> NaN, etc. Si un test échoue, je sais que ma fonction est fausse sans lancer tout le programme|test/outils.test.js pour tester src/outils.js|

|Comment lire un fichier JSON| Avec mon groupe du brief |readFile lit le fichier en texte, puis JSON.parse transforme le texte en tableau JavaScript| src/stockage.js dans chargerJson.|

|Comment sauvegarder dans un fichier JSON|Avec mon groupe du brie|JSON.stringify transforme le tableau en texte lisible, puis fs.writeFile écrit ce texte dans le fichier|src/stockage.js dans enregistrerJson.|


|Comment faire un menu qui attend le choix|Avec mon groupe du brie + IA| Il faut utiliser await avec la fonction de saisie, sinon le programme continue sans attendre la réponse|app.js dans main().|