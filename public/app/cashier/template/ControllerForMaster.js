Ext.define('Cashier.template.ControllerForMaster', {
    extend: 'Cashier.library.template.controller.Controller2',
    requires: ['Cashier.library.Browse', 'Cashier.library.box.Config','Cashier.library.box.tools.DefaultConfig','Cashier.library.box.tools.StoreProcessor', 'Cashier.library.box.tools.EventSelector','Cashier.library.box.tools.Tools'],
    views: [],
    comboBoxIdEl: [],
    fillForm: null,
    formWidth: 500,
    refs: [],
    browseHandler: null,
    loadProgressCount:0,
    localStore: {
        selectedUnit: null
    },
    constructor: function(configs) {
       /* var me = this;
        var config = new Cashier.library.box.tools.DefaultConfig({
            moduleName:me.controllerName
        });
        config.run(this);
        this.callParent(arguments);*/
        var me = this;
        var config = new Cashier.library.box.tools.DefaultConfig({
            moduleName:me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Cashier.template.ComboBoxFields();
        
    },
    init: function() {
        var me = this;
        
        var events = new Cashier.library.box.tools.EventSelector();
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control(events.getEvents(me, me.controllerName));
        
     
        
    },
//    gridSelectionChange: function () {
//        var me = this;
//        var grid = me.getGrid(),
//        row = grid.getSelectionModel().getSelection();
//        grid.down('#btnDelete').setDisabled(row.length < 1);
//       // grid.down('#btnEdit').setDisabled(row.length);
//        if(row.length===1) {
//            grid.down('#btnEdit').setDisabled(false); 
//        }
//        else {
//            grid.down('#btnEdit').setDisabled(true); 
//        }
//    },
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
                me.fdarUpdate(rec);
                me.unMask(1);
                
                
            }
        };
        return x;
    },
    fdarUpdate:function(rec){

    },
    /*@return void */
    fdarInit:function(){
    },
    
    /*@params int progress*/
    unMask: function(progress) {
        var me = this;
        me.loadProgressCount = me.loadProgressCount - progress;
        if (me.loadProgressCount <= 0) {
            me.getFormdata().up('window').getEl().unmask();
        }

    },
        formatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue, paramform;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.formatMoney(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
    },
});


