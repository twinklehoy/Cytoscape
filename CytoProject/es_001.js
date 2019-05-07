var cy;
var i =0;
var j=0;
var k = 0;
var cost = 0;
var node;
var kk=0;
var nodeArray = new Array();
var edgeArray = new Array();
let pesi = new Array();
var sorted= new Array();
var sortedEdges = new Array();
var idEdge = new Array();
var weight;
var toSplit;
window.onload = function() {
   cy = cytoscape({
  container: document.getElementById('cy'),
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#378de5',
        'label': 'data(id)',
        'text-valign':'center',
        'font-family' : 'Arial, Helvetica, sans-serif',
        'pie-size':'100%',
        'font-weight' : 'bold',
        'font-size' :15

      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': 'black',
        'curve-style': 'bezier',
        'label': 'data(peso)',
        'text-margin-y' : - 8,
        "text-rotation" : "autorotate",
        'target-arrow-color': 'black',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'grid',
    rows: 1
  }
});
   document.getElementById("lay").addEventListener("click",function(){
   var layout=cy.layout({
    name : 'grid',
    fit : 'true',
    avoidOverlap:true,
    rows:2,
    cols:3,
    animate:true
   })
   layout.run();
});
document.getElementById("addN").addEventListener("click",function(){
  cy.add({
    group: 'nodes',
    data: { weight: 75 ,id:i,esaminato:false,appartenenza:i,bellWeight:Infinity},
    position: { x: Math.floor(Math.random()*800), y: Math.floor(Math.random()*470) }
});
  nodeArray[i]=cy.$id(''+i);
i++;
});
document.getElementById("addE").addEventListener("click",function(){
  weight = $('#weight').val();
  toSplit = $('#src2targ').val();
  var srcAndtarget = toSplit.split(",");
  var edgeID = srcAndtarget[0] + srcAndtarget[1];
    if(weight!=""){cy.add({
      group: 'edges',
      data: {id: edgeID,source:srcAndtarget[0],target:srcAndtarget[1],peso:weight}
  });
      edgeArray[j]=cy.$id(''+ edgeID);

      pesi[j]=parseInt(edgeArray[j].data().peso, 10);
      sorted=pesi.sort((a, b) => a - b);
    }else{
      console.log("Devi aggiungere il peso");
      j--;
    }
  j++;
});
  document.getElementById("kr").addEventListener("click",function(){
    if(k<sorted.length && k<nodeArray.length-1){
      for(let edgeCounter=0;edgeCounter<edgeArray.length;edgeCounter++){
        if(sorted[k]==edgeArray[edgeCounter].data().peso){
          if(nodeArray[edgeArray[edgeCounter].data().target].data().appartenenza!=nodeArray[edgeArray[edgeCounter].data().source].data().appartenenza){
            nodeArray[edgeArray[edgeCounter].data().target].data().appartenenza=nodeArray[edgeArray[edgeCounter].data().source].data().appartenenza;
            cy.$id(edgeArray[edgeCounter].data().id).style('line-color','red');
            console.log("Minimum spanning-tree cost:" + parseInt(edgeArray[edgeCounter].data().peso,10) + cost);
          }else{
            cy.$id(edgeArray[edgeCounter].data().id).style('line-style','dotted');
            cy.$id(edgeArray[edgeCounter].data().id).style('line-color','yellow');
          }
        }
      }
    k++;
  }
});
document.getElementById("bell").addEventListener("click",function(){
  for(let bb=0;bb<edgeArray.length;bb++){
    idEdge[bb]=edgeArray[bb].data().id;
  }
  sortedEdges=idEdge.sort();
/*cy.on('tap', 'node', function(evt){//nel caso in cui si vuole partire da un nodo selezionato
    node = evt.target;
    node.data().bellWeight= 0;
)}*/
  nodeArray[0].data().bellWeight = 0;
  if(kk<nodeArray.length-1){
    for(let counter=0;counter<sortedEdges.length;counter++){
      var source = parseInt(sortedEdges[counter].charAt(0),10);
      var target = (parseInt(sortedEdges[counter],10))%10;
      for(var counter2=0;counter2<edgeArray.length;counter2++){
        if(parseInt(sortedEdges[counter],10)==parseInt(edgeArray[counter2].data().id,10)){
           var currentEdge = counter2;
            if(nodeArray[source].data().bellWeight+parseInt(edgeArray[currentEdge].data().peso,10)<nodeArray[target].data().bellWeight,10){
              nodeArray[target].data().bellWeight = parseInt(nodeArray[source].data().bellWeight,10)+parseInt(edgeArray[currentEdge].data().peso,10);
              cy.$id(nodeArray[source].data().id).style('background-color','yellow');
            }
          }
        }
      }
    }
  kk++;
});
}