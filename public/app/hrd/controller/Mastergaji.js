Ext.define('Hrd.controller.Mastergaji', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Mastergaji',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'mastergaji',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Mastergaji',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'overtime_id',
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

        me.registerMiniCtrlAlt('employeeovertimetran', new Hrd.minic.lookup.Employee({
            controllerName: me.bindPrefixName,
            panelId: me.controllerName + 'employee' // make sure this value same as params that passed when calling instantwindow
        }));

        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();


        //lookup_employee
        newEvs['mastergajiformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };




        newEvs['#employeeMGajiwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };

        newEvs['mastergajiformdata [name=cca_costcontrol_id]'] = {
            select: function() {
                me.filterCostControl("cca_costcontrol_id","ccb_costcontrol_id");
            }

        };
        newEvs['mastergajiformdata [name=ccb_costcontrol_id]'] = {
            select: function() {
                me.filterCostControl("ccb_costcontrol_id","ccc_costcontrol_id");
            }

        };
        newEvs['mastergajiformdata [name=astek_gaji_percent]'] = {
            blur: function() {
                me.changeOtherFieldValue("astek_gaji_percent","astek_gaji_value");
            }

        };
        newEvs['mastergajiformdata [name=astek_gaji_value]'] = {
            blur: function() {
                me.changeOtherFieldValue("astek_gaji_value","astek_gaji_percent");
            }

        };
        newEvs['mastergajiformdata [name=danapensiun_gaji_percent]'] = {
            blur: function() {
                me.changeOtherFieldValue("danapensiun_gaji_percent","danapensiun_gaji_value");
            }

        };
        newEvs['mastergajiformdata [name=danapensiun_gaji_value]'] = {
            blur: function() {
                me.changeOtherFieldValue("danapensiun_gaji_value","danapensiun_gaji_percent");
            }

        };




        this.control(newEvs);

    },
    changeOtherFieldValue:function(src,dest){
        var me = this;
        var f = me.getFormdata();
        var v = me.tools.floatval(f.down("[name="+src+"]").getValue());
        f.down("[name="+dest+"]").setValue(0);
        
    },
    filterCostControl: function(parent,child) {
        var me = this;
        var f = me.getFormdata();
        //var el = f.down("[name=cca_costcontrol_id]");
        var el = f.down("[name="+child+"]");
        var s = el.getStore();
        var v = me.tools.intval(f.down("[name="+parent+"]").getValue());
        el.setValue("");
        if(parent==="cca_costcontrol_id"){
            f.down("[name=ccc_costcontrol_id]").setValue();
        }
        if (v > 0) {
            s.clearFilter(true);
            s.filterBy(function(rec, id) {
            
                if (rec.raw.parent_id === v) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }

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

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeMGajiwindow", "lookup.employee", {
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
    afterSC: function(rec) {
        var me = this;
        me.tools.formHelper(me.getFormdata()).fixMoneyFormat(rec);
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
                console.log(data);

                me.tools.wesea(data.cca, f.down("[name=cca_costcontrol_id]")).comboBox();
                me.tools.wesea(data.ccb, f.down("[name=ccb_costcontrol_id]")).comboBox();
                me.tools.wesea(data.ccc, f.down("[name=ccc_costcontrol_id]")).comboBox();

                me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();


            }
        }).read('parameter');

        me.getPanel().setLoading(false);
        me.getPanel().down("[action=create]").hide();

        // maximize panel window

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
                f.down("[action=lookup_employee]").setDisabled(true);
            },
            delete: function() {

            },
            new : function() {
                me.validShift = false;
                f.getForm().reset();
                //   f.down("[name=date]").setValue(new Date());
                f.down("[action=lookup_employee]").setDisabled(false);
            }
        }
        return x;
    },
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "..."};

        return data;
    },
    finalData: function(data) {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        console.log(vs);
        data = me.tools.formHelper(me.getFormdata()).fixMoneyUnformat();
        // data["is_wna"] = vs["is_wna"]==="on"?1:0;
        // data["is_addincome"] = vs["is_addincome"]==="on"?1:0;
        // data["is_addastek"] = vs["is_addastek"]==="on"?1:0;

        return data;
    }


});