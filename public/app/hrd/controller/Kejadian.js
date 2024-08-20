Ext.define('Hrd.controller.Kejadian', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Kejadian',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'kejadian',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        },
        {
            ref: 'gridangsuran',
            selector: 'kejadianangsurangrid'
                    //
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Kejadian',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'pinjaman_id',
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

        newEvs['kejadianformdata [name=tipepinjaman_tipepinjaman_id]'] = {
            select: function() {
                //  me.tipeOnSelect();
            }

        };

        newEvs['kejadianformdata button[action=proses]'] = {
            click: function() {
                me.generateAngsuran();
            }

        };

        //lookup_employee
        newEvs['kejadianformdata button[action=lookup]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        newEvs['kejadianformdata [name=nilai]'] = {
            blur: function() {
                me.proses();
            }

        };
        newEvs['kejadianformdata [name=bunga]'] = {
            blur: function() {
                me.proses();
            }

        };
        newEvs['kejadianformdata [name=lama_angsuran]'] = {
            blur: function() {
                me.proses();
            }

        };



        newEvs['#employeeTPinjamwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };



        this.control(newEvs);

    },
    /* copy dari Erems.library.Purchaseletter*/
    generateDueDate: function(count, startDate) {
        var date = startDate;

        var d = new Date(date);
        var m = d.getMonth();
        var y = d.getFullYear();
        var tempM = 0;
        tempM = m + count;


        m = (tempM % 12) === 0 ? 12 : (tempM % 12);
        y = y + Math.floor(tempM / 12);

        d.setMonth(m);
        d.setFullYear(y);
        return d;
    },
    generateAngsuran: function() {
        var me = this;
        me.proses();
        var ga = me.getGridangsuran();
        var sa = ga.getStore();
        var f = me.getFormdata();
        var nilai = f.down("[name=nilai_angsuran]").getValuem();
        var durasi = me.tools.intval(f.down("[name=lama_angsuran]").getValue());

        if (nilai <= 1000) {
            me.tools.alert.warning("Nilai angsuran harus lebih atau sama dengan 1000");
            return false;
        }
        if (durasi <= 0) {
            me.tools.alert.warning("Durasi angsuran tidak valid");
            return false;
        }
        var startDate = new Date(f.down("[name=start_date]").getValue());
        sa.loadData([], false);
        var interval = me.tools.intval(f.down("[name=interval]").getValue());
        for (var i = 1; i <= durasi; i++) {

            sa.add({
                'date': me.generateDueDate(interval * (i - 1), startDate),
                //'date': me.generateDueDate(i, startDate),
                'nilai': nilai,
                'ke': i
            });
        }
        var tabPanel = f.down("tabpanel").setActiveTab(1);

    },
    proses: function() {
        var me = this;
        var f = me.getFormdata();
        var hasil = me.hitung();
        f.down("[name=nilai_angsuran]").setValuem(hasil["angsuran"]);

    },
    hitung: function() {
        var me = this;
        var f = me.getFormdata();
        var nilai = f.down("[name=nilai]").getValuem();
        var bunga = me.tools.floatval(f.down("[name=bunga]").getValue());
        var interval = me.tools.intval(f.down("[name=interval]").getValue());
        var durasi = me.tools.intval(f.down("[name=lama_angsuran]").getValue());
        //  var nilaiBunga = (nilai/durasi) * (bunga == 0 ? 0 : bunga / 100);
        var nilaiBunga = (nilai / durasi) * (bunga == 0 ? 0 : ((bunga / 100) * interval));
        var angsuran = me.tools.floatval(nilai / durasi) + nilaiBunga;

        var hasil = {'angsuran': angsuran};
        return hasil;

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

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTPinjamwindow", "lookup.employee", {
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
    validateData: function() {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};

        return data;
    },
    finalData: function(data) {
        var me = this;

        data["detail"] = me.getGridangsuran().getJson();
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
                me.tools.wesea(data.tipepinjaman, f.down("[name=tipepinjaman_tipepinjaman_id]")).comboBox();

                // load grid angsuran
                var p = me.getPanel();
                p.setLoading("Please wait...");
                var ga = me.getGridangsuran();
                ga.doInit();
                ga.getStore().load({
                    params: {pinjaman_pinjaman_id: 0},
                    callback: function(rec, op) {
                        ga.attachModel(op);
                        p.setLoading(false);
                    }
                });

            }
        }).read('parameter');






        me.getPanel().setLoading(false);

        // maximize panel window

    },
    afterSC: function(rec) {
        var me = this;
        if (rec) {
            var ga = me.getGridangsuran();
            ga.doInit();
            ga.getStore().load({
                params: {pinjaman_pinjaman_id: rec.get("pinjaman_id")},
                callback: function(rec, op) {
                    ga.attachModel(op);
                }
            });
        }
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
                f.down("[name=interval]").setValue(1);
                f.down("[name=lama_angsuran]").setValue(12);
                f.down("[name=date]").setValue(new Date());
                f.down("[name=start_date]").setValue(new Date());
                me.getGridangsuran().getStore().loadData([], false);
            }
        }
        return x;
    }


});