# Fiche individuelle

> Une page, avant la livraison. Prénom, nom, compte GitHub : ✏️

1. **Une fonction que j'ai écrite**, et comment elle marche : 

function chargerJson(chemin),chargerJson prend le chemin du fichier, lit son contenu, le transforme de JSON en tableau JavaScript, et le renvoie. Si le fichier n'existe pas, elle renvoie un tableau vide.

function enregistrerJson(chemin, enregistrements),enregistrerJson prend le chemin et le tableau de relevés, transforme le tableau en texte JSON lisible, et l'écrit dans le fichier pour sauvegarder.


2. **Une difficulté, et sa solution** : 
 Après avoir écrit le code de registre.js, je devais tester mes choix 1 (ajouter) et 2 (lister) en lançant app.js. Pendant une journée entière, je n'ai pas réussi à l'exécuter : le terminal affichait une erreur ou ne montrait rien du tout.

J'ai fini par trouver trois causes :
- Je lançais la commande depuis le mauvais dossier brief_projet_4 au lieu de brief-4-journal-meteo, donc Node ne trouvait pas app.js.
- J'avais ajouté un point par erreur à la fin de la commande (node app.js.).
- Dans mon code, les fonctions étaient imbriquées les unes dans les autres et main() n'appelait ni l'accueil, ni le menu, ni la boucle des choix : le programme se terminait sans rien afficher.

La solution : j'ai ouvert le terminal directement dans le bon dossier clic droit sur app.js, puis « Open in Integrated Terminal », j'ai tapé exactement node app.js, et j'ai réécrit app.js avec les fonctions les unes après les autres et une boucle qui affiche le menu et appelle la bonne action. Cela m'a appris à vérifier mon dossier de travail avant de lancer un programme, et à lire attentivement le message d'erreur de Node.


3. **L'entraide** (qui m'a aidé, qui j'ai aidé, sur quoi) : 

