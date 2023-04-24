// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info, tab) {
  switch(info.menuItemId){
    case "radio":
      console.log(
        "radio item " +
          info.menuItemId +
          " was clicked (previous checked state was " +
          info.wasChecked +
          ")"
      );
      break;
    case "checkbox":
      console.log(JSON.stringify(info));
      console.log(
        "checkbox item " +
         info.menuItemId +
         " was clicked, state is now: " +
         info.checked +
         "(previous state was " +
         info.wasChecked +
         ")"
                );
      break;
    default:
      console.log("item " + info.menuItemId + " was clicked");
      console.log("info: " + JSON.stringify(info));
      console.log("tab: " + JSON.stringify(tab));
  }
}
chrome.runtime.onStartup.addListener(function(){

// Create one test item for each context type.
var contexts = [
  "page",
  "selection",
  "link",
  "editable",
  "image",
  "video",
  "audio",
];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({
    title: title,
    contexts: [context],
    id: context,
  });
  console.log("'" + context + "' item:" + id);
}

// Create a parent item and two children.
var parent = chrome.contextMenus.create({
  title: "Test parent item",
  id: "parent",
});
var child1 = chrome.contextMenus.create({
  title: "Child 1",
  parentId: parent,
  id: "child1",
});
var child2 = chrome.contextMenus.create({
  title: "Child 2",
  parentId: parent,
  id: "child2",
});
console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);


// Create a radio item.
var radio1 = chrome.contextMenus.create({
  title: "radio",
  type: "radio",
  id: title,
});

console.log("radio:" + radio1);

// Create a checkbox item.
var checkbox1 = chrome.contextMenus.create({
  title: "checkbox",
  type: "checkbox",
  id: "checkbox",
});

console.log("checkbox1:" + checkbox1);

// Intentionally create an invalid item, to show off error checking in the
// create callback.
console.log(
  "About to try creating an invalid item - an error about " +
    "item 999 should show up"
);
chrome.contextMenus.create(
  { title: "Oops", parentId: 999, id: "errorItem" },
  function () {
    if (chrome.extension.lastError) {
      console.log("Got expected error: " + chrome.extension.lastError.message);
    }
  }
);
  
});
