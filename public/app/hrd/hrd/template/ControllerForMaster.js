Ext.define('Hrd.template.ControllerForMaster', {
    extend: 'Hrd.library.box.controller.Controller',
    requires: ['Hrd.library.box.tools.DefaultConfig','Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector'],
    views: [],
    comboBoxIdEl: [],
    fillForm: null,
    formWidth: 500,
    refs: [],
    browseHandler: null,
    localStore: {
        selectedUnit: null
    },
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName:me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        
    },
    init: function() {
        var me = this;
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
     
        
    },
    mainDataSave: function() {
        var me = this;

        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            finalData: function(data) {
               
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    fdar: function() {

        

        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
               me.fdarInit();
            },
            create: function() {
               me.unMask(1);
            },
            update: function() {
                
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.getForm().loadRecord(rec);
                me.unMask(1);
                
            }
        };
        return x;
    },
    /*@return void */
    fdarInit:function(){
    }
});


