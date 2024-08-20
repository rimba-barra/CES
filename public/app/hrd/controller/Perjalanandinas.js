Ext.define('Hrd.controller.Perjalanandinas', {
    extend: 'Hrd.library.box.controller.ControllerByData2',
    alias: 'controller.Perjalanandinas',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'perjalanandinas',
    formWidth: 600,
    refs: [
        {
            ref: 'formdetail',
            selector: 'perjalanandinasformdatadetail'
        },
        {
            ref: 'griddetail',
            selector: 'perjalanandinasgriddetail'
        },
        {
            ref: 'gridbrowse',
            selector: 'lookupemployeegrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Perjalanandinas',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'perjalanandinas_id',
    overtimeParameters: null,
    myParams: {
        employees: [],
        projects: [],
        negaratujuans: [],
        uangdinasdetails: []
    },
    moneyFields: ['uangmuka_amount', 'uangkendaraaan_amount',
        'exchange_rate', 'rincian_uangmakan_amount',
        'rincian_uangmakan_total',
        'rincian_uangsaku_amount', 'rincian_uangsaku_total',
        'total'],
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    nomorTerakhir: null,
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



        //lookupemployee
        newEvs['perjalanandinasformdata button[action=browse]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        newEvs['perjalanandinasgriddetail button[action=adddetail]'] = {
            click: function() {
                me.detailAddClick();
            }
        };
        newEvs['perjalanandinasgriddetail button[action=editdetail]'] = {
            click: function() {
                me.detailEditClick();
            }
        };
        newEvs['perjalanandinasgriddetail button[action=deletedetail]'] = {
            click: function() {
                me.detailDeleteClick();
            }
        };
        newEvs['perjalanandinasformdatadetail button[action=save]'] = {
            click: function() {
                me.saveDetail();
            }
        };
        newEvs['perjalanandinasformdata [name=negaratujuan_negaratujuan_id]'] = {
            select: function() {
                me.negaraOnSelect();
            }
        };
        newEvs['#employeeBrowseDinaswindow [action=select]'] = {
            click: function() {
                me.selectEmployee();
            }
        };
        newEvs['perjalanandinasformdata [name=rincian_uangsaku_durasi]'] = {
            blur: function() {
                me.hitungUangDinas();
            }
        };
        newEvs['perjalanandinasformdata [name=rincian_uangmakan_durasi]'] = {
            blur: function() {
                me.hitungUangDinas();
            }
        };
        newEvs['perjalanandinasformdata [name=perjalanandinas_status]'] = {
            change: function() {
                me.hitungUangDinas();
            }
        };
        newEvs['perjalanandinasformdata [name=perjalanandinas_lama]'] = {
            change: function() {
                me.hitungUangDinas();
            }
        };

        newEvs['perjalanandinasformdata [name=tanggal_berangkat]'] = {
            select: function() {
                me.hitungDurasi(1);
            }
        };
        newEvs['perjalanandinasformdata [name=tanggal_kembali]'] = {
            select: function() {
                me.hitungDurasi(0);
            }
        };

        newEvs['perjalanandinasformdata [name=tanggal_berangkat]'] = {
            blur: function() {
                me.hitungDurasi(1);
            }
        };
        newEvs['perjalanandinasformdata [name=jam_berangkat]'] = {
            blur: function() {
                me.hitungUangDinas();
            }
        };
        newEvs['perjalanandinasformdata [name=jam_kembali]'] = {
            blur: function() {
                me.hitungUangDinas();
            }
        };
        newEvs['perjalanandinasformdata [name=perjalanandinas_date]'] = {
            blur: function() {
                me.loadNomorTerakhir(function(){
                    me.generateNomorSurat();
                });
                
            }
        };



        //

        //

        this.control(newEvs);

    },
    negaraOnSelect: function() {
        var me = this;
        me.hitungUangDinas();
        me.generateNomorSurat();
    },
    hitungDurasi: function(mode) {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        console.log(vs);

        var date = moment("2015-02-04", "YYYY-MM-DD").toDate();
        console.log(date);
        // untuk tanggal berangkat saja
        if (mode === 1) {
            f.down("[name=tanggal_kembali]").setValue(f.down("[name=tanggal_berangkat]").getValue());
        }

        var start = moment(f.down("[name=tanggal_berangkat]").getValue());
        var end = moment(f.down("[name=tanggal_kembali]").getValue());
        var duration = moment.duration(end.diff(start));
        f.down("[name=rincian_uangmakan_durasi]").setValue(duration.asDays());
        f.down("[name=rincian_uangsaku_durasi]").setValue(duration.asDays());

        me.hitungUangDinas();

        //  console.log(vs);
    },
    resetRincianBiaya: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=rincian_uangmakan_amount]").setValue(0);
        f.down("[name=rincian_uangsaku_amount]").setValue(0);
        f.down("[name=rincian_uangsaku_currency_id]").setValue(0);
        f.down("[name=rincian_uangmakan_currency_id]").setValue(0);
        f.down("[name=rincian_uangmakan_total]").setValue(0);
        f.down("[name=rincian_uangsaku_total]").setValue(0);
        f.down("[name=total]").setValue(0);
    },
    hitungUangDinas: function() {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        var uang = me.selectUang();


        me.resetRincianBiaya();

        // set uang 
        if (uang) {

            uang = uang.uangdinasdetail;



            // PU <= 1 bulan
            if (vs.perjalanandinas_status === 1 && vs.perjalanandinas_lama === 1) {
                f.down("[name=rincian_uangmakan_amount]").setValue(accounting.formatMoney(uang.uangmakan_pp_1m));
                f.down("[name=rincian_uangsaku_amount]").setValue(accounting.formatMoney(uang.uangsaku_pp_1m));
                // PU > 1 bulan    
            } else if (vs.perjalanandinas_status === 1 && vs.perjalanandinas_lama === 0) {
                f.down("[name=rincian_uangmakan_amount]").setValue(accounting.formatMoney(uang.uangmakan_pp_xm));
                f.down("[name=rincian_uangsaku_amount]").setValue(accounting.formatMoney(uang.uangsaku_pp_xm));
                // PP <= 1 bulan    
            } else if (vs.perjalanandinas_status === 0 && vs.perjalanandinas_lama === 1) {
                f.down("[name=rincian_uangmakan_amount]").setValue(accounting.formatMoney(uang.uangmakan_pu_1m));
                f.down("[name=rincian_uangsaku_amount]").setValue(accounting.formatMoney(uang.uangsaku_pu_1m));
                // PP > 1 bulan      
            } else {
                f.down("[name=rincian_uangmakan_amount]").setValue(accounting.formatMoney(uang.uangmakan_pu_xm));
                f.down("[name=rincian_uangsaku_amount]").setValue(accounting.formatMoney(uang.uangsaku_pu_xm));
            }


            //rincian_uangsaku_currency_id
            f.down("[name=rincian_uangsaku_currency_id]").setValue(uang.currency_currency_id);
            f.down("[name=rincian_uangmakan_currency_id]").setValue(uang.currency_currency_id);

        } else {
            console.log("[ER001] Tidak ada konfigurasi uang dinas");
        }






        /// hitung uang

        var uangMakan = accounting.unformat(f.down("[name=rincian_uangmakan_amount]").getValue());
        var uangSaku = accounting.unformat(f.down("[name=rincian_uangsaku_amount]").getValue());
        var hariUangMakan = accounting.unformat(f.down("[name=rincian_uangmakan_durasi]").getValue());
        var hariUangSaku = accounting.unformat(f.down("[name=rincian_uangsaku_durasi]").getValue());
        var totalUangMakan = uangMakan * hariUangMakan;
        var totalUangSaku = uangSaku * hariUangSaku;
        var total = totalUangMakan + totalUangSaku;


        /// pengurangan kalau jam berangkat atau kembali tidak sesuai ketentuan
        var jamBerangkat = null;
        var jamKembali = null;
        var penguranganUangSaku = 0;
        jamBerangkat = f.down("[name=jam_berangkat]").getValue();
        jamKembali = f.down("[name=jam_kembali]").getValue();
        jamBerangkat = me.keMenit(jamBerangkat);
        jamKembali = me.keMenit(jamKembali);

        if (jamBerangkat > 0) {
            if (jamBerangkat > (13 * 60)) {
                penguranganUangSaku = penguranganUangSaku + (50 / 100) * uangSaku;
            }
        }
        if (jamKembali > 0) {
            if (jamKembali < (13 * 60)) {
                penguranganUangSaku = penguranganUangSaku + uangSaku;
            } else if (jamKembali > (13 * 60) && jamKembali < (17 * 60)) {
                penguranganUangSaku = penguranganUangSaku + (50 / 100) * uangSaku;
            }
        }

        //=== pengurangan tidak boleh melebih limit uang saku
        if (penguranganUangSaku > uangSaku) {
            penguranganUangSaku = uangSaku;
        }

        totalUangSaku = totalUangSaku - penguranganUangSaku;


        /// isi form
        f.down("[name=rincian_uangmakan_total]").setValue(accounting.formatMoney(totalUangMakan));
        f.down("[name=rincian_uangsaku_total]").setValue(accounting.formatMoney(totalUangSaku));
        f.down("[name=total]").setValue(accounting.formatMoney(total));

    },
    generateNomorSurat: function() {
        var me = this;
        var f = me.getFormdata();
        var id = me.tools.intval(f.down("[name=perjalanandinas_id]").getValue());
        if(id > 0){ // hanya berlaku untuk proses create
            return;
        }

        // var isPdln = false;
        var negaraTujuan = me.tools.intval(f.down("[name=negaratujuan_negaratujuan_id]").getValue());
        var tgl = moment(f.down("[name=perjalanandinas_date]").getValue());
        if (negaraTujuan == 0) {
            return;
        }
        if (me.tools.intval(f.down("[name=employee_employee_id]").getValue()) == 0) {
            return;
        }
        if (!tgl) {
            return;
        }

        console.log(tgl.month());
        var isPdln = me.tools.comboHelper(f.down("[name=negaratujuan_negaratujuan_id]")).getField("negaratujuan_id", "is_luarnegeri");
        console.log(isPdln);
        var strNomor = isPdln ? "PDLN/" : "PDLK/";
        strNomor += f.down("[name=department_code]").getValue() + "/";
        strNomor += tgl.year() + "/";
        strNomor += me.tools.getRomawi((tgl.month() + 1)) + "/";
        strNomor += me.nomorTerakhir + 1;

        // f.down("[name=perjalanandinas_nomor]").setValue("PDLN");

        var nomor = strNomor;
        f.down("[name=perjalanandinas_nomor]").setValue(nomor);
    },
    /*@param stringJam format : hh:mm 
     *@return menit
     **/
    keMenit: function(stringJam) {
        var me = this;
        var hasil = 0;
        if (stringJam.indexOf(":") < 0) {
            return hasil;
        }

        hasil = stringJam.split(":");
        if (hasil.length == 2) {
            hasil[0] = me.tools.intval(hasil[0]) * 60;
            hasil[1] = me.tools.intval(hasil[1]);
            hasil = hasil[0] + hasil[1];
        } else {
            hasil = 0;
        }
        return hasil;

    },
    selectUang: function() {
        var me = this;
        var hasil = false;
        var f = me.getFormdata();
        //   console.log(me.myParams.uangdinasdetails);
        var params = me.myParams.uangdinasdetails;

        //var params = me.myParams.uangdinasdetails.data;
        var groupId = me.tools.intval(f.down("[name=group_group_id]").getValue());
        var negaraId = me.tools.intval(f.down("[name=negaratujuan_negaratujuan_id]").getValue());
        if (params) {
            for (var i in params) {

                //    console.log(me.tools.intval(params[i].negaratujuan_negaratujuan_id)+"---"+negaraId
                //       +",,"+ me.tools.intval(params[i].group_group_id)+"---"+groupId);
                if (me.tools.intval(params[i].uangdinasdetail.negaratujuan_negaratujuan_id) === negaraId
                        && me.tools.intval(params[i].uangdinasdetail.group_group_id) === groupId) {

                    hasil = params[i];
                }
            }
        }
        return hasil;
    },
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridbrowse();
        var rec = g.getSelectedRecord();
        if (rec) {

            f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
            f.down("[name=department_code]").setValue(rec.get("department_code"));
            f.down("[name=position_position]").setValue(rec.get("position_position"));
            f.down("[name=group_code]").setValue(rec.get("group_code"));
            f.down("[name=group_group_id]").setValue(rec.get("group_group_id"));
            g.up("window").close();
            me.generateNomorSurat();


            me.hitungUangDinas();
        }
    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeBrowseDinaswindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");
        g.getSelectionModel().setSelectionMode('SINGLE');
        g.bindPrefixName = me.controllerName;
        g.doInit();

        var p = window.down("panel");
        // p.setLoading("Please wait...");
        g.doLoad({}, function() {
            var pt = g.down("pagingtoolbar");
            if (pt) {
                pt.getStore().loadPage(1);
            }
            //  p.setLoading(false);
        });

    },
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            //   el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        var f = me.getFormdata();


        me.getPanel().setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.myParams.employees = data.employee;
                me.myParams.negaratujuans = data.negaratujuan;
                me.myParams.projects = data.project;
                // me.myParams.uangdinasdetails = data.uangdinasdetail;
                me.myParams.currencies = data.currency;

                me.tools.wesea(me.myParams.employees, f.down("[name=cc_employee_id]")).comboBox();
                me.tools.wesea(me.myParams.employees, f.down("[name=approval_employee_id]")).comboBox();
                me.tools.wesea(me.myParams.negaratujuans, f.down("[name=negaratujuan_negaratujuan_id]")).comboBox();
                me.tools.wesea(me.myParams.projects, f.down("[name=perjalanandinas_project_id]")).comboBox();
                me.tools.wesea(me.myParams.currencies, f.down("[name=uangmuka_currency_id]")).comboBox();
                me.tools.wesea(me.myParams.currencies, f.down("[name=uangkendaraan_currency_id]")).comboBox();
                me.tools.wesea(me.myParams.currencies, f.down("[name=rincian_uangmakan_currency_id]")).comboBox();
                me.tools.wesea(me.myParams.currencies, f.down("[name=rincian_uangsaku_currency_id]")).comboBox();
                //  me.getPanel().setLoading(false);


                me.tools.ajax({
                    params: {},
                    success: function(datax, modelx) {

                        me.myParams.uangdinasdetails = datax;
                        me.getPanel().setLoading(false);

                    }

                }).read('uangdinas');


            }

        }).read('parameter');




    },
    validateData: function() {
        var data = {"status": false, "msg": "Sedang diproses..."};
        data.status = true;
        data.msg = "Sep";
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                f.getForm().reset();
                f.down("[action=browse]").setDisabled(true);
            },
            save: function() {

            },
            edit: function() {
                f.getForm().reset();
                me.fillForm();
                f.down("[action=browse]").setDisabled(false);

            },
            delete: function() {

            },
            new : function() {
                f.getForm().reset();
                f.down("[name=perjalanandinas_date]").setValue(new Date());
                f.down("[action=browse]").setDisabled(false);
                
                me.loadNomorTerakhir(function(){
                    
                });
            }
        }
        return x;
    },
    loadNomorTerakhir: function(callback) {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Please wait...");
        var vs = f.getForm().getValues();
        me.tools.ajax({
            params: {
                date: vs['perjalanandinas_date']
            },
            success: function(data, model) {
                
                f.setLoading(false);
                me.nomorTerakhir = data.others[0][0].JUMLAH;
                if(typeof callback==="function"){
                    callback();
                }

            }
        }).read('jumlahtransaksipertahun');
    },
    finalData: function(data) {
        var me = this;

        return data;
    },
    afterSC: function(rec) {
        var me = this;
        var f = me.getFormdata();
        //  me.fillForm();
        me.hitungUangDinas();
        f.down("[name=uangmuka_amount]").setValuem(f.down("[name=uangmuka_amount]").getValue());
        f.down("[name=uangkendaraaan_amount]").setValuem(f.down("[name=uangkendaraaan_amount]").getValue());
        f.down("[name=exchange_rate]").setValue(accounting.formatMoney(f.down("[name=exchange_rate]").getValue()));
        //  f.down("[name=rincian_uangmakan_total]").setValue(accounting.formatMoney(totalUangMakan));
        //   f.down("[name=rincian_uangmakan_total]").setValue(accounting.formatMoney(totalUangMakan));

    },
    fillForm: function() {
        var me = this;

        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return;

        }

        me.getFormdata().loadRecord(rec);

        /// total
        var umt = accounting.unformat(me.getFormdata().down("[name=rincian_uangmakan_total]").getValue());
        var ust = accounting.unformat(me.getFormdata().down("[name=rincian_uangsaku_total]").getValue());
        me.getFormdata().down("[name=total]").setValue(umt + ust);



        for (var i in me.moneyFields) {
            var el = me.getFormdata().down("[name=" + me.moneyFields[i] + "]");
            el.setValue(accounting.formatMoney(el.getValue()));
        }


    },
    storeLoadedAfterSaveUpdate: function(rec, operation, success) {
        var me = this;
        console.log("YEAHH!!!");
    }



});