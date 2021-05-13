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
  for (let i = 0; i < tableSize.row; i++) {
    for (let j = 0; j < tableSize.col; j++) {
      let inputValueWidth = getInputValueWidth.call(tableMatrice[i][j])
      tableMatrice[i][j].style.width = inputValueWidth + 10 + 'px'
    }
  }

  let lignesWidth = []
  for (let i = 0; i < tableSize.row; i++) {
    let casesWidth = []
    for (let j = 0; j < tableSize.col; j++) {
      console.log(tableMatrice[i][j].parentElement.getBoundingClientRect().width)
      console.log(tableMatrice[i][j].parentElement.offsetWidth)
      //casesWidth.push(tableMatrice[i][j].parentElement.getBoundingClientRect().width)
      casesWidth.push(tableMatrice[i][j].parentElement.offsetWidth)
    }
    lignesWidth.push(casesWidth)
  }

  console.log(lignesWidth)
  for (let i = 0; i < tableSize.row; i++) {
    for (let j = 0; j < tableSize.col; j++) {
      tableMatrice[i][j].style.width = lignesWidth[i][j] + 'px'
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