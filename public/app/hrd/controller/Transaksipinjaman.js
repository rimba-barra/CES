Ext.define('Hrd.controller.Transaksipinjaman', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Transaksipinjaman',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'transaksipinjaman',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        },
        {
            ref: 'gridangsuran',
            selector: 'transaksipinjamanangsurangrid'
                    //
        },
        {
            ref:'formlunas',
            selector:'transaksipinjamanpelunasanformdata'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Transaksipinjaman',
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

        /////// LOAD ACCOUNTING OBJECT
        if (typeof accounting === 'undefined') {

            Ext.Loader.injectScriptElement(document.URL + 'app/hrd/library/accounting.min.js', function() {
                /// loaded
                // Settings object that controls default parameters for library methods:
                accounting.settings = {
                    currency: {
                        symbol: "", // default currency symbol is '$'
                        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                        decimal: ".", // decimal point separator
                        thousand: ",", // thousands separator
                        precision: 2   // decimal places
                    },
                    number: {
                        precision: 0, // default precision on numbers is 0
                        thousand: ",",
                        decimal: "."
                    }
                }

                HRD_GLOBAL_PRECISION = 2;


            }, function() {
                /// error
            });
        }

        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();

        newEvs['transaksipinjamanformdata [name=tipepinjaman_tipepinjaman_id]'] = {
            select: function() {
                //  me.tipeOnSelect();
            }

        };

        newEvs['transaksipinjamanformdata button[action=proses]'] = {
            click: function() {
                me.generateAngsuran();
            }

        };

        //lookup_employee
        newEvs['transaksipinjamanformdata button[action=lookup]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };

        newEvs['transaksipinjamanformdata [name=nilai]'] = {
            blur: function() {
                me.proses();
            }

        };
        newEvs['transaksipinjamanformdata [name=bunga]'] = {
            blur: function() {
                me.proses();
            }

        };
        newEvs['transaksipinjamanformdata [name=lama_angsuran]'] = {
            blur: function() {
                me.proses();
            }

        };



        newEvs['#employeeTKejadianwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };
        
        
        newEvs['transaksipinjamanpanel button[action=pelunasan]'] = {
            click: function() {
                me.lunasOnClick(1);
            }

        };
        
        newEvs['transaksipinjamanpanel button[action=batalpelunasan]'] = {
            click: function() {
                me.lunasOnClick(0);
            }

        };
        
        //
        newEvs['transaksipinjamanpelunasanformdata button[action=process]'] = {
            click: function() {
                me.lunasProcessOnClick();
            }

        };


        this.control(newEvs);

    },
    lunasProcessOnClick:function(){
        var me = this;
        var f = me.getFormlunas();
        var vs = f.getForm().getValues();
        var opsi = vs["opsi"];
        var v = f.down("[name=month]").getValue();
        var v = v.split("/");
        var employeeId = me.tools.intval(vs["employee_id"]);
        var month = 0;
        var year = 0;
        var modeRead = me.tools.intval(f.down("[name=is_lunas]").getValue())===1?"pelunasan":"batalpelunasan";
        if(v.length===2){
            month = me.tools.intval(v[0]);
            year = me.tools.intval(v[1]);
            if(!(month >= 1 && month <= 12)){
                month = 1;
            }
            if(!(year >= 1999 && year <= 2100)){
                year = 1999;
            }
        }
        if(month === 0 || year === 0){
            me.tools.alert.warning("Bulan atau Tahun tidak valid");
            return;
        }
        if(opsi==="perkaryawan" && employeeId===0){
            me.tools.alert.warning("Karyawan tidak valid");
            return;
        }
        if(opsi==="all"){
            employeeId = 0;
        }
        
        f.down("[name=month]").setValue(month+"/"+year);
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                month:month,
                year:year,
                employee_id:employeeId
            },
            success: function(data, model) {
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info("Success");
                    f.up("window").close();
                    var rec = me.getGrid().getSelectedRecord();
                    me.afterSC(rec);
                } else {
                    me.tools.alert.error("Error.");
                }
                f.setLoading(false);
            }
        }).read(modeRead);
        
        console.log(opsi);
    },
    lunasOnClick:function(isLunas){
        var me = this;
        var date = new Date();
        var window = me.instantWindow("FormPelunasan",300,isLunas===1? "Proses Pelunasan" : "Batal Pelunasan", "pelunasan", "toolPinjamanLunasWinId");
        var f = me.getFormlunas();
        f.down("[name=month]").setValue(date.getMonth()+"/"+date.getFullYear());
        f.down("[name=employee_id]").setValue(me.getFormdata().down("[name=employee_employee_id]").getValue());
        f.down("[name=is_lunas]").setValue(isLunas);

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
                'date': me.generateDueDate(interval*(i-1), startDate),
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
         var nilaiBunga = (nilai/durasi) * (bunga == 0 ? 0 : (( bunga / 100)*interval));
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
            me.tools.fillEmployeeInfo(rec,f);
            g.up("window").close();
        }

    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTKejadianwindow", "lookup.employee", {
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
    finalData:function(data){
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
        me.tools.fixMoneyLoadRecord(rec,me.getFormdata());
        if (rec) {
            var ga = me.getGridangsuran();
            ga.doInit();
            ga.getStore().load({
                params:{pinjaman_pinjaman_id:rec.get("pinjaman_id")},
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
                me.getGridangsuran().getStore().loadData([],false);
            }
        }
        return x;
    }


});