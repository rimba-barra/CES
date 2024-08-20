Ext.define('Hrd.controller.Klaimkacamata', {
    extend: 'Hrd.library.box.controller.Controllerfdv',
    alias: 'controller.Klaimkacamata',
    requires: ['Hrd.library.box.tools.DefaultConfigfdv', 'Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.SimpleGridControl', 'Hrd.library.box.tools.Tools', 'Hrd.library.system.Tools'],
    views: ['klaimkacamata.Panel', 'klaimkacamata.Grid', 'klaimkacamata.FormSearch', 'klaimkacamata.FormData'],
    comboBoxIdEl: [],
    controllerName: 'klaimkacamata',
    fieldName: 'klaimkacamata_id',
    fillForm: null,
    formWidth: 500,
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Klaimkacamata',
    browseHandler: null,
    localStore: {
        newdetail: null
    },
    refs: [
        {
            ref: 'gridlens',
            selector: 'klaimkacamatarecordgrid'
        },
        {
            ref: 'gridframe',
            selector: 'klaimkacamatarecordframegrid'
        }
    ],
    isMaximize: true,
    saveStore: null,
    listYears: null,
    newClaimClicked: false,
    paramLimit: 0,
    persenAdd: 0.0,
    hitungPlafonResult: null,
    currentKlaim: 0, // mencatat penggantian sebelum diedit
    employeeDetail: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        newEvs['klaimkacamataformsearch [name=department_department_id]'] = {
            select: function(fld, a) {
                me.filterMainGrid();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=cancel]'] = {
            click: function(fld, a) {
                me.cancelOnClick();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=save]'] = {
            click: function(fld, a) {
                me.saveOnClick();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=edit]'] = {
            click: function(fld, a) {
                me.editOnClick();
            }

        };
        newEvs['klaimkacamatagrid toolbar button[action=delete]'] = {
            click: function(fld, a) {
                me.deleteOnClick();
            }
        };

        
        
        // edit by Wulan Sari 2018.10.15
        newEvs['klaimkacamatagrid toolbar button[action=create]'] = {
            click: function(fld, a) {
                var me = this;
                me.currentKlaim = 0;
                var fm = me.getFormdata();
                var activeTab = fm.down("tabpanel").getActiveTab();                
                var tipeKlaim = activeTab.itemId === 'lensTabPanel' ? 'L' : 'F';
                if(tipeKlaim == 'L'){
                    me.lensGridSelectionChange();
                } else {
                    me.frameGridSelectionChange();                    
                }
            }

        };
        
        // end edit by Wulan Sari 2018.10.15
        
        newEvs['klaimkacamatarecordgrid'] = {
            selectionchange: me.lensGridSelectionChange
        };
        newEvs['klaimkacamatarecordframegrid'] = {
            selectionchange: me.frameGridSelectionChange
        };

        newEvs['#formLensID [name=total_klaim]'] = {
            blur: function(el, val) {
                me.totalKlaimOnBlur(el, val, "formLensID");
            }
        };

        newEvs['#formFrameID [name=total_klaim]'] = {
            blur: function(el, val) {
                me.totalKlaimOnBlur(el, val, "formFrameID");
            }
        };

        newEvs['#formLensID [name=tanggal_klaim]'] = {
            change: function(el, val) {
                me.loadDataPlafon(function() {
                    me.totalKlaimOnBlurLensa();
                });
            }
        };

        newEvs['#formLensID [name=tanggal_klaim]'] = {
            blur: function(el, val) {
                me.loadDataPlafon(function() {
                    me.totalKlaimOnBlurLensa();
                });

            }
        };

        newEvs['#formFrameID [name=tanggal_klaim]'] = {
            change: function(el, val) {
                me.loadDataPlafon(function() {
                    me.totalKlaimOnBlurFrame();
                });
            }
        };

        newEvs['#formFrameID [name=tanggal_klaim]'] = {
            blur: function(el, val) {
                me.loadDataPlafon(function() {
                    me.totalKlaimOnBlurFrame();
                });

            }
        };

        newEvs['#formLensID [name=tipe_klaim_lensa]'] = {
            change: function(el, val) {

                me.totalKlaimOnBlurLensa();

            }
        };


        /// checkbox rekomendasi dokter
        newEvs['#formFrameID [name=rekomendasi_dokter]'] = {
            change: function(el, val) {

                me.rekomendasiDokterOnChange("formFrameID");
            }
        };

        newEvs['#formLensID [name=rekomendasi_dokter]'] = {
            change: function(el, val) {

                me.rekomendasiDokterOnChange("formLensID");

            }
        };




        //



        this.control(newEvs);

        // added 26 Agustus 2014
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});


    },
    rekomendasiDokterOnChange: function(formTab) {
        var me = this;
        var f = me.getFormdata();
        f = f.down("#" + formTab);
        var vs = f.getValues();
        var isRedok = false; /// rekomendasi dokter?
        if (vs["rekomendasi_dokter"] === 1) {
            isRedok = true;
        }



        me.totalKlaimOnBlur(null, 0, formTab);

    },
    totalKlaimOnBlurLensa: function() {
        var me = this;
        me.totalKlaimOnBlur(null, 0, "formLensID");
    },
    totalKlaimOnBlurFrame: function() {
        var me = this;
        me.totalKlaimOnBlur(null, 0, "formFrameID");
    },
    totalKlaimOnBlur: function(el, val, formTab) {
        var me = this;
        me.hitungPlafonResult = null;
        var f = me.getFormdata();
        f = f.down("#" + formTab);

        var vs = f.getValues();



        var tanggal = f.down("[name=tanggal_klaim]").getValue();
        var emRec = me.getGrid().getSelectedRecord();

        var plafonDefault = accounting.unformat(f.down("[name=plafon]").getValue());

        var isRedok = false; /// rekomendasi dokter?
        isRedok = vs.rekomendasi_dokter === 1 ? true : false;

        if (isRedok) {
            plafonDefault = plafonDefault + ((me.persenAdd / 100) * plafonDefault);
        }


        if (vs.tipe_klaim_lensa === "PROGRESIVE" && formTab === "formLensID") {

            plafonDefault = plafonDefault * 2;
        }
        
        //// klaim lama
        var klaimLama = [];
        
        /// jika periode klaim 1 tahun
        if (me.tools.intval(me.paramLimit) == 1) {
            var g = formTab === "formLensID" ? me.getGridlens() : me.getGridframe();
            var recs = g.getStore().data.items;

            for (var i in recs) {
                klaimLama.push({
                    jenisPengobatanCode: formTab === "formLensID" ? "LENSA" : "FRAME",
                    year: recs[i].get("tanggal_klaim") ? recs[i].get("tanggal_klaim").getFullYear() : 0,
                    klaimPengobatanId: 0,
                    klaimValue: recs[i].get("claim_value")
                });
            }
        }
        
        var sysTools = new Hrd.library.system.Tools();
        var params = {
            klaimPengobatanId: null,
            jenisPengobatanCode: formTab === "formLensID" ? "LENSA" : "FRAME",
            nilaiKlaim: accounting.unformat(f.down("[name=total_klaim]").getValue()),
            plafon: plafonDefault,
            klaimLama: klaimLama,
            percentPengganti: accounting.unformat(f.down("[name=percent_pengganti]").getValue()),
            year: tanggal ? tanggal.getFullYear() : 0,
            currentKlaim: this.currentKlaim,
            /* resetYear: sysTools.resetTahunPlafon({
             hireDate: moment(emRec.get("hire_date")).toDate(),
             per: me.paramLimit,
             tahunKlaim: tanggal.getFullYear()
             }) */
        };

        var hp = null;
        /// jika periode klaim 1 tahun
        
        if (me.tools.intval(me.paramLimit) == 1) {
            console.log('ini');
            
            // added by Wulan Sari 2018.07.03
            if (me.employeeDetail) {
            console.log('ini2');
                params["saldoAwal"] = me.tools.floatval(me.employeeDetail["klaim_lensa_saldo_akhir"]);
                params["resetYear"] = me.tools.intval(me.employeeDetail["klaim_lensa_tahun_akhir"]);
                params["resetYearTanggal"] = me.employeeDetail["klaim_lensa_tanggal_akhir"]; // added by Wulan Sari 2018.07.03
                params["tanggalKlaim"] = Ext.util.Format.date(tanggal, 'Y-m-d');  // added by Wulan Sari 2018.07.03
                
            } else {
            console.log('ini2');
                params["saldoAwal"] = 0;
                params["resetYear"] = 0;
                params["resetYearTanggal"] = 0;  // added by Wulan Sari 2018.07.03
                params["tanggalKlaim"] = 0;  // added by Wulan Sari 2018.07.03
            }
            
            params["per"] = me.paramLimit;
            // end added by Wulan Sari 2018.07.03
            
            // update by Wulan Sari 2018.07.03
            hp = sysTools.hitungPlafonLensa(params); // sysTools.hitungPlafon(params);
                                    
        } else {
            console.log('iniini');
            if (me.employeeDetail) {
                params["saldoAwal"] = me.tools.floatval(me.employeeDetail["klaim_frame_saldo_akhir"]);
                params["resetYear"] = me.tools.intval(me.employeeDetail["klaim_frame_tahun_akhir"]);
                params["resetYearTanggal"] = me.employeeDetail["klaim_frame_tanggal_akhir"]; // added by Wulan Sari 2018.07.03
                params["tanggalKlaim"] = Ext.util.Format.date(tanggal, 'Y-m-d');  // added by Wulan Sari 2018.07.03
                
            } else {
                params["saldoAwal"] = 0;
                params["resetYear"] = 0;
                params["resetYearTanggal"] = 0;  // added by Wulan Sari 2018.07.03
                params["tanggalKlaim"] = 0;  // added by Wulan Sari 2018.07.03
            }
            
            params["per"] = me.paramLimit;
            
            // update by Wulan Sari 2018.07.03
            hp = sysTools.hitungPlafonBigFrame(params); // sysTools.hitungPlafonBig(params)

        }
        
        me.hitungPlafonResult = hp;

        f.down("[name=claim_value]").setValue(accounting.format(hp.claimValue));
        f.down("[name=amount_pengganti]").setValue(accounting.format(hp.amountPengganti));
        f.down("[name=total_total_klaim]").setValue(accounting.format(hp.totalKlaim));
        f.down("[name=saldo]").setValue(accounting.format(hp.saldo));

        // f.down("[name=plafon]").setValue(accounting.format(plafonDefault));
    },
    lensGridSelectionChange: function(selection, recs) {
        if (recs != undefined ){
            var me = this;
            me.recordGridSc(selection, recs);


            /* added by Wulan Sari*/
            this.currentKlaim = recs[0].get('claim_value');

            var tp = me.getFormdata().down("#tabPanelKacamataID");
            var jenisKlaim = tp.getActiveTab().title === "Lens" ? "LENSA" : "FRAME"; 
            me.tools.ajax({
                params: {
                    jenis: jenisKlaim,
                    employee_id: recs[0].get('employee_id')
                },
                success: function(data, model) {

                    var allJenis = data.jenispengobatan.data;

                    me.paramLimit = me.tools.intval(data.others[0][0]["PARAM_LIMIT"]);
                    me.persenAdd = me.tools.floatval(data.others[0][0]["PARAM_PERSENADD"]);
                    me.employeeDetail = null;
                    me.employeeDetail = data.employee.data;
                    console.log(me.employeeDetail);

                    var plafon = 0;
                    var percent = 0;



                    for (var i in allJenis) {
                        if (allJenis[i].code == jenisKlaim) {
                            percent = me.tools.floatval(allJenis[i].percent_value);
                        }
                    }

                    for (var i in allPlafons) {

                        if (allPlafons[i].plafonpengobatan.year == tglKlaim.getFullYear() &&
                                allPlafons[i].plafonpengobatan.group_group_id == groupId &&
                                allPlafons[i].jenispengobatan.code == jenisKlaim) {
                            plafon = me.tools.floatval(allPlafons[i].plafonpengobatan.value);
                        }
                    }


                    //console.log('set plafon ' + accounting.format(plafon));

                    formTab.down("[name=plafon]").setValue(accounting.format(plafon));
                    formTab.down("[name=percent_pengganti]").setValue(percent);
                }
            }).read('plafoninfo');
        }
        /* end added by Wulan Sari*/
        
    },
    frameGridSelectionChange: function(selection, recs) {
        if (recs != undefined || recs[0] != undefined){

            var me = this;
            me.recordGridSc(selection, recs);

            /* added by Wulan Sari*/
            this.currentKlaim = recs[0].get('claim_value');

            var tp = me.getFormdata().down("#tabPanelKacamataID");
            var jenisKlaim = tp.getActiveTab().title === "Lens" ? "LENSA" : "FRAME"; 
            me.tools.ajax({
                params: {
                    jenis: jenisKlaim,
                    employee_id: recs[0].get('employee_id')
                },
                success: function(data, model) {

                    var allJenis = data.jenispengobatan.data;

                    me.paramLimit = me.tools.intval(data.others[0][0]["PARAM_LIMIT"]);
                    me.persenAdd = me.tools.floatval(data.others[0][0]["PARAM_PERSENADD"]);
                    me.employeeDetail = null;
                    me.employeeDetail = data.employee.data;


                    var plafon = 0;
                    var percent = 0;



                    for (var i in allJenis) {
                        if (allJenis[i].code == jenisKlaim) {
                            percent = me.tools.floatval(allJenis[i].percent_value);
                        }
                    }

                    for (var i in allPlafons) {

                        if (allPlafons[i].plafonpengobatan.year == tglKlaim.getFullYear() &&
                                allPlafons[i].plafonpengobatan.group_group_id == groupId &&
                                allPlafons[i].jenispengobatan.code == jenisKlaim) {
                            plafon = me.tools.floatval(allPlafons[i].plafonpengobatan.value);
                        }
                    }


                    //console.log('set plafon ' + accounting.format(plafon));

                    formTab.down("[name=plafon]").setValue(accounting.format(plafon));
                    formTab.down("[name=percent_pengganti]").setValue(percent);
                }
            }).read('plafoninfo');
        }
        /* end added by Wulan Sari*/
        
    },
    recordGridSc: function(selection, recs) {
        var me = this;
        if (recs[0]) {
            var form = selection.view.up("form");
            form.loadRecord(recs[0]);
            me.getGrid().down("toolbar button[action=edit]").setDisabled(false);
            me.tools.formHelper(form).fixMoneyFormat(recs[0]);
        }
    },
    filterMainGrid: function() {
        var me = this;
        var fs = me.getFormsearch();
        var cb = fs.down("[name=department_department_id]");
        var s = me.getGrid().getStore();
        s.clearFilter(true);
        var val = cb.getValue();
        s.filterBy(function(rec, id) {

            if (rec.raw.department.department_id === val) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        var g = me.getGrid();
        g.getSelectionModel().setSelectionMode('SINGLE');
        me.getGridlens().getSelectionModel().setSelectionMode('SINGLE');
        me.getGridframe().getSelectionModel().setSelectionMode('SINGLE');
        p.setLoading("Loading components...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                p.setLoading(false);
                
                var fs = me.getFormsearch();
                me.fillFormDataComponents(data, fs);


                /// disable form data field
                me.disableForm();

                me.getGridlens().doInit();
                me.getGridframe().doInit();

            }
        }).read('detail');
    },
    disableForm: function(disable) {
        var me = this;
        var status = typeof disable === 'undefined' ? true : disable;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        for (var i in vs) {

            var el = f.down("[name=" + i + "]");
            if (el) {
                el.setReadOnly(status);
            }

        }
    },
    fillFormDataComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.department, f.down("[name=department_department_id]")).comboBox();
        //   me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
    },
    mainDataSave: function() {
        var me = this;
        var f = me.getFormdata();
    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();


        var x = {
            init: function() {


            },
            create: function() {
                
            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("klaimkacamata_id");

            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
            }
        };
        return x;
    },
    resetForm: function() {
        var me = this;
        var fl = me.getGridlens().up("form");
        var ff = me.getGridframe().up("form");
        me.tools.formHelper(fl).readOnly(true);
        me.tools.formHelper(ff).readOnly(true);

        ff.getForm().reset();
        fl.getForm().reset();
    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();


        var g = me.getGrid();
        g.down("toolbar button[action=edit]").setDisabled(true);
        me.resetForm();
        // f.editedRow = g.getSelectedRow();
        var rec = g.getSelectedRecord();
        if (!rec) {
            motherFunc();
            return;
        }
        f.loadRecord(rec);

        // set lens and frame grid
        var p = me.getPanel();
        var gl = me.getGridlens();
        var gf = me.getGridframe();
        p.setLoading("Loading lens and frame claim...");
        gl.getStore().loadData([], false);
        gf.getStore().loadData([], false);
        gl.getStore().loadPage(1, {
            params: {
                employee_employee_id: rec.get("employee_id")
            },
            callback: function(recs, op) {


                gl.attachModel(op);

                gf.getStore().loadPage(1, {
                    params: {
                        employee_employee_id: rec.get("employee_id")
                    },
                    callback: function(recsf, opf) {


                        gf.attachModel(opf);


                        motherFunc();
                    }
                });
            }
        });
        
        return false;
    },
    afterCallNew: function() {
        var me = this;



        me.disableForm(false);
        var g = me.getGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);
        me.newClaim();

    },
    newClaim: function() {


        var me = this;



        if (me.newClaimClicked) {
            return;
        }

        var sysTools = new Hrd.library.system.Tools();


        var hireDate = new Date();
        //hireDate.setFullYear(2011);

        /*
         console.log(sysTools.resetTahunPlafon({
         hireDate: hireDate,
         per: me.paramLimit,
         tahunKlaim: 2016
         }));
         */

        me.newClaimClicked = true;
        var f = me.getFormdata();
        var tp = f.down("#tabPanelKacamataID");




        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        f.down("[name=employee_name]").setReadOnly(true);
        f.down("[name=employee_nik]").setReadOnly(true);
        me.getGridlens().getSelectionModel().deselectAll();
        me.getGridframe().getSelectionModel().deselectAll();

        var tglKlaim = new Date();
        var jenisKlaim = tp.getActiveTab().title === "Lens" ? "LENSA" : "FRAME";        

        if (rec) {

            f.loadRecord(rec);

            var groupId = rec.get("group_group_id");




            /// load data plafon
            var p = me.getPanel();
            p.setLoading("Mengambil data plafon...");

            var formTab = tp.getActiveTab().title === "Lens" ? "formLensID" : "formFrameID";
            var formTab = f.down("#" + formTab);
            formTab.down("[name=tanggal_klaim]").setValue(tglKlaim);


            me.tools.ajax({
                params: {},
                success: function(datapg, model) {

                    var allPlafons = datapg;



                    me.tools.ajax({
                        params: {
                            jenis: jenisKlaim,
                            employee_id: rec.get("employee_id")
                        },
                        success: function(data, model) {

                            p.setLoading(false);

                            var allJenis = data.jenispengobatan.data;

                            me.paramLimit = me.tools.intval(data.others[0][0]["PARAM_LIMIT"]);
                            me.persenAdd = me.tools.floatval(data.others[0][0]["PARAM_PERSENADD"]);
                            me.employeeDetail = null;
                            me.employeeDetail = data.employee.data;


                            var plafon = 0;
                            var percent = 0;



                            for (var i in allJenis) {
                                if (allJenis[i].code == jenisKlaim) {
                                    percent = me.tools.floatval(allJenis[i].percent_value);
                                }
                            }
                            
                            for (var i in allPlafons) {

                                if (allPlafons[i].plafonpengobatan.year == tglKlaim.getFullYear() &&
                                        allPlafons[i].plafonpengobatan.group_group_id == groupId &&
                                        allPlafons[i].jenispengobatan.code == jenisKlaim) {
                                    plafon = me.tools.floatval(allPlafons[i].plafonpengobatan.value);
                                }
                            }


                            //console.log('set plafon ' + accounting.format(plafon));

                            formTab.down("[name=plafon]").setValue(accounting.format(plafon));
                            formTab.down("[name=percent_pengganti]").setValue(percent);


                        }
                    }).read('plafoninfo');


                }
            }).read('plafongolongan');





        } else {
            me.tools.alert.warning("Please select employee first");
            me.disableTBButtonsOnGrid(false);
        }

        me.disableFormFields(false);
        me.newClaimClicked = false;


    },
    loadDataPlafon: function(callback) {
        var me = this;

        var f = me.getFormdata();



        /// load data plafon
        var p = me.getPanel();
        p.setLoading("Mengambil data plafon...");

        var tp = f.down("#tabPanelKacamataID");
        var jenisKlaim = tp.getActiveTab().title === "Lens" ? "LENSA" : "FRAME";
        var g = me.getGrid();
        var rec = g.getSelectedRecord();

        var groupId = rec.get("group_group_id");


        var formTab = tp.getActiveTab().title === "Lens" ? "formLensID" : "formFrameID";
        var formTab = f.down("#" + formTab);

        var tglKlaim = formTab.down("[name=tanggal_klaim]").getValue();
        formTab.down("[name=tanggal_klaim]").setValue(tglKlaim);


        me.tools.ajax({
            params: {},
            success: function(datapg, model) {

                var allPlafons = datapg;



                me.tools.ajax({
                    params: {
                        jenis: jenisKlaim,
                        employee_id: rec.get("employee_id")
                    },
                    success: function(data, model) {

                        p.setLoading(false);

                        var allJenis = data.jenispengobatan.data;

                        me.paramLimit = me.tools.intval(data.others[0][0]["PARAM_LIMIT"]);
                        me.employeeDetail = null;
                        me.employeeDetail = data.employee.data;


                        var plafon = 0;
                        var percent = 0;



                        for (var i in allJenis) {
                            if (allJenis[i].code == jenisKlaim) {
                                percent = me.tools.floatval(allJenis[i].percent_value);
                            }
                        }

                        for (var i in allPlafons) {

                            if (allPlafons[i].plafonpengobatan.year == tglKlaim.getFullYear() &&
                                    allPlafons[i].plafonpengobatan.group_group_id == groupId &&
                                    allPlafons[i].jenispengobatan.code == jenisKlaim) {
                                plafon = me.tools.floatval(allPlafons[i].plafonpengobatan.value);
                            }
                        }




                        formTab.down("[name=plafon]").setValue(accounting.format(plafon));
                        formTab.down("[name=percent_pengganti]").setValue(percent);


                        if (typeof callback === "function") {
                            callback();
                        }


                    }
                }).read('plafoninfo');


            }
        }).read('plafongolongan');


    },
    disableFormFields: function(mode) {
        var me = this;
        var f = me.getFormdata();
        var frame = f.down("#formFrameID");
        var lens = f.down("#formLensID");
        lens.down("[name=tanggal_klaim]").setReadOnly(mode);
        lens.down("[name=total_klaim]").setReadOnly(mode);
        lens.down("[name=tipe_klaim_lensa]").setReadOnly(mode);
        lens.down("[name=status_bayar]").setReadOnly(mode);
        lens.down("[name=ki_minus]").setReadOnly(mode);
        lens.down("[name=ki_plus]").setReadOnly(mode);
        lens.down("[name=ki_silinder]").setReadOnly(mode);
        lens.down("[name=ka_minus]").setReadOnly(mode);
        lens.down("[name=ka_plus]").setReadOnly(mode);
        lens.down("[name=ka_silinder]").setReadOnly(mode);
        lens.down("[name=plafon]").setReadOnly(true);
        lens.down("[name=claim_value]").setReadOnly(true);
        lens.down("[name=percent_pengganti]").setReadOnly(true);
        lens.down("[name=amount_pengganti]").setReadOnly(true);
        lens.down("[name=total_total_klaim]").setReadOnly(true);
        lens.down("[name=saldo]").setReadOnly(true);

        //lens.down("[name=ukuran]").setReadOnly(mode);
        frame.down("[name=tanggal_klaim]").setReadOnly(mode);
        frame.down("[name=total_klaim]").setReadOnly(mode);
        frame.down("[name=status_bayar]").setReadOnly(mode);
        frame.down("[name=tanggal_kwitansi]").setReadOnly(mode);
        frame.down("[name=keterangan]").setReadOnly(mode);

    },
    cancelOnClick: function() {
        var me = this;
        var f = me.getFormdata();
        me.disableTBButtonsOnGrid(false);
        me.disableFormFields(true);
        f.down("[name=plafon]").setValue("");
        f.down("[name=percent_pengganti]").setValue("");

    },
    disableTBButtonsOnGrid: function(isCreate) {
        var me = this;
        var g = me.getGrid();
        g.down("toolbar button[action=save]").setDisabled(!isCreate);
        g.down("toolbar button[action=cancel]").setDisabled(!isCreate);
        g.down("toolbar button[action=create]").setDisabled(isCreate);
        g.down("toolbar button[action=edit]").setDisabled(isCreate);
    },
    saveOnClick: function() {
        var me = this;
        var f = null;
        var fm = me.getFormdata();
        console.log("savee...");

        var g = null;

        var activeTab = fm.down("tabpanel").getActiveTab();

        if (activeTab) {
            g = activeTab.down("grid");
            f = activeTab.down("form");
        }



        me.insSave({
            form: f,
            grid: g,
            // store: me.localStore["detail"].store,
            store: g.getStore(),
            finalData: function(data) {
                var tipeKlaim = activeTab.itemId === 'lensTabPanel' ? 'L' : 'F';
                data["tipe_klaim"] = tipeKlaim;
                data["employee_employee_id"] = fm.down("[name=employee_id]").getValue();
                data["total_klaim"] = accounting.unformat(data["total_klaim"]);

                /// hanya untuk klaim frame
                if (tipeKlaim === 'F') {
                    data["employee_klaim_frame_tahun_akhir"] = me.hitungPlafonResult.tahunReset;
                    data["employee_klaim_frame_tanggal_akhir"] = me.hitungPlafonResult.tahunResetTanggal;
                    data["employee_klaim_frame_saldo_akhir"] = me.hitungPlafonResult.saldo;
                }
                
                if (tipeKlaim === 'L') {
                    data["employee_klaim_lensa_tahun_akhir"] = me.hitungPlafonResult.tahunReset;
                    data["employee_klaim_lensa_tanggal_akhir"] = me.hitungPlafonResult.tahunResetTanggal;
                    data["employee_klaim_lensa_saldo_akhir"] = me.hitungPlafonResult.saldo;
                }

                console.log('data .. ');
                console.log(data);

                return data;
            },
            sync: true,
            successSaveFunc: function() {
                me.disableTBButtonsOnGrid(false);
                me.disableFormFields(true);
            },
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    editOnClick: function() {
        var me = this;
        var at = me.getFormdata().down("tabpanel").getActiveTab();
        if (at) {
            var f = at.down("form");
            me.tools.formHelper(f).readOnly(false);
            me.disableTBButtonsOnGrid(true);
            me.disableFormFields(false);

        }


    },
    deleteOnClick: function() {
        var me = this;
        var at = me.getFormdata().down("tabpanel").getActiveTab();
        if (at) {
            var g = at.down("grid");
            var rec = g.getSelectedRecord();
            if (rec) {
                Ext.Msg.show({
                    title: 'Confirm Delete',
                    msg: 'Are you sure you want to delete this record?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        if (clicked === "yes") {

                            me.confirmDeleteOnClick(g.getStore(), rec, me.getPanel().up("window"));
                        }
                    }
                });
            }
        } else {
            console.log("[DELETE] Tidak ada tab aktif");
        }


    },
    confirmDeleteOnClick: function(store, rec, window) {
        var me = this;

        var p = me.getPanel();
        p.setLoading("Deleting...");
        me.tools.ajax({
            params: {
                klaimkacamata_id: rec.get("klaimkacamata_id")
            },
            fail: function(msg, data) {

                p.setLoading(false);
            },
            success: function(data) {
                p.setLoading(false);

                me.tools.alert.info("Success Deleted!");
                
                store.remove(rec);
                me.resetForm();
                //me.gridSelectionChange();
                
            }
        }).process('delete');




        return true;


    }

});