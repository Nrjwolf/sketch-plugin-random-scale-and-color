const sketch = require('sketch')

//————————————————//
//--- Settings ---//

var randomColors = 
[
  "#eb753e",
  "#ea8840",
  "#eea148",
  "#f6c656",
  "#ec7436",
  "#f12520",
]

var randomScale = 
{
  from : 120,
  to : 150
}
//________________//








//--- Utils ---//
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

function toArray(nsArray) {
  return nsArray.map(el => el);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//--- Code ---//

//-- Random color --//
var selection = context.selection;
var loop = selection.objectEnumerator();
while (item = loop.nextObject()) {
  var shapeStyle = item.style();
  var fills = shapeStyle.fills();
  if(fills.count() <= 0){
      fills.addNewStylePart();
  }
  var fill = fills.firstObject();
  [fill setColor:[MSImmutableColor colorWithSVGString: randomColors.random()]]
}

//-- Random scale --//
let document = sketch.fromNative(context.document);
let selectedLayers = toArray(document.selectedLayers);
selectedLayers.forEach(selectedLayer => scale(selectedLayer));
function scale(layer) {
  let oldWidth = layer.frame.width;
  let oldHeight = layer.frame.height;
  layer.frame.width = getRandomIntInclusive(randomScale.from, randomScale.to);
  layer.frame.height = getRandomIntInclusive(randomScale.from, randomScale.to);
  layer.frame.x = Math.round(layer.frame.x - ((layer.frame.width - oldWidth) / 2));
  layer.frame.y = Math.round(layer.frame.y - ((layer.frame.height - oldHeight) / 2));
}

