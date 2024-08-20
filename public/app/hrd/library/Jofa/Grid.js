Ext.define('Hrd.library.jofa.Grid', {
    cName:null,
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    getc: function() {
        return _Apps.getController(this.cName);
    },        
    load: function() {

    },
    selectRecord: function(index) {

    },
    fillForm: function() {

    },
    selectionChange: function(sys,rec) {

        
      
        if (rec) {
            sys.getc().getFormdata().loadRecord(rec);
        }
        
        /// if has detail
        if(sys.hasDetail){
            sys.getDetailGrid().getStore().loadData([], false);
            sys.tools.changeState(sys,'FIRST');
        }else{ /// form master module
            sys.tools.changeState(sys,'ONSELECT');
            
        }
        
        /// check if controller have funct to call
        if(typeof sys.getc().sysfunc==='function'){
            sys.getc().sysfunc().gridSelectionChange();
        }
    }



});


