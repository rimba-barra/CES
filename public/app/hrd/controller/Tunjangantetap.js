Ext.define('Hrd.controller.Tunjangantetap', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Tunjangantetap',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'tunjangantetap',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Tunjangantetap',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'tunjangantetap_id',
    loadParameter: false,
    loadedParamater: null,
    runFuncBeforeLoadGridData: true, // set true  yg diload sebelum data grid keload
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);


        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();


        //lookup_employee
        newEvs['tunjangantetapformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        
        newEvs['tunjangantetapformsearch [name=komponengaji_komponengaji_id]'] = {
            select: function() {
                me.refreshGrid();
            }

        };

        //
        newEvs['#employeeTTetapwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };



        this.control(newEvs);

    },
    refreshGrid:function(){
        var me = this;
        var s = me.getGrid().getStore();
        s.getProxy().extraParams.komponengaji_komponengaji_id = me.getFormsearch().down("[name=komponengaji_komponengaji_id]").getValue();
        s.loadPage(1);
    },
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=employee_employee_nik]").setValue(rec.get("employee_nik"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            g.up("window").close();
        }

    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTTetapwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");


        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employee');



    },
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

        var f = me.getFormdata();
        if (!me.loadParameter) {
            me.tools.ajax({
                params: {},
                success: function(data, model) {
                    console.log(data);


                    me.tools.wesea(data.komponengaji, f.down("[name=komponengaji_komponengaji_id]")).comboBox();
                    me.loadParameter =  true;
                    me.loadedParameter = data;

                }
            }).read('parameter');
        } else {
            me.tools.wesea(me.loadedParameter.komponengaji, f.down("[name=komponengaji_komponengaji_id]")).comboBox();
        }


        me.getPanel().setLoading(false);

        // maximize panel window

    },
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "..."};

        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                //  me.mainGridCheckRecord();
                   var rec = me.getGrid().getSelectedRecord();
                 if (rec) {
                 f.loadRecord(rec);
                 }
                
                 
                f.down("[action=lookup_employee]").setDisabled(true);
            },
            save: function() {

            },
            edit: function() {
               f.down("[action=lookup_employee]").setDisabled(false);
            },
            delete: function() {

            },
            new : function() {
                   f.getForm().reset();
                   f.down("[action=lookup_employee]").setDisabled(false);
                /*  me.validShift = false;
              
                 f.down("[name=date]").setValue(new Date());
                 
                 */
            }
        }
        return x;
    },
    runFuncBLGD: function(store, func) {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait...");
        var f = me.getFormdata();
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var combo = me.getFormsearch().down("[name=komponengaji_komponengaji_id]");
               me.tools.wesea(data.komponengaji, combo).comboBox();
                p.setLoading(false);
                me.tools.comboHelper(combo).setDefaultValue();
             
                store.getProxy().extraParams.komponengaji_komponengaji_id = combo.getValue();
                func(store);
                
                me.loadParameter = true;
                me.loadedParamater = data;
            }
        }).read('parameter');
    }


});