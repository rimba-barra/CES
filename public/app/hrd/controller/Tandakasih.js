Ext.define('Hrd.controller.Tandakasih', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Tandakasih',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'tandakasih',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Tandakasih',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'tandakasih_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    listAnggaran: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);


        /* me.registerMiniCtrlAlt('employeetandakasih', new Hrd.minic.lookup.Employee({
         controllerName: me.bindPrefixName,
         panelId: me.controllerName + 'employee' // make sure this value same as params that passed when calling instantwindow
         }));
         */


        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();
        var hourObjects = ['plan_before_start', 'plan_before_end', 'plan_after_start',
            'plan_after_end', 'exec_time_out_start', 'exec_time_out_end',
            'exec_time_in_start', 'exec_time_in_end'];
        for (var x in hourObjects) {
            this.control(events.timeInput('tandakasihformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }


        //lookupemployee
        newEvs['tandakasihformdata button[action=lookupemployee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        newEvs['#employeeTKasihwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };

        newEvs['tandakasihformdata [name=group_group_id]'] = {
            select: function() {
                me.groupOnSelect();
            }

        };

        newEvs['tandakasihformdata [name=jenis]'] = {
            select: function() {
                me.tipeTakaOnSelect();
            }

        };

        //

        this.control(newEvs);

    },
    resetValue:function(){
        var me = this;
        var f = me.getFormdata();
        f.down("[name=jumlah]").setValue("");
        f.down("[name=plus]").setValue("");
    },
    tipeTakaOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var tipeId = f.down("[name=jenis]").getValue();
        var la = me.listAnggaran;
        if (la) {
            for (var i in la) {
                if (la[i]["anggarantandakasih"]["tipetandakasih_tipetandakasih_id"] === tipeId) {
                    f.down("[name=jumlah]").setValuem(la[i]["anggarantandakasih"]["value"]);
                    f.down("[name=plus]").setValue(la[i]["anggarantandakasih"]["plus"]);
                }
            }
        }
    },
    groupOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        me.listAnggaran = null;
        me.resetValue();
        f.setLoading("Please wait...");

        me.tools.ajax({
            params: {
                group_id: f.down("[name=group_group_id]").getValue()
            },
            success: function(data, model) {
                if (data.length > 0) {
                    me.listAnggaran = data;
                    me.tipeTakaOnSelect();
                } else {
                    me.tools.alert.warning("Tidak ada anggaran untuk golongan ini");
                }

                f.setLoading(false);
            }
        }).read('listanggaran');

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
            f.down("[name=employee_hire_date]").setValue(rec.get("hire_date"));
            f.down("[name=employeestatus_employeestatus]").setValue(rec.get("employeestatus_employeestatus"));
            //f.down("[name=group_code]").setValue(rec.get("group_code"));
            f.down("[name=group_group_id]").setValue(rec.get("group_group_id"));
            g.up("window").close();
            
            
            var dt_ag = Array();
            dt_ag['fcombo_group_id'] = 'group_group_id';
            dt_ag['fcombo_group_id_display'] = 'group_group_id_display';
            dt_ag['fgroup_name'] = 'group_code';
            dt_ag['sf_group_id'] = 'group_id';
            dt_ag['vgroup_id'] = rec.get("group_group_id");
            me.limitedAccessGroup(f, dt_ag);
            
            me.groupOnSelect();
        }

    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTKasihwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });

        var g = window.down("grid");


        var p = window.down("panel");
        //p.setLoading("Please wait...");
        g.bindPrefixName = me.controllerName;
        g.doInit();
        g.doLoad(null, function() {
            
        });
        //g.getStore().loadPage(1);
        /*
         me.tools.ajax({
         params: {},
         success: function(data, model) {
         me.tools.wesea({data: data, model: model}, g).grid();
         p.setLoading(false);
         var pt = me.getGrid().down("pagingtoolbar");
         if (pt) {
         pt.getStore().reload();
         }
         }
         }).read('employee');
         */




    },
    minicProc: function() {
        var me = this;
        var x = {
            lookupEmployee: {
                selectOnClick: function(rec) {
                    var f = me.getFormdata();
                    console.log(rec);

                    f.loadRecord(rec);
                    f.down("[name=employee_employee_nik]").setValue(rec.get("employee_nik"));
                    f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
                    f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));


                }
            }
        };
        return x;

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

                me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
                me.tools.wesea(data.group, f.down("[name=group_group_id_display]")).comboBox();
                me.tools.wesea(data.tipetandakasih, f.down("[name=jenis]")).comboBox();


            }
        }).read('parameter');

        me.getPanel().setLoading(false);

        // maximize panel window

    },
    validateData: function() {
        var me = this;
        var data = {"status": false, "msg": "Sedang diproses..."};
        data.status = true;
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                //  me.mainGridCheckRecord();
                var rec = me.getGrid().getSelectedRecord();
                f.getForm().reset();
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
                me.listAnggaran = null;
                f.getForm().reset();
                f.down("[name=employee_employee_id]").setValue(0);
                f.down("[name=date]").setValue(new Date());
                me.lookupEmployee();
                f.down("[action=lookupemployee]").setDisabled(false);
            }
        }
        return x;
    },
    finalData: function(data) {
        data["jumlah"] = accounting.unformat(data["jumlah"]);

        return data;
    },
    afterSC: function(rec) {
        var me = this;
        var f = me.getFormdata();
        me.tools.formHelper(f).fixMoneyFormat(rec);
    }



});