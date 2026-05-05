1. Un test unitaire teste une seule fonctionnalité. Par exemple, dans FinTrack, on pourrait tester la fonction simpleInterest() du fochier calculator.js.

2. Un test d'intégration va tester plusieurs fonctionnalités, qui généralement peuvent se compléter. Dans FinTrack, on pourrait tester computeBalance() + simpleInterest() pour vérifier que les deux s'assemblent bien pour App.jsx où la variable balance ets utilisée dans la variable monthlyInterestPreview.

3. Le test E2E a pour objectif de tester l'ensemble de l'application en entière. Chaque élément est testé, ce qui rend ce type de test plus long.

4. Il faut faire de nombreux tests unitaires (~70), un peu moins de tests d'intégration (~29) et un test E2E.