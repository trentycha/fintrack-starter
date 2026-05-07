# Audit — transactions-legacy.js

## Diagnostic général

Le module `transactions-legacy.js` expose deux fonctions : `processTransactions` 
et `legacyHelper`. La fonction principale `processTransactions` fait 180 lignes 
et gère à elle seule le filtrage par mois, la validation des données, la conversion 
de devises, la catégorisation automatique des libellés, les alertes de seuil et 
le tri par date. Cette accumulation de responsabilités dans une seule fonction 
rend le code difficile à tester et à maintenir. Le code fonctionne mais utilise 
des patterns obsolètes : `var` au lieu de `const/let`, boucles `for` classiques 
au lieu de `filter/map/reduce`, et des taux de change codés en dur. La fonction 
`legacyHelper` et la variable `TYPES` semblent inutilisées en dehors du module.

## Risques identifiés

- **Taux de change codés en dur** (lignes ~110-125) : les taux EUR/USD/GBP sont 
  des valeurs fixes dans le code. Si le taux change, il faut modifier le code 
  manuellement. Impact : données financières incorrectes sans erreur visible.

- **Fonction trop longue** (`processTransactions`, 180 lignes) : la fonction gère 
  trop de responsabilités. Impact : impossible à tester unitairement, une 
  modification dans une zone peut casser une autre.

- **Catégorisation par mots-clés fragile** (lignes ~140-165) : la catégorie est 
  devinée à partir du libellé avec `indexOf`. Un libellé inattendu tombe en 
  catégorie `autre` sans avertissement. Impact : données de catégorie non fiables.

- **Pas de gestion des entrées nulles** : si `txs` est `null` ou `undefined`, 
  la boucle `for` plante avec une erreur non explicite. Impact : crash silencieux.

- **`legacyHelper` est du dead code** : la fonction est exportée mais jamais 
  utilisée. Impact : surface de code inutile à maintenir et à tester.

- **Tri par date fragile** (lignes ~195-205) : le tri repose sur un parsing manuel 
  de chaînes `dd/mm/yyyy`. Un format de date inattendu produirait un tri incorrect 
  sans erreur. Impact : ordre des transactions incorrect.