import { AddEventCtrlClic } from './InputSelection.js';
import { GenerateToLatex } from './GenerateToLatex.js';
import { IsStrsContains1Elt } from "./TableFusion.js"
import { tableMatrice, tableSize } from './Table.js';

const tdInputText = document.getElementsByClassName('tdInputText');

function RemoveDuplicates(a) {
  return a.filter((element, index) => a.indexOf(element) === index);
}

//Met les inputs à la bonne taille s'ils ont du contenu au chargement de la page
//UpdateInputSize(tdInputText);

function InputAutoSize(cible) {
  let lePlusLong = 0;

  /*
  let inputSize = getInputValueWidth.call(cible);
  if (inputSize > parseInt(cible.style.minWidth))
    cible.style.width = inputSize + 10 + 'px'
  else {
    cible.style.width = 30 + 'px'
  }*/

  //On récupère l'input avec le contenu le plus long de la colonne
  let nbCasesParRow = [];
  for (let i = 0; i < tableSize.row; i++) {
    nbCasesParRow.push([])
    for (let j = 0; j < tableSize.col; j++) {
      if (IsStrsContains1Elt(tableMatrice[i][j].parentElement.dataset.col, cible.parentElement.dataset.col)) {
        let inputSize = getInputValueWidth.call(tableMatrice[i][j]);
        if (inputSize > lePlusLong) {
          lePlusLong = inputSize;
        }
        nbCasesParRow[i].push(tableMatrice[i][j])
      }
    }
    nbCasesParRow[i] = RemoveDuplicates(nbCasesParRow[i])
  }
  console.log("test")
  console.log(lePlusLong)
  console.log(cible.style.width)
  console.log("for")
  for (let i = 0; i < nbCasesParRow.length; i++) {
    //On trouver l'objectif pour chaque ligne :
    let objectifLigne = (lePlusLong + 10)
    let objectifCase = objectifLigne / nbCasesParRow[i].length - (3 * nbCasesParRow[i].length)
    let nbCasesAChanger = nbCasesParRow[i].length
    console.log("ligne: "+ objectifLigne)
    console.log("cases: "+ objectifCase)
    //On cherche si cases déjà assez grande voir trop grande et donc qui ne seront pas changées
    for (let j = 0; j < nbCasesParRow[i].length; j++) {
      if (parseInt(nbCasesParRow[i][j].style.width) > objectifCase) {
        console.log("testCHANGER")
        objectifLigne -= objectifCase - 3
        nbCasesAChanger--
      }
    }
    //On recalcul la tailles des cases trop petites
    objectifCase = objectifLigne / nbCasesAChanger - (3 * nbCasesAChanger)
    //On effectue les changement de width ligne par ligne
    for (let j = 0; j < nbCasesParRow[i].length; j++) {
      //On ne change que les cases trop petites
      if (objectifCase > getInputValueWidth.call(nbCasesParRow[i][j])) {
        nbCasesParRow[i][j].style.width = objectifCase + 'px'
      }
      else {
        console.log("nepaschanger")
        console.log(nbCasesParRow[i][j])
      }
    }
  }
}

function getInputValueWidth() {
  function copyNodeStyle(sourceNode, targetNode) {
    var computedStyle = window.getComputedStyle(sourceNode);
    Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
  }
  
  function createInputMeassureElm( inputelm ) {
    // create a dummy input element for measurements
    var meassureElm = document.createElement('span');
    // copy the read input's styles to the dummy input
    copyNodeStyle(inputelm, meassureElm);
    
    // set hard-coded styles needed for propper meassuring 
    meassureElm.style.width = 'auto';
    meassureElm.style.position = 'absolute';
    meassureElm.style.left = '-9999px';
    meassureElm.style.top = '-9999px';
    meassureElm.style.whiteSpace = 'pre';
    
    meassureElm.textContent = inputelm.value || '';
    
    // add the meassure element to the body
    document.body.appendChild(meassureElm);
    
    return meassureElm;
  }
  return createInputMeassureElm(this).offsetWidth;
};

function UpdateInputSize(inputsList) {
  for (let i = 0; i < inputsList.length; i++) {
    InputAutoSize(inputsList[i]);
  }
}

function AddEventInput(cible) {
  cible.addEventListener('focus', function() {
    GenerateToLatex();
  });

  cible.addEventListener('input', function() {
    InputAutoSize(cible);
    GenerateToLatex();
  });

  AddEventCtrlClic(cible);

  cible.addEventListener('blur', function() {
    GenerateToLatex();
  });
}

for (let i = 0; i < tdInputText.length; i++) {
  AddEventInput(tdInputText[i])
}

export { AddEventInput, UpdateInputSize };