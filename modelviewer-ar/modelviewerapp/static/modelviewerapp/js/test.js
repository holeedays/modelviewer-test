import { ModelViewerElement } from "./modelviewer.js";
class IndexPage {
    constructor() {
    }
    // essentially creates our model viewer instance and adds it to the main div container in our document
    init() {
        const mainContainer = document.querySelector("main");
        // since we need to include actual sources for the 3d model and environment image we need a 
        // reference to the path where they are, I added a div that holds the path of the root folder 
        // (e.g. the static directory) in a custom data attribute
        const staticPathContainer = document.querySelector("#static-path");
        if (mainContainer === null || staticPathContainer === null)
            return;
        // get the path from the attribute of our div (result in empty string if the attribute doesn't exist)
        const staticPath = staticPathContainer.dataset.path ?? "";
        // create our model viewer instance
        const modelViewerInstance = new ModelViewerElement({
            alt: "A statue created by Bryant Baker. Scan done by the Smithsonian.",
            src: `${staticPath}modelviewerapp/glb/Pioneer_Woman_Smithsonian.glb`,
            // there are some attributes that are considered booleans (which means they don't need any value)
            // an example is like <input readonly> which doesn't need a value set to be read as true
            // as such, this is why some of the values have an empty string as their value
            ar: "",
            // since we can't write dashes for attributes, encapsulate them single/double quotes
            // either way, each property will be converted into strings inside our ModelViewerElement class
            "environment-image": `${staticPath}modelviewerapp/hdr/Studio_Garden_PolyHaven.hdr`,
            "shadow-intensity": 1,
            "camera-controls": "",
            "touch-action": "pan-y",
            "ar-status": "not-presenting",
            "auto-rotate": "",
            style: "width: 100%; height: 100%"
        });
        // append it to our main div container
        mainContainer.appendChild(modelViewerInstance.self);
    }
}
// ignore this... was originally meant to chain a bunch of stylings for the style attribute
function combineStrings(sep, ...strs) {
    let finalStr = "";
    strs.forEach((str) => finalStr += (sep + str));
    return finalStr;
}
// create our page class
const indexPage = new IndexPage();
// and initialize it
indexPage.init();
//# sourceMappingURL=test.js.map