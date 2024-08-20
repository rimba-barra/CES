Ext.define('Cashier.controller.Accountreceivable', {
   extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Accountreceivable',
    requires: [
        'Cashier.library.ModuleTools',
        'Cashier.library.Browse',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.Tools',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.XyReport'
     ],
     refs: [
        {
            ref: 'panel',
            selector: 'accountreceivablepanel'
        },
        {
            ref: 'grid',
            selector: 'accountreceivablegrid'
        },
        {
            ref: 'formdata',
            selector: 'accountreceivableformdata'
        },
        {
            ref: 'formsearch',
            selector: 'accountreceivableformsearch'
        },

    ],
    controllerName: 'accountreceivable',
    fieldName: 'coa',
    bindPrefixName: 'Accountreceivable',
    formxWinId: 'win-accountreceivablewinId',
    init: function() {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        
      
        
        this.control({
           
           
             
        });   
    },

  

    
    


});
