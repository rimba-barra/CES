Ext.define('Hrd.template.ControllerForMasterDirect', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    requires: ['Hrd.library.box.tools.Tools','Hrd.library.box.tools.DefaultConfigfdv','Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector'],
    views: [],
    comboBoxIdEl: [],
    fillForm: null,
    formWidth: 500,
    refs: [],
    browseHandler: null,
    isMaximize:false,
    localStore: {
        selectedUnit: null
    },
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName:me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        
    },
    init: function() {
        var me = this;
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
     
        
    },
    mainDataSave: function() {
        var me = this;

        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store:me.getGrid().getStore(),
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
                
            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
            }
        };
        return x;
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();
        
        if(!g.getSelectedRecord()){
            motherFunc();
            return;
        }
        f.getForm().loadRecord(g.getSelectedRecord());
        f.down("button[action=save]").setDisabled(false);
        motherFunc();
        return false;
    },
    /*@return void */
    fdarInit:function(){
    }
});


