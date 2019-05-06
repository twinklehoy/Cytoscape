var cy;
var i =0;
var j=0;
var nodeArray = new Array();
var edgeArray = new Array();
let pesi = new Array();
var weight;
var toSplit;
var sorted= new Array();
var sortedEdges = new Array();
var idEdge = new Array();
window.onload = function() {
   cy = cytoscape({
  container: document.getElementById('cy'),
  style: [
    {
      selector: 'node',
      style: {
        'background-color': 'red',
        'label': 'data(id)',
        'text-valign':'center'
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
// var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];
document.getElementById("addN").addEventListener("click",function(){
  cy.add({
    group: 'nodes',
    data: { weight: 75 ,id:i,esaminato:false,appartenenza:i,bellWeight:Infinity},
    position: { x: Math.floor(Math.random()*400), y: Math.floor(Math.random()*300) }
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
    data: {id: edgeID,source:srcAndtarget[0],target:srcAndtarget[1],peso:weight}//qui dentro trovi il peso degli edge
});
    edgeArray[j]=cy.$id(''+ edgeID);

    pesi[j]=parseInt(edgeArray[j]._private.data.peso, 10);
    sorted=pesi.sort((a, b) => a - b);
}else{
  console.log("Devi aggiungere il peso");
  j--;
}
j++;
});
var k = 0;
var kk =0;
  document.getElementById("kr").addEventListener("click",function(){
    if(k<sorted.length ){
  for(let edgeCounter=0;edgeCounter<edgeArray.length;edgeCounter++){
    if(sorted[k]==edgeArray[edgeCounter]._private.data.peso){
      if(nodeArray[edgeArray[edgeCounter]._private.data.source]._private.data.appartenenza!=nodeArray[edgeArray[edgeCounter]._private.data.target]._private.data.appartenenza){
      console.log("i valori sono diversi");
      nodeArray[edgeArray[edgeCounter]._private.data.target]._private.data.appartenenza=nodeArray[edgeArray[edgeCounter]._private.data.source]._private.data.appartenenza;
      console.log("trg app: " + nodeArray[edgeArray[edgeCounter]._private.data.target]._private.data.appartenenza);
      console.log("source app: "+ nodeArray[edgeArray[edgeCounter]._private.data.source]._private.data.appartenenza);
      cy.$id(edgeArray[edgeCounter]._private.data.id).style('line-color','red');
      }else{
      console.log("i valori sono uguali");
    }
    }
  }
  k++;
}
});
  var node;
    document.getElementById("bell").addEventListener("click",function(){
  for(let bb=0;bb<edgeArray.length;bb++){
    idEdge[bb]=edgeArray[bb]._private.data.id;
  }
  sortedEdges=idEdge.sort();
  cy.on('tap', 'node', function(evt){
  node = evt.target;
  node._private.data.appartenenza = 0;
   if(kk<nodeArray.length-1){
    for(let counter=0;counter<sortedEdges.length;counter++){
      let index1 = parseInt(sortedEdges[counter],10)/10;
      let index2 = parseInt(sortedEdges[counter],10)%10;
      console.log("index1 " + index1);
      console.log("index2 " + index2);
      if(nodeArray[index1]._private.data.bellWeight + nodeArray[index1]._private.edges[]<nodeArray[index2]._private.data.bellWeight)
    }
  }
  //console.log(node._private.data.id);
})
kk++;
  console.log(sortedEdges);
});
}