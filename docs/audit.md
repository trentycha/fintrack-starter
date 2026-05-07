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

  ## Code smells identifiés

### [Long Method] — Priorité : Haute
Localisation : transactions-legacy.js:35 (`processTransactions`)
Constat : la fonction fait ~180 lignes et gère 6 responsabilités distinctes.
Impact : impossible à tester unitairement, une modification peut casser une autre zone.
Proposition : découper en fonctions séparées — `filterByMonth`, `validateTransaction`, `convertCurrency`, `categorize`, `sortByDate`.

### [God Object] — Priorité : Haute
Localisation : transactions-legacy.js (module entier)
Constat : le module concentre filtrage, validation, conversion, catégorisation, tri et calculs dans un seul endroit.
Impact : toute modification nécessite de comprendre l'intégralité du module.
Proposition : séparer en modules distincts par responsabilité.

### [Magic Number] — Priorité : Haute
Localisation : transactions-legacy.js:110-125
Constat : les taux de change sont codés en dur (0.92, 1.08, 1.17, 0.85).
Impact : si un taux change, il faut modifier le code sans aucun contexte sur la signification des valeurs.
Proposition : extraire dans une constante nommée `EXCHANGE_RATES` ou récupérer depuis une API.

### [Dead Code] — Priorité : Moyenne
Localisation : transactions-legacy.js:25 (`formatDate2` commentée) et fonction `legacyHelper`
Constat : `formatDate2` est commentée, `legacyHelper` est exportée mais jamais utilisée.
Impact : surface de code inutile qui génère de la confusion.
Proposition : supprimer les deux.

### [Duplicate Code] — Priorité : Moyenne
Localisation : transactions-legacy.js:15 (`fmt`) et transactions-legacy.js:25 (`formatDate2`)
Constat : deux fonctions de formatage de date avec la même logique.
Impact : si le format change, il faut modifier aux deux endroits.
Proposition : garder une seule fonction de formatage réutilisable.

### [Unclear Naming] — Priorité : Moyenne
Localisation : transactions-legacy.js:35 (`i`, `j`, `tx`, `lab`, `pa`, `pb`, `da`, `db`)
Constat : variables à un ou deux caractères sans contexte clair.
Impact : lecture difficile, débogage ralenti.
Proposition : renommer en `transactionIndex`, `transaction`, `label`, `datePartsA` etc.

### [Long Parameter List] — Priorité : Basse
Localisation : transactions-legacy.js:35 (`processTransactions(txs, opts)`)
Constat : `opts` est un objet qui regroupe 4 paramètres implicites (currency, month, year, threshold).
Impact : l'interface de la fonction n'est pas claire sans lire la doc ou le code.
Proposition : utiliser un objet avec des valeurs par défaut explicites et documentées.

### [Fragile Logic] — Priorité : Haute
Localisation : transactions-legacy.js:140-165 (catégorisation par `indexOf`)
Constat : la catégorie est devinée à partir du libellé avec des mots-clés en dur.
Impact : un libellé inattendu tombe silencieusement en catégorie `autre` sans avertissement.
Proposition : stocker la catégorie directement dans la donnée et ne pas la deviner.

## Refactoring effectué

### Zone 1 : Taux de change magic numbers
Remplacement du bloc `if/else` avec les taux codés en dur par une constante 
nommée `EXCHANGE_RATES`. Les taux sont maintenant centralisés en un seul 
endroit, plus lisibles et plus faciles à modifier.

### Zone 2 : Dead code supprimé
Suppression de la fonction `legacyHelper` jamais utilisée et de la fonction 
`formatDate2` commentée. Le module est maintenant plus léger et ne contient 
plus de code inutile à maintenir.

### Renommage
La variable `lab` a été renommée en `label` pour plus de clarté dans le bloc 
de catégorisation.