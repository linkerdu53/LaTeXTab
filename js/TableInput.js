import { AddEventCtrlClic } from './InputSelection.js';
import { GenerateToLatex } from './GenerateToLatex.js';

const tdInputText = document.getElementsByClassName('tdInputText');

//Met les inputs à la bonne taille s'ils ont du contenu au chargement de la page
UpdateInputSize(tdInputText);

function InputAutoSize(cible) {
  let lePlusLong = 0;
  for (let i = 0; i < tdInputText.length; i++) {
    if (tdInputText[i].parentElement.dataset.col === cible.parentElement.dataset.col) {
      //On récupère l'input avec le contenu le plus long de la colonne;
      let inputSize = getInputValueWidth.call(tdInputText[i]);
      if (inputSize > lePlusLong) {
        lePlusLong = inputSize;
      }
    }
  }
  let NewSize = lePlusLong + 10 + 'px';
  for (let i = 0; i < tdInputText.length; i++) {
    if (tdInputText[i].parentElement.dataset.col === cible.parentElement.dataset.col) {
      tdInputText[i].style.width = NewSize;
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