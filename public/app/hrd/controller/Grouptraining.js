Ext.define('Hrd.controller.Grouptraining', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Grouptraining',
    controllerName: 'grouptraining',
    fieldName: 'grouptraining_id',
    bindPrefixName: 'Grouptraining',
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