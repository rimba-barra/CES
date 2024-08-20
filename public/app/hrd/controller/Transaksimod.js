Ext.define('Hrd.controller.Transaksimod', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Transaksimod',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour','Hrd.view.transaksimod.GridKaryawanMod'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'transaksimod',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'transaksimodkaryawangrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Transaksimod',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'mod_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
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
        newEvs['transaksimodformdata button[action=lookup]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

       


        newEvs['#employeeTModwindow transaksimodkaryawangrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };



        this.control(newEvs);

    },
    
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=employee_employee_nik]").setValue(rec.get("employee_employee_nik"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_employee_name"));
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_employee_id"));
            f.down("[name=karyawanmod_karyawanmod_id]").setValue(rec.get("karyawanmod_id"));
            g.up("window").close();
        }

    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTModwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");

        var ng = new Hrd.view.transaksimod.GridKaryawanMod({
            height: 200
        });
        var p = window.down("panel");
        p.remove(g);
        p.add(ng);
   
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, ng).grid();
                p.setLoading(false);
            }
        }).read('karyawanmod');



    },
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};
       
        return data;
    },
    finalData:function(data){
        var me = this;
       
      //  data["detail"] = me.getGridangsuran().getJson();
        return data;
    },

    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

        var f = me.getFormdata();
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                //me.tools.wesea(data.tipepinjaman, f.down("[name=tipepinjaman_tipepinjaman_id]")).comboBox();
            }
        }).read('parameter');




        me.getPanel().setLoading(false);

        // maximize panel window

    },
    afterSC: function(rec) {
        var me = this;
      
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
            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
                me.validShift = false;
                f.getForm().reset();
               
                f.down("[name=date]").setValue(new Date());
                f.down("[name=start_date]").setValue(new Date());
            }
        }
        return x;
    }


});