class PdbPrints extends HTMLElement {

  static get observedAttributes() {
    return ['entry-id', 'orientation', 'color', 'size', 'hideLogo'];
  }

  constructor() {
    super();
  }

  validateParams() {
    if(typeof this.entryId == 'undefined' || this.entryId == null) return false;
    return true
  }

  invokePlugin() {
    
    let paramValidatity = this.validateParams();
    if(!paramValidatity) return

    let options = {
      entryId: this.entryId
    };
    if(typeof this.orientation != 'undefined' && this.orientation !== null) options['orientation'] = this.orientation;
    if(typeof this.color != 'undefined' && this.color !== null) options['color'] = this.color;
    if(typeof this.size != 'undefined' && this.size !== null) options['size'] = this.size;
    if(typeof this.hideLogo != 'undefined' && this.hideLogo !== null) options['hideLogo'] = this.hideLogo.split(',');

    // create an instance of the plugin
    if(typeof this.pluginInstance == 'undefined') this.pluginInstance = new PdbPrintsPlugin();    
    this.pluginInstance.render(this, options);
  }

  attributeChangedCallback() {
    this.entryId = this.getAttribute("entry-id");
    this.orientation = this.getAttribute("orientation");
    this.color = this.getAttribute("color");
    this.size = this.getAttribute("size");
    this.hideLogo = this.getAttribute("hideLogo");
    this.invokePlugin();
  }

}

export default PdbPrints;

customElements.define('pdb-prints', PdbPrints);