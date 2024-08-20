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
    isSaveProgressing:false,
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
        console.log(me.isSaveProgressing);
        if(me.isSaveProgressing===true){
            return;
        }
        me.isSaveProgressing = true;
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            store:me.getGrid().getStore(),
            finalData: function(data) {
               
                return data;
            },
            sync: true,
            successSaveFunc:function(){
                 me.isSaveProgressing = false;
            },
            failSaveFunc:function(){
                 me.isSaveProgressing = false;
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
    },
    
    afterCallNew:function(){
        var me = this;
        console.log(me);
        var f = me.getFormdata();
        var g = me.getGrid();
        if(g && f){
            g.getSelectionModel().deselectAll();
            var idProperty = g.getStore().getProxy().getReader().getIdProperty();
            var el = f.down("[name="+idProperty+"]");
            if(el){
                el.setValue(0);
            }
        }
            
        f.down("button[action=save]").setDisabled(false);
        // panggil fungsi ini setelah add new command dipanggil controller ini
    },
});


