// ==UserScript==
// @name     ShadowsOfBrimstone CharSheet brimstone.neocities.org - Data import/export
// @version  1
// @author   legion151
// @grant    none
// @description Don't use this! If you read it and understand it, you may... however don't blame me for anything. This fiddles arround
// @description with your localStorage... and overrides stuff without proofing much... be warned!
// @description Allows to load and export charsheet data via buttons on brimstone.neocities.org
// ==/UserScript==

function importData(){
  let data = window.prompt("Give me exported data");
  try{
    json = JSON.parse(data)
    localStorage.setItem("brimstoneCharacterData", JSON.stringify(json));
    window.location.reload();
  } catch (er){alert("data not valid")}
}

function extractData(){

  let str = localStorage.getItem("brimstoneCharacterData")
  let json = JSON.parse(str);
  return JSON.stringify(json, null, 2);

}

function createButton(name , action) {
  var element = document.createElement("button");
  element.addEventListener("click", action);
  element.appendChild(document.createTextNode(name));
  document.body.appendChild(element);
}

function clipBoard(text){
  if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");  // Security exception may be thrown by some browsers.
      alert("DataLink Copied to Clipboard - Store it, share it, use it.");
    }
    catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      rprompt("Direct copy to clipboard failed. Copy to clipboard: Ctrl+C, Enter", text);
    }
    finally {
      document.body.removeChild(textarea);
    }
  }
}

function addButtons(){
  createButton("Store data to clipboard", () => clipBoard(extractData()));
  createButton("Import data", importData);
}

window.addEventListener(
  "load",
  () => {
    addButtons();
  },
  false
);

