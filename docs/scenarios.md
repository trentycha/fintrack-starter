# Scénarios BDD — Export CSV

## Scénario 1 : Export d'un CSV vide

Étant donné une liste de transactions vide  
Quand l'utilisateur clique sur "Exporter en CSV"  
Alors le fichier téléchargé contient uniquement la ligne d'en-tête `date,libellé,montant,catégorie`

## Scénario 2 : Export d'une transaction

Étant donné une liste contenant une transaction du mois en cours  
Quand l'utilisateur clique sur "Exporter en CSV"  
Alors le fichier téléchargé contient la ligne d'en-tête suivie d'une ligne avec la date, le libellé, le montant et la catégorie

## Scénario 3 : Filtrage des transactions anciennes

Étant donné une liste contenant une transaction du mois en cours et une transaction de 2020  
Quand l'utilisateur clique sur "Exporter en CSV"  
Alors le fichier téléchargé contient uniquement la transaction du mois en cours

## Scénario 4 : Échappement des caractères spéciaux

Étant donné une transaction dont le libellé contient une virgule  
Quand l'utilisateur clique sur "Exporter en CSV"  
Alors le libellé est entouré de guillemets dans le fichier téléchargé

## Scénario 5 : Export de plusieurs transactions

Étant donné une liste contenant plusieurs transactions du mois en cours  
Quand l'utilisateur clique sur "Exporter en CSV"  
Alors le fichier téléchargé contient une ligne par transaction