import { InputSelectBg, InputDeselectBg } from './InputSelection.js';

function InputAutoSize(cible) {
    cible.style.width = getInputValueWidth.call(cible) + 'px';
}

var getInputValueWidth = (function(){
    function copyNodeStyle(sourceNode, targetNode) {
      var computedStyle = window.getComputedStyle(sourceNode);
      Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
    }
    
    function createInputMeassureElm( inputelm ){
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
    
    return function(){
      return createInputMeassureElm(this).offsetWidth;
    }
})();

function AddEventInput(cible) {
    cible.addEventListener('input', function() {
        InputAutoSize(cible)
    });
    cible.addEventListener('focus', function() {
        InputSelectBg(cible)
    });
    cible.addEventListener('blur', function() {
        InputDeselectBg(cible)
    });
}

const tdInputText  = document.getElementsByClassName('tdInputText');

for (let i = 0; i < tdInputText.length; i++) {
    AddEventInput(tdInputText[i])
}

export { InputAutoSize, AddEventInput };