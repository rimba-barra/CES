Ext.define('Hrd.controller.Transaksidinas', {
    extend: 'Hrd.library.box.controller.ControllerByEmployee2',
    alias: 'controller.Transaksidinas',
    requires: [],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'transaksidinas',
    fieldName: 'dinas_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridleave',
            selector: 'transaksidinasleavegrid'
        },
        {
            ref: 'griddate',
            selector: 'transaksidinasdategrid'
        },
        {
            ref: 'gridproject',
            selector: 'lookupprojectgrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Transaksidinas',
    browseHandler: null,
    comboLoader: null,
    globalParams: null,
    nomorSurat: null,
    localStore: {
        selectedUnit: null
    },
    tempSelectedEmployee: 0,
    textCombos: [],
    tools: null,
    expireDuration: 0,
    newNomorSurat: null,
    moneyFieldList: ["total_uang_saku", "total_uang_makan", "total_uang"],
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        me.registerMiniCtrlAlt('employee', new Hrd.minic.lookup.Employee({
            controllerName: 'Transaksidinas'
        }));
        /*  me.registerMiniCtrlAlt('generateyearly', new Hrd.minic.transaksidinas.GenerateYearly({
         controllerName: 'Transaksidinas'
         }));
         */
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        newEvs['transaksidinasleavegrid'] = {
            selectionchange: me.mainGridSelectionChange
        };
        newEvs['transaksidinasformdata [name=berangkat]'] = {
            select: function() {
                //  me.generateBiaya();
            }
        };
        newEvs['transaksidinasformdata [name=kembali]'] = {
            select: function() {
                // me.generateBiaya();
            }
        };
        newEvs['transaksidinasdategrid'] = {
            //  afterrender: me.gridAfterRender,
            // itemdblclick: me.newActionColumnClick,
            //  itemcontextmenu: me.gridItemContextMenu,
            selectionchange: me.gridDateSelectionChange

        };

        newEvs['transaksidinasformdata button[action=updatedate]'] = {
            click: function() {
                me.updateDetailGrid();
            }
        };

        newEvs['transaksidinasformdata button[action=deletedate]'] = {
            click: function() {
                me.deleteDetailGrid();
            }
        };


        //
        newEvs['transaksidinasformdata button[action=generate]'] = {
            click: function() {
                me.generateBiaya();
            }

        };

        //lookup_project
        newEvs['transaksidinasformdata button[action=lookup_project]'] = {
            click: function() {
                me.lookupProject();
            }

        };

        newEvs['#projectTDinaswindow lookupprojectgrid button[action=select]'] = {
            click: function() {
                me.selectProject();
            }

        };
        newEvs['transaksidinasformdata [name=dinasdetail_uang_makan_potong]'] = {
            blur: function() {
                me.potonganOnBlur();
            }
        };

        newEvs['transaksidinasformdata [name=date]'] = {
            blur: function() {
                me.dateOnBlur();
            }
        };

        newEvs['transaksidinasformdata [name=date]'] = {
            blur: function() {
                me.dateOnBlur();
            }
        };

        newEvs['transaksidinasformdata [name=is_daftarproyek]'] = {
            change: function() {
                me.isDaftarProyekOnChange();
            }
        };


        //

        //
        this.control(newEvs);

    },
    isDaftarProyekOnChange: function() {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getValues();
        console.log(vs["is_daftarproyek"]);
        var isDaftarProyek = me.tools.intval(vs["is_daftarproyek"]);
        f.down("[name=tujuan_proyek_lain]").setReadOnly(true);
        f.down("[action=lookup_project]").setDisabled(true);

        if (isDaftarProyek) {
            f.down("[action=lookup_project]").setDisabled(false);
            f.down("[name=tujuan_proyek_lain]").setValue("");

        } else {
            f.down("[name=tujuan_proyek_lain]").setReadOnly(false);

            f.down("[name=project_code]").setValue("");
            f.down("[name=project_name]").setValue("");
            f.down("[name=tujuan_proyek]").setValue("");
        }
    },
    dateOnBlur: function() {
        var me = this;
        var vs = me.getFormdata().getForm().getValues();
        me.getFormdata().down("[name=nomor_surat]").setValue("");
        me.tools.ajax({
            params: {
                date: vs["date"]
                        //employee_name: me.getForm().down("[name=employee_name]").getValue()
            },
            success: function(data, model) {
                console.log(data);
                data = data['others'][0][0];
                var isSukses = data['HASIL'];
                if (isSukses === false) {
                    me.tools.alert.warning(data['MSG']);
                } else {

                    me.nomorSurat = data['DATA'];



                    // me.generateNomorSurat();
                    me.getFormdata().down("[name=nomor_surat]").setValue(me.getNomorSurat());
                }
                // var nomor = data['others'][0][0]['DATA'];
            }
        }).read('nomorsurat');
    },
    deleteDetailGrid: function() {
        var me = this;
        var f = me.getFormdata();
        var gd = me.getGriddate();
        var g = me.getMainGrid();
        var rec = gd.getSelectedRecord();
        var mainRec = g.getSelectedRecord();
        var deletedRows = "";
        if (!rec) {
            me.tools.alert.warning("Invalid record");
            return;
        }
        if (mainRec) { // jika ada data header, maka update deletedRows
            deletedRows = mainRec.get("deletedRows");
            mainRec.beginEdit();
            mainRec.set({
                "deletedRows": deletedRows + "~" + rec.get("dinasdetail_id")
            });
            mainRec.endEdit();
        }

        gd.getStore().remove(rec);
        me.hitungTotal();
    },
    potonganOnBlur: function() {
        var me = this;
        var f = me.getFormdata();
        var rec = me.getGriddate().getSelectedRecord();
        if (rec) {
            var potongan = me.tools.floatval(f.down("[name=dinasdetail_uang_makan_potong]").getValue());
            //var uangMakan = f.down("[name=dinasdetail_uang_makan]").getValuem();
            var uangMakan = rec.get("uang_makan");
            var hasil = uangMakan - ((potongan / 100) * uangMakan);
            f.down("[name=dinasdetail_uang_makan]").setValuem(hasil);
            me.hitungTotal();
        }


    },
    selectProject: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridproject();
        var rec = g.getSelectedRecord();

        if (rec) {
            f.down("[name=tujuan_proyek]").setValue(rec.get("project_id"));
            f.down("[name=project_code]").setValue(rec.get("code"));
            f.down("[name=project_name]").setValue(rec.get("name"));
            g.up("window").close();
        }

    },
    lookupProject: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "List Proyek", "create", "projectTDinaswindow", "lookup.project", {
            itemId: me.controllerName + 'project'
        });


        var g = window.down("grid");

        var p = window.down("panel");



        g.bindPrefixName = me.controllerName;
        g.doInit();
        g.doLoad({}, function() {


            var pt = g.down("pagingtoolbar");
            if (pt) {
                pt.getStore().loadPage(1);
            } else {
                console.log(pt);
            }
        });

    },
    updateDetailGrid: function() {
        var me = this;
        var f = me.getFormdata();
        var gd = me.getGriddate();
        var rec = gd.getSelectedRecord();
        var pf = "dinasdetail_";
        var fields = null;
        var newData = null;
        if (!rec) {
            me.tools.alert.warning("Invalid record");
            return;
        }
        fields = rec.data;
        newData = rec.data;
        for (var i in fields) {
            var el = f.down("[name=" + pf + "" + i + "]");
            if (el) {
                if (el.getXType() === 'xmoneyfield') {

                    newData[i] = el.getValuem();
                } else {
                    newData[i] = el.getValue();
                }

            }
        }

        rec.beginEdit();
        rec.set(newData);
        rec.endEdit();
        me.hitungTotal();

    },
    gridDateSelectionChange: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGriddate();
        var row = g.getSelectedRow();
        console.log("jalana...");
        var pf = "dinasdetail_"; // prefix
        if (row >= 0) {
            var rec = g.getStore().getAt(row);
            // var p = f.down("#rincianBiayaIdPanel");
            me.loadDataFormDate(rec, me.getFormdata());
        }
    },
    loadDataFormDate: function(rec, f) {
        var fields = null;

        fields = rec.data;
        var pf = "dinasdetail_";
        for (var i in fields) {
            var el = f.down("[name=" + pf + "" + i + "]");
            if (el) {
                if (el.getXType() === 'xmoneyfield') {
                    el.setValuem(fields[i]);
                } else {
                    el.setValue(fields[i]);
                }

            }
        }
        console.log(rec.get("date"));
        console.log(rec.get("hari"));
    },
    mainGridSelectionChange: function() {
        var me = this;
        var gl = me.getMainGrid();
        var p = me.getPanel();
        var rec = gl.getSelectedRecord();
        var f = me.getFormdata();
        var gd = me.getGriddate();
        if (!rec)
            return;


        f.loadRecord(rec);
        f.editedRow = gl.getSelectedRow();
        me.getPanel().down("toolbar button[action=delete]").setDisabled(false);
        me.getPanel().down("toolbar button[action=edit]").setDisabled(false);



        me.fixMoneyFields(1, rec, me.getFormdata());

        me.loadGridDate(rec);


    },
    loadGridDate: function(rec) {
        var me = this;
        var f = me.getFormdata();
        var gd = me.getGriddate();
        var dinasId = typeof rec === "undefined" ? 0 : rec.get("dinas_id");
        gd.doInit();
        f.setLoading("Please wait");
        me.getGriddate().getStore().loadData([], false);
        me.tools.ajax({
            params: {
                dinas_id: dinasId
                        //employee_name: me.getForm().down("[name=employee_name]").getValue()
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, gd).grid();
                f.setLoading(false);

                /// select first record di grid date
                if (me.getGriddate().getStore().getCount() > 0) {
                    me.getGriddate().getSelectionModel().select(0);
                    me.loadDataFormDate(me.getGriddate().getStore().getAt(0), f);
                }

            }
        }).read('biaya');
    },
    generateBiaya: function() {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getValues();
        var berangkat = f.down("[name=berangkat]").getValue();
        var kembali = f.down("[name=kembali]").getValue();
        var lessThan = me.tools.dateLessThan(berangkat, kembali);
        var gd = me.getGriddate();
        /// get employee data
        var gm = me.getGrid();
        var recEm = gm.getSelectedRecord();
        var groupId = me.tools.intval(recEm.get("group_group_id"));
        //   console.log(groupId);
        var parameterUang = me.getParameterUang(groupId);
        var tugas = vs["tugas"];
        var pf = "dinasdetail_";

        console.log(tugas);


        if (!lessThan) {
            f.down("[name=kembali]").setValue(berangkat);
            kembali = berangkat;
            // me.tools.alert.warning("Tanggal berangkat dan kembali tidak valid");

            // return false;
        }

        var diff = me.tools.diffDays(berangkat, kembali);

        console.log(diff);


        // set uang makan dan uang saku
        var ums = me.getUangMakanSaku(tugas, parameterUang); // uang makan saku




        if (!ums["s"] || !ums["m"]) {
            me.tools.alert.warning("Parameter uang makan atau uang saku tidak ada untuk golongan " + recEm.get("group_code"));
            return;
        }


        f.down("[name=" + pf + "uang_saku]").setValuem(ums["s"]);
        f.down("[name=" + pf + "uang_makan]").setValuem(ums["m"]);

        gd.getStore().loadData([], false);



        gd.getStore().add({
            date: berangkat,
            department: 'ALL',
            tujuan: '',
            hari: me.tools.dateFunc(berangkat).getDayWeekName(),
            uang_saku: ums["s"],
            uang_makan: ums["m"]
        });

        var tempDate = null;

        for (var i = 0; i < diff; i++) {
            tempDate = me.tools.dateFunc(berangkat).addDay(i + 1);
            console.log(tempDate);
            gd.getStore().add({
                date: tempDate,
                hari: me.tools.dateFunc(tempDate).getDayWeekName(),
                department: 'ALL',
                tujuan: i,
                uang_saku: ums["s"],
                uang_makan: ums["m"]
            });
        }

        me.hitungTotal();

        gd.getSelectionModel().select(0);







    },
    getParameterUang: function(groupId) {
        var me = this;
        /// check group di parameter uang
        var p = me.parameterUang;
        var pu = false;
        if (p) {
            for (var i in p) {
                if (p[i]["group_group_id"] === groupId) {
                    pu = p[i];
                }
            }
        }
        return pu;
    },
    getUangMakanSaku: function(tugas, data) {
        var hasil = {m: 0.00, s: 0.00};
        switch (tugas) {
            case 1:
                hasil["m"] = data["pulk_makan_satu_bulan"];
                hasil["s"] = data["pulk_saku_satu_bulan"];
                break;
            case 2:
                hasil["m"] = data["pulk_makan_satu_bulan_lebih"];
                hasil["s"] = data["pulk_saku_satu_bulan_lebih"];
                break;
            case 3:
                hasil["m"] = data["pplk_makan_satu_bulan"];
                hasil["s"] = data["pplk_makan_satu_bulan"];
                break;
            case 4:
                hasil["m"] = data["pplk_makan_satu_bulan_lebih"];
                hasil["s"] = data["pplk_saku_satu_bulan_lebih"];
                break;
        }
        return hasil;
    },
    hitungTotal: function() {
        var me = this;
        var f = me.getFormdata();
        var gd = me.getGriddate();
        var sd = gd.getStore();
        var tUangMakan = 0;
        var tUangSaku = 0;
        var tUang = 0;
        var others = 0;
        sd.each(function(rec) {

            if (rec != null) {

                tUangMakan += me.tools.floatval(rec.get("uang_makan"));
                tUangSaku += me.tools.floatval(rec.get("uang_saku"));
                others += me.tools.floatval(rec.get("transportasi")) +
                        me.tools.floatval(rec.get("pengeluaran_makan")) +
                        me.tools.floatval(rec.get("airport_tax")) +
                        me.tools.floatval(rec.get("biaya_telepon")) +
                        me.tools.floatval(rec.get("tinggal_di_rumah_uang")) +
                        me.tools.floatval(rec.get("biaya_lainnya"));
            }

        });
        tUang = tUangMakan + tUangSaku + others;

        f.down("[name=total_uang_saku]").setValuem(tUangSaku);
        f.down("[name=total_uang_makan]").setValuem(tUangMakan);
        f.down("[name=total_uang]").setValuem(tUang);

    },
    prosesPanggilAjax: function(modeRead) {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Processing...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                console.log(data['others']);
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info('Success');
                    me.loadGridLeave(false);
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                p.setLoading(false);
            }
        }).read(modeRead);
    },
    getMainGrid: function() {
        var me = this;
        return me.getGridleave();
    },
    panelAfterRender: function(el) {
        var me = this;


        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        me.getGriddate().getSelectionModel().setSelectionMode('SINGLE');

        var pt = me.getGrid().down("pagingtoolbar");
        if (pt) {
            pt.getStore().loadPage(1);
        }

        p.setLoading('Please wait...');
        me.tools.ajax({
            params: {},
            success: function(data, model) {


                // me.tools.wesea(data.absenttype, me.getFormdata().down("[name=absenttype_absenttype_id]")).comboBox();

                // parameter uang
                me.parameterUang = data["parameteruang"]["data"];

                /// parameter nomor surat
                if (data["nomorsuratdinas"]) {
                    me.nomorSurat = data["nomorsuratdinas"]["data"];
                }

                //leave grid load
                var gl = me.getGridleave();
                gl.getSelectionModel().setSelectionMode('SINGLE');
                gl.doInit();
                //gl.getStore().getProxy().extraParams.limit = 9999;
                me.loadGridLeave(true);

                me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
                me.expireDuration = data['others'][0][0]['EXPIRE_DURATION'];

                console.log(me.globalParams);
                p.setLoading(false);
            }
        }).read('detail');


        //load grid date
        var gd = me.getGriddate();
        gd.doInit();
        f.down("button[action=generate]").setDisabled(true);
        gd.doLoad({dinas_id: 0}, function() {
            f.down("button[action=generate]").setDisabled(false);
        });

        me.callParent(arguments);





    },
    loadGridLeave: function(isInit) {
        var me = this;
        var gl = me.getGridleave();
        gl.getStore().load({
            params: {
                limit: 9999
            },
            callback: function(rec, op) {
                if (isInit) {
                    gl.attachModel(op);
                }

                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    me.doGridLeaveFilter(rec.get("employee_id"));
                    me.loadGridDate();
                }

            }
        });
    },
    finalData: function(data) {
        var me = this;
        data["detail"] = me.getGriddate().getJson();
        data["nomorsurat"] = me.newNomorSurat;

        me.fixMoneyFields(2, data);

        return data;
    },
    storeLoadedAfterSaveUpdate: function() {
        var me = this;
        // var rec = me.getGrid().getSelectedRecord();
        // me.doGridLeaveFilter(rec.get("employee_id"));
        // me.mainGridCheckRecord();
        me.getGrid().getSelectionModel().deselectAll();
        me.loadGridLeave();
    },
    afterClick: function() {
        var me = this;
        var x = {
            cancel: function() {
                me.mainGridCheckRecord();
            },
            save: function() {

            },
            edit: function() {
                var f = me.getFormdata();
                f.down("[name=berangkat]").setReadOnly(true);
                f.down("[name=kembali]").setReadOnly(true);
            },
            delete: function() {

            },
            new : function() {

                var recEm = me.getGrid().getSelectedRecord();
                var idEm = 0;
                if (recEm) {
                    idEm = me.tools.intval(recEm.get("employee_id"));
                }


                if (idEm < 1) {
                    me.tools.alert.warning("Pilih karyawan terlebih dahulu");
                    return;
                }

                var f = me.getFormdata();
                var d = new Date();
                //    f.getForm().reset();
                // f.down("[name=start_use]").setValue(d.getFullYear());

                //me.leaveGroupOnBlur();
                //me.startUseKeyUp();

                me.getGriddate().getStore().loadData([], false);

                var p = me.getPanel();

                f.down("[name=date]").setValue(d);
                f.down("[name=berangkat]").setValue(d);
                f.down("[name=kembali]").setValue(d);

                me.dateOnBlur();


            }
        }
        return x;
    },
    getNomorSurat: function() {
        var me = this;
        var p = me.nomorSurat;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var nomor = "";
        var tempId = 0;
        var tempPrefix = "DOCNO";
        var tempNomor = 0;
        if (p) {
            console.log(p);
            if (p["tahun"] === year && p["bulan"] === month) {
                nomor = me.tools.intval(p["nomor"]);
                tempId = p["nomorsuratdinas_id"];
            } else {
                nomor = 0;
            }

            nomor = nomor + 1;
            tempNomor = nomor;

            /// set ke string
            nomor = me.tools.akdab(nomor) + "/" + p["infiks"] + "/" + me.tools.getRomawi(month) + "/" + year;

            tempPrefix = p["infiks"];

        } else {
            nomor = nomor = me.tools.akdab(1) + "/PLKNO/" + me.tools.getRomawi(month) + "/" + year;
            tempPrefix = "PLKNO";

        }
        me.newNomorSurat = {
            'nomorsuratdinas_id': tempId,
            'infiks': tempPrefix,
            'bulan': month,
            'tahun': year,
            'nomor': tempNomor};
        return nomor;
    }
});