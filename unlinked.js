function onError(error) {
  console.log(`Error: ${error}`);
}
let brandArray, allSpans;
let lastSize=0;
let contentRemovedCounter = 0;
let promotedRemovedCounter = 0;

function onGot(item) {
  let brand_page = '';
  if (item.brand_page) {
    brand_page = item.brand_page;
  }
  // clean spaces and make into array
  brandArray = brand_page.replace(', ',',').split(',');
  if (brandArray.length === 1)
  {
    brandArray.push("Test");
  }
  console.log(brandArray);
  allSpans = document.getElementsByTagName('span');
}

function loopItems(elements,pages) {
    console.time("time");
    Array.from(elements).forEach(function (element) {
        if(element.innerHTML.includes("Promoted")){
            let sib = element.previousElementSibling;
            let blok = sib.previousElementSibling;
            let card = blok.firstElementChild;
            let brand = card.firstElementChild;
            console.log("Promoted content being removed: "+ brand.innerHTML);
            parent = element.closest('[data-id]');
            parent.remove();
            promotedRemovedCounter++;
        }
        else if (pages.indexOf(element.innerHTML) !== -1){
            console.log("Brand being removed Inner: " + element.innerHTML);
            parent = element.closest('[data-id]');
            parent.remove();
            contentRemovedCounter++;
        }
    });
    console.timeEnd("time");
}

setInterval(function() {
  let getting = browser.storage.sync.get("brand_page");
  getting.then(onGot, onError); 
},5000);

setInterval(function() {
    if(lastSize < allSpans.length)
    {
        //console.log("SpanList Changed "+lastSize+" -> "+allSpans.length);
        console.log(`Configured brandArray: ${brandArray}`);
        lastSize = allSpans.length;
        loopItems(allSpans,brandArray);
        console.log("Content removed= "+contentRemovedCounter+" Ads removed= "+promotedRemovedCounter);
    }
    //console.log("No Change in Span list size= "+lastSize);
},2000);