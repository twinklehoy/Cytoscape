# Progetto Cytoscape

## Consegna
Implementare gli algoritmi di `Kruskal` e `Bellman Ford` in Javascript, utilizzando
la libreria `Cytoscape.js` per rappresentarli .
## Javascript
### Le variabili :
* `cy` : la varabile viene utilizzata per la creazione del container che conterra' i grafi 
* `i,j,k,kk` : variabili utilizzate all'interno dei cicli
* `cost` : viene inizializzato a 0 e conterra' il `costo minimo del Spanning Tree` 
* `nodeArray` : e' un array che contiene gli oggetti `"node"`, creato per poter
accedere alle diverse proprieta' dei nodi
* `edgeArray` : e' un array che contiene gli oggetti `"edge"`, creato per poter
accedere alle diverse proprieta' degli edge
* `pesi` : e' un array che contiene soltanto la proprieta' `"peso"` di ogni edge
* `sorted` :  e' un array ordinato in ordine crescente, che viene utilizzato nella implementazione
dell'Algoritmo di `Kruskal`
* `sortedEdges` : e' un array ordinato con il metodo `.sort()` di Javascript, che non ordina numeri, ma caratteri , in ordine alfabetico ; verra' utilizzato nell'implementazione dell'Algoritmo di 
`Bellman Ford`
### Le funzioni sono anonime, e collegate a dei pulsanti :
* Ai pulsanti `Add Node` e `Add Edge` viene collegata la funzione della libreria Cytoscape.js`cy.add()` . Specificando il gruppo di cui fa parte l'oggetto (`nodes` , `edges` , ecc.),la funzione viene utilizzata per aggiungerlo nel container . Con la loro creazione ,i nodi riceveno diverse proprieta' : `id` , 'appartenenza' e 'bellWeight' mentre gli edge ricevono : `id` , `source` , `target` e il `peso` di un arco .
* Al pulsante `Kruskal` ho collegato le istruzioni che servono a trovare il "Minimum Spanning Tree" .
* Al pulsante `Bellman Ford` ho collegato le istruzioni che servono a trovare il percorso con costo minimo a ciascun nodo del grafo
## HTML
Nel file `index.html` si trovano i pulsanti **'Add Node'** , **'Add Edge'** , **'Kruskal'** , **'Bellman Ford'** e **'Layout'** . Nel file ci sono anche due **input** : uno serve per scegliere la sorgente e il destinatario di un arco ( come indicato, il modo corretto per scriverli e' separandoli con una virgola ) mentre l'altro ha il compito di organizzare i nodi nel container , secondo il `layout "grid"` . 
## CSS
Nel file `style_001.css` ho soltanto **modificato** l'aspetto dei **pulsanti** , degli **input** , del **container cytoscape** e del **header** .
## Problemi incontrati/Soluzioni
* La prima questione risolta e' stata la decisione su come generare i pesi degli archi . Anche se avessi potuto usare la funzione Math.random() per generare i pesi
degli archi in modo casuale, ho deciso di permettere all'utente di scegliere sia i pesi, che la sorgente e il destinatario . Lo svantaggio di questo metodo di costruire un grafo e' il tempo che ci si impegna se un utente vuole costruire un grafo formato di tanti archi, mentre il vantaggio e' quello di poter creare un grafo "customizzato" .
* L'algoritmo di `Kruskal` trova il percorso con il costo minimo . La difficolta' l'ho trovata nel momento in cui ho dovuto controllare se nel grafo ci siano cicli(non accettati dall'algoritmo). Dopo essermi confrontata con uno dei miei compagni di classe sulla soluzione di questo problema, ho deciso di provare la soluzione da lui trovata . L'algoritmo funziona quasi sempre, a parte in un caso molto specifico, in cui due archi con peso minimo (ad esempio 5 e 6, oppure 11 e 12) non hanno nessun nodo in comune , e quindi le loro "appartenenze" sono diverse, condizione che permette all'algoritmo di continuare a esaminare i prossimi archi.
* Per quanto riguarda l'algoritmo di `Bellman Ford` l'unica difficolta' incontrata e' stata quella di gestire in modo corretto gli indici. Siccome un nodo puo' essere collegato ad uno o *piu'* nodi, e non ad uno solo, diventa molto facile sbagliare nella gestione degli indici. Per adesso l'algoritmo parte sempre dal nodo di *id = 0* , pero' , nel file .js si trova un pezzo commentato di codice, che permette all'utente di selezionare il nodo di partenza .