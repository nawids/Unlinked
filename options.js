function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    brand_page: document.querySelector("#brand_page").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#brand_page").value = result.brand_page || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("brand_page");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);