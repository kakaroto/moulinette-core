
import { Moulinette } from "./modules/moulinette.js"
import { MoulinetteFileUtil } from "./modules/moulinette-file-util.js"
import { MoulinetteClient } from "./modules/moulinette-client.js"
import { MoulinetteForgeModule } from "./modules/moulinette-forge-module.js"

/**
 * Init: define global game settings & helpers
 */
Hooks.once("init", async function () {
  console.log("Moulinette Core| Init")
  
  game.settings.register("moulinette", "userId", { scope: "world", config: false, type: String, default: randomID(26) });
  game.settings.register("moulinette", "currentTab", { scope: "world", config: false, type: String, default: "scenes" })
  
  game.settings.register("moulinette-core", "customPath", {
    name: game.i18n.localize("mtte.configCustomPath"), 
    hint: game.i18n.localize("mtte.configCustomPathHint"), 
    scope: "world",
    config: true,
    default: "",
    type: String
  });
  
  game.settings.register("moulinette-core", "debugScanAssets", {
    name: game.i18n.localize("mtte.configDebugScanAssets"), 
    hint: game.i18n.localize("mtte.configDebugScanAssetsHint"), 
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });
  
  game.settings.register("moulinette-core", "showCaseContent", {
    name: game.i18n.localize("mtte.configShowCase"), 
    hint: game.i18n.localize("mtte.configShowCaseHint"), 
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });
  
  game.settings.register("moulinette-core", "s3Bucket", {
    name: game.i18n.localize("mtte.configS3"), 
    hint: game.i18n.localize("mtte.configS3Hint"), 
    scope: "world",
    config: true,
    default: "",
    type: String
  });
  
  game.moulinette = {
    modules: [],
    applications: {
      Moulinette,
      MoulinetteClient,
      MoulinetteForgeModule,
      MoulinetteFileUtil
    },
    forge: [],
    macros: [],
    sources: [
      { type: "images", publisher: "Foundry VTT", pack: "Core Data Icons", source: "public", path: "icons" }
    ]
  }

  Handlebars.registerHelper('pretty', function(value) {
    return isNaN(value) ? Moulinette.prettyText(value) : Moulinette.prettyNumber(value)
  });
  
});


/**
 * Setup: defines add a default module (Forge)
 */
Hooks.once("ready", async function () {
  // load one default module (Forge)
  game.moulinette.modules.push({
    id: "forge",
    name: game.i18n.localize("mtte.moulinetteForge"),
    descr: game.i18n.localize("mtte.moulinetteForgeHelp"), 
    icon: "modules/moulinette-core/img/moulinette.png",
    class: (await import("./modules/moulinette-forge.js")).MoulinetteForge
  })
  // Add asset packs from the Forge's Bazaar if running on the Forge
  if (typeof ForgeVTT != "undefined" && ForgeVTT.usingTheForge) {
    const result = await FilePicker.browse("forge-bazaar", "assets");
    for (const dir of result.dirs) {
        game.moulinette.sources.push({type: "tiles", "publisher": "Bazaar", pack: dir.slice("assets/".length), source: "forge-bazaar", path: dir});
        game.moulinette.sources.push({type: "sounds", "publisher": "Bazaar", pack: dir.slice("assets/".length), source: "forge-bazaar", path: dir});
    }
  }
});

/**
 * Ready: defines a shortcut to open Moulinette Interface
 */
Hooks.once("ready", async function () {
  if (game.user.isGM) {
    await MoulinetteFileUtil.createFolderIfMissing(".", "moulinette");
    
    // open moulinette on CTRL+M
    document.addEventListener("keydown", evt => {
      if(evt.key == "m" && evt.ctrlKey && !evt.altKey && !evt.metaKey) {
        game.moulinette.applications.Moulinette.showMoulinette()
      }
    });
    
    // load macros
    if(game.moulinette.macros.length > 0) {
      game.moulinette.applications.Moulinette.loadModuleMacros();      
    }
  }
});

/**
 * Controls: adds a new Moulinette control
 */
Hooks.on('renderSceneControls', (controls, html) => { 
  if (game.user.isGM) { 
    Moulinette.addControls(controls, html) 
  } 
});
