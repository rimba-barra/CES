Ext.define('Hrd.controller.Transaksibeasiswa', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Transaksibeasiswa',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'transaksibeasiswa',
    formWidth: 600,
    refs: [
        {
            ref: 'gridemployee',
            selector: 'transaksibeasiswagridemployee'
        },
        {
            ref: 'gridchild',
            selector: 'transaksibeasiswachildgrid'
        },
        {
            ref: 'gridbeasiswa',
            selector: 'transaksibeasiswabeasiswagrid'

        },
        {
            ref: 'gridmasuksekolah',
            selector: 'transaksibeasiswamasuksekolahgrid'

        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Transaksibeasiswa',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'beasiswatran_id',
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


        /* me.registerMiniCtrlAlt('employeetransaksibeasiswa', new Hrd.minic.lookup.Employee({
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
            this.control(events.timeInput('transaksibeasiswaformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }


        //lookupemployee
        newEvs['transaksibeasiswaformdata button[action=lookupemployee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        newEvs['transaksibeasiswagridemployee button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };
        newEvs['transaksibeasiswaformdata button[action=lookupemployee]'] = {
            click: function() {
                me.showEmployeeWindow();
            }

        };
        newEvs['transaksibeasiswaformdata button[action=x_lookupemployee]'] = {
            click: function() {
                me.showEmployeeWindow();
            }

        };

        newEvs['transaksibeasiswagridemployee'] = {
            selectionchange: function() {
                me.gridEmOnSChange();
            }
        };

        newEvs['transaksibeasiswabeasiswagrid'] = {
            selectionchange: function() {
                me.gridModOnSChange(1);
            }
        };

        newEvs['transaksibeasiswamasuksekolahgrid'] = {
            selectionchange: function() {
                me.gridModOnSChange(2);
            }
        };
        newEvs['transaksibeasiswaformdata checkbox[name=is_freetext]'] = {
            change: me.isFreeTextOnChange
        };

        this.control(newEvs);

    },
    isFreeTextOnChange:function(){
        var me = this;
        var f= me.getFormdata();
        f.down("[name=employee_employee_id]").setValue("");
        f.down("[name=nama_orangtua]").setValue("");
        if (f.down("[name=is_freetext]").checked) {
            
            f.down("[name=nama_orangtua]").hide();
            f.down("[name=ktp_orangtua]").hide();
            f.down("#beasiswaOrangTuaContainerID").show();
            
        }else{
            f.down("[name=nama_orangtua]").show();
            f.down("[name=ktp_orangtua]").show(); 
            f.down("#beasiswaOrangTuaContainerID").hide();
        }
    },
    gridModOnSChange: function(mod) {
        var me = this;
        var f = me.getFormdata();
        var rec = null;
        var g = null;
        if (mod === 1) {
            g = me.getGridbeasiswa();
            // rec = me.getGridbeasiswa();

        } else {
            g = me.getGridmasuksekolah();
        }
        rec = g.getSelectedRecord();
        var module = me.getActiveModule();
        var pf = module === 1 ? "" : "x_";
        if (rec) {
            f.down("[name=beasiswatran_id]").setValue(rec.get("beasiswatran_id"));
            f.down("[name=child_relation_id]").setValue(rec.get("child_relation_id"));
            f.down("[name=" + pf + "nama_anak]").setValue(rec.get("nama_anak"));
            f.down("[name=" + pf + "jenjang]").setValue(rec.get("jenjang"));
            f.down("[name=" + pf + "kelas]").setValue(rec.get("kelas"));

            f.down("[name=" + pf + "nama_sekolah]").setValue(rec.get("nama_sekolah"));
            f.down("[name=" + pf + "date]").setValue(rec.get("date"));
            f.down("[name=" + pf + "syarat_surat_sekolah]").setValue(rec.get("syarat_surat_sekolah"));
            f.down("[name=" + pf + "syarat_fotocopy_raport]").setValue(rec.get("syarat_fotocopy_raport"));
            f.down("[name=" + pf + "syarat_kartu_keluarga]").setValue(rec.get("syarat_kartu_keluarga"));
            f.down("[name=" + pf + "nama_orangtua]").setValue(rec.get("nama_orangtua"));
            f.down("[name=" + pf + "ktp_orangtua]").setValue(rec.get("ktp_orangtua"));
            f.down("[name=" + pf + "nama_anak]").setValue(rec.get("nama_anak"));
            if (module === 1) {
                f.down("[name=" + pf + "semester]").setValue(rec.get("semester"));
                f.down("[name=" + pf + "rangking]").setValue(rec.get("rangking"));
            }
        }


    },
    gridEmOnSChange: function() {
        var me = this;
        var g = me.getGridemployee();
        var rec = g.getSelectedRecord();
        var gc = me.getGridchild();
        if (rec) {
            gc.setLoading("Please wait...");
            me.tools.ajax({
                params: {
                    employee_id: rec.get("employee_id")
                },
                success: function(data, model) {
                    me.tools.wesea({data: data, model: model}, gc).grid();
                    gc.setLoading(false);
                    if (gc.getStore().getCount() > 0) {
                        gc.getSelectionModel().select(0);
                    }
                }
            }).read('child');
        }


    },
    showEmployeeWindow: function() {
        var me = this;
        var window = me.instantWindow("FormLookup", 600, "Employe & Child List", "create", "employeewindow");
        var f = window.down("form");
        var g = window.down("transaksibeasiswagridemployee");
        g.getSelectionModel().setSelectionMode('SINGLE');
        me.getGridchild().getSelectionModel().setSelectionMode('SINGLE');
        var p = window.down("panel");
        var module = me.getActiveModule();
        f.down("[name=module]").setValue(module);
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
                if (g.getStore().getCount() > 0) {
                    g.getSelectionModel().select(0);
                }
            }
        }).read('employee');
    },
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();

        var g = me.getGridemployee();
        var fw = g.up("form");
        var module = me.tools.intval(fw.down("[name=module]").getValue());
        var pf = module === 1 ? "" : "x_";
        var rec = g.getSelectedRecord();
        var recChild = me.getGridchild().getSelectedRecord();
        if (!rec || !recChild) {
            me.tools.alert.warning("Orang tua atau anak tidak valid");
            return false;
        }

        me.getGridbeasiswa().getStore().loadData([], false);
        me.getGridmasuksekolah().getStore().loadData([], false);

        f.down("[name=" + pf + "employee_employee_nik]").setValue(rec.get("employee_nik"));
        f.down("[name=" + pf + "employee_employee_name]").setValue(rec.get("employee_name"));
        f.down("[name=" + pf + "nama_anak]").setValue(recChild.get("name"));
        f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
        f.down("[name=child_relation_id]").setValue(recChild.get("relation_id"));

        g.up("window").close();


    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });

        var g = window.down("grid");

        console.log(window.down("grid"));
        var p = window.down("panel");
        p.setLoading("Please wait...");
        g.doInit();
        g.doLoad({},function(){
            var spt = g.down("pagingtoolbar").getStore();
            spt.loadPage(1);
            p.setLoading(false);
        });
        




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
          //  el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

        var f = me.getFormdata();
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                    me.tools.wesea(data.jenjangpendidikan, f.down("[name=jenjang]")).comboBox();
                    me.tools.wesea(data.jenjangpendidikan, f.down("[name=x_jenjang]")).comboBox();
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
                f.getForm().reset();
                f.down("[name=employee_employee_id]").setValue(0);
                f.down("[name=date]").setValue(new Date());
                //  me.lookupEmployee();
                me.showEmployeeWindow();

            }
        }
        return x;
    },
    finalData: function(data) {
        var me = this;
        var f = me.getFormdata();
        var module = me.getActiveModule();
        data["module"] = module;
        var pf = module === 1 ? "" : "x_";


        data["jenjang"] = f.down("[name=" + pf + "jenjang]").getValue();
        data["kelas"] = f.down("[name=" + pf + "kelas]").getValue();

        data["nama_sekolah"] = f.down("[name=" + pf + "nama_sekolah]").getValue();
        data["date"] = f.down("[name=" + pf + "date]").getValue();
        data["syarat_surat_sekolah"] = f.down("[name=" + pf + "syarat_surat_sekolah]").getValue();
        data["syarat_fotocopy_raport"] = f.down("[name=" + pf + "syarat_fotocopy_raport]").getValue();
        data["syarat_kartu_keluarga"] = f.down("[name=" + pf + "syarat_kartu_keluarga]").getValue();

        if (module === 1) {
            data["semester"] = f.down("[name=" + pf + "semester]").getValue();
            data["rangking"] = f.down("[name=" + pf + "rangking]").getValue();
        }
        return data;
    },
    getActiveModule: function() {
        var me = this;
        var f = me.getFormdata();
        var tabPanel = f.down("#bmskIdTabpanel");
        var module = 0;
        if (tabPanel.getActiveTab().itemId === "bmskIdTabpanel1") {
            module = 1; // module beasiswa
        } else if (tabPanel.getActiveTab().itemId === "bmskIdTabpanel2") {
            module = 2; // module masuk sekolah
        }
        return module;
    },
    afterSC: function(rec) {
        var me = this;
        var p = me.getPanel();
        var gb = me.getGridbeasiswa();
        var gms = me.getGridmasuksekolah();
        //  p.setLoading("Please wait...");
        gb.doInit();
        gms.doInit();
        gb.getStore().getProxy().extraParams.employee_employee_id = rec.get("employee_employee_id");
        gms.getStore().getProxy().extraParams.employee_employee_id = rec.get("employee_employee_id");
        gb.getStore().load({
            callback: function(rec, op) {
                gb.attachModel(op);
            }
        });

        gms.getStore().load({
            callback: function(rec, op) {
                gms.attachModel(op);
            }
        });
    },
    confirmDeleteOnClick: function(store, rec, window) {
        var me = this;


        var rec = null;
        var module = me.getActiveModule();

        if (module === 1) { // beasiswa
            rec = me.getGridbeasiswa().getSelectedRecord();
        } else if (module === 2) {
            rec = me.getGridmasuksekolah().getSelectedRecord();
        }

        if (!rec) {
            me.tools.alert.warning("Tidak ada data untuk dihapus");
            return false;
        }

        window.setLoading("Deleting record...");
        me.tools.ajax({
            params: {
                id: rec.get("beasiswatran_id")
            },
            success: function(data, model) {

                var suc = data['others'][0][0]['SUCCESS'];
                if (suc) {
                    me.tools.alert.info('Data has been deleted');
                    store.loadPage(1);
                } else {
                    me.tools.alert.warning('Failed');
                }
                window.setLoading(false);
            }
        }).read('delete');





    }




});