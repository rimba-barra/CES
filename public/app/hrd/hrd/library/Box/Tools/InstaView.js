Ext.define('Hrd.library.box.tools.InstaView', {
    panels:[],
    lookupName:'',
    callerId:'',
    panelIds:{},
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    create: function() {
        var me = this;
        var id = '';
        for(var x in me.panels){
            id = me.callerId+''+me.lookupName+''+me.panels[x];
           Ext.define('Hrd.view.instaview.'+me.callerId+'.'+me.lookupName+'.'+me.panels[x], {
            extend: 'Hrd.view.lookup.'+me.lookupName+'.'+me.panels[x],
            itemId:id
           }); 
           me.panelsIds[me.panels[x]] = id;
        }
        
        
        
    }
});


