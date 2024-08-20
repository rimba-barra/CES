Ext.define('Hrd.controller.Bobotnilai', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Bobotnilai',
    controllerName: 'bobotnilai',
    fieldName: 'bobotnilai_id',
    bindPrefixName: 'Bobotnilai',
    formWidth: 500,
    
    localStore: {
        newdetail: null
    },
    init: function(config) {
       this.callParent(arguments);


    },
    addNewRecord:function(){
        return true;
    }
    
    

});