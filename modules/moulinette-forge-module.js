/*************************
 * Moulinette Forge Module
 *************************/
export class MoulinetteForgeModule {
  
  /**
   * Overwrite this function to implement your asset packs/categories
   */
  async getPackList() {
    console.debug("Moulinette Forge Module | Default getPackList() returns empty list")
    return []
  }
  
  /**
   * Overwrite this function to implement your asset search (filter with searchTerms)
   */
  async getAssetList(searchTerms, pack) {
    console.debug("Moulinette Forge Module | Default getAssetList() returns empty list")
    return []
  }
  
  /**
   * Overwrite this function to add your listeners
   */
  activateListeners(html) {
    console.debug("Moulinette Forge Module | Default activeListeners() does nothing")
  }
  
  /**
   * Overwrite this function to implement forge actions
   */
  async onAction(classList) {
    console.debug("Moulinette Forge Module | Default onAction() does nothing")
  }
  
  /**
   * Overwrite this function to implement onDragStart action
   */
  onDragStart(event) {
    console.debug("Moulinette Forge Module | Default onDragStart() does nothing")
  }
  
  /**
   * Overwrite this function to additional HTML at the bottom of the list
   */
  async getFooter() {
    console.debug("Moulinette Forge Module | Default getFooter() returns nothing")
    return ""
  }
  
  /**
   * Overwrite this function to implement shortcut actions
   */
  async onShortcut(type) {
    console.debug("Moulinette Forge Module | Default onAction() does nothing")
  }

  /**
   * Overwrite this function to implement your module controls
   */
  getControls() {
    console.debug("Moulinette Forge Module | Default getControls() returns nothing")
    return ""
  }
  
  /**
   * Overwrite this function to implement your module controls
   */
  async activateControlsListeners(html) {
    console.debug("Moulinette Forge Module | Default activateControlsListeners() does nothing")
  }
  
}
