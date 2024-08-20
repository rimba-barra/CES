Ext.define('Hrd.controller.Klaimpengobatan', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Klaimpengobatan',
    controllerName: 'klaimpengobatan',
    fieldName: 'klaimpengobatan_id',
    bindPrefixName: 'Klaimpengobatan',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.library.box.tools.DefaultConfigfdv',
        'Hrd.library.jofa.System', 'Hrd.library.box.tools.EventSelector2',
        'Hrd.library.box.tools.Tools', 'Hrd.library.box.tools.Report'],
    formWidth: 500,
    isMaximize: true,
    refs: [
        {
            ref: 'gridclaim',
            selector: 'klaimpengobatanclaimgrid'
        },
        {
            ref: 'formreport',
            selector: 'klaimpengobatanformprint'
        },
        {
            ref: 'formupload',
            selector: 'klaimpengobatanformupload'
        },
        {
            ref: 'formintranet',
            selector: 'klaimpengobatanformdataintranet'
        },
        {
            ref: 'formintranetkacamata',
            selector: 'klaimpengobatanformdataintranetkacamata'
        },
        {
            ref: 'formoptions',
            selector: 'klaimpengobatanformoptions'
        },
        {
            ref: 'gridintranet',
            selector: 'klaimpengobatangridbrowseintranet'
        },
        {
            ref: 'formpfams',
            selector: 'klaimpengobatanformpfams'
        },
        {
            ref: 'gridpfams',
            selector: 'klaimpengobatangridpfams'
        },
        {
            ref: 'formdatapfams',
            selector: 'klaimpengobatanformdatapfams'
        },
        {
            ref: 'griddatapfams',
            selector: 'klaimpengobatangriddatapfams'
        },
        {
            ref: 'formdatadeletepfams',
            selector: 'klaimpengobatanformdatadeletepfams'
        },
        {
            ref: 'griddatadeletepfams',
            selector: 'klaimpengobatangriddatadeletepfams'
        },

    ],
    localStore: {
        plafon: null
    },
    fieldDisabled: false,
    gridLoaded: false,
    mySystem: null,
    plafonKaryawanList: null,
    plafonGolonganList: null,
    plafonMap: null,
    report: null,
    uploadFotoKlik:0,
    rowintranet: null,
    persenAdd: 0.0,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        me.mySystem = new Hrd.library.jofa.System({
            cName: me.bindPrefixName,
            hasDetail: true,
            detailGridId: 'klaimpengobatanclaimgridID',
            comboBoxList: [{cbf: 'jenispengobatan', name: 'jenispengobatan_jenispengobatan_id'}],
            idProperty: 'klaimpengobatan_id'
        });
        var config = new Hrd.library.box.tools.DefaultConfigfdv({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
        me.comboBoxFields = new Hrd.template.ComboBoxFields();

    },
    init: function(config) {
        this.callParent(arguments);
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        var newEvs = {};
        var me = this;
        me.gridLoaded = false;
        me.report = new Hrd.library.box.tools.Report({
            cName: me.bindPrefixName
        });
        newEvs['klaimpengobatanformsearch [name=year]'] = {
            change: function(el, val) {
                me.getFormdata().down("[name=year]").setValue(val);
            }
        };
        newEvs['klaimpengobatanformdata [name=jenispengobatan_jenispengobatan_id]'] = {
            select: function(el, val) {
                // me.jenispengobatanOnChange(el, val);
                me.jenispengobatanOnChange(el, 0);
                me.hitungKlaim();
            }
        };
        newEvs['klaimpengobatanformdata [name=claim_date]'] = {
            change: function(el, val) {
                // me.claimDateOnChange(el, val);
                me.claimDateOnChange(el, 0);
            }
        };
        newEvs['klaimpengobatanformdata [name=total]'] = {
            blur: function(el, val) {
                // me.totalOnBlur_v2(el, val);
                me.totalOnBlur_v2(el,0);
            }
        };
        newEvs['klaimpengobatanformprint [action=print]'] = {
            click: function(el, val) {
                me.printOnClick();
            }
        };

        newEvs['klaimpengobatanformdata [name=claim_date]'] = {
            change: function(el, val) {
                // me.tanggalKlaimOnChange();
                me.tanggalKlaimOnChange(0);
            }
        };
        newEvs['klaimpengobatanformdata [name=dengan_keterangan]'] = {
            change: function() {
                me.tanggalKlaimOnChange();
                me.hitungKlaim();
            }
        };

        newEvs['klaimpengobatangrid toolbar button[action=upload]'] = {
            click: function () {
                var me;
                me = this;
                me.Formuploadshow();
            },
        };

        // UPLOAD

        newEvs['klaimpengobatanformupload #btnUpload'] = {
            click: function(el, val) {
                me.formUploadProcess();    
            }
        };
        newEvs['klaimpengobatanformupload #file_name_upload'] = {
            change: function(fld, a) {

                me.formUploadFoto(fld, a, 'mode');
            }
        };
        newEvs['klaimpengobatanformupload #view_file'] = {
            click: function(el, val) {
                me.viewFile();    
            }
        };

        newEvs['klaimpengobatanformupload #download_template'] = {
            click: function(el, val) {
                me.templateFile();    
            }
        };

        newEvs['klaimpengobatanformupload #download_template_b'] = {
            click: function(el, val) {
                me.templateFileB();    
            }
        };

        //BROWSE FROM INTRANET

        newEvs['klaimpengobatangrid toolbar button[action=browse]'] = {
            click: function () {
                var me;
                me = this;
                me.Formbrowseshow();
            },
        };

        newEvs['klaimpengobatanformoptions button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdata();
            }
        };
        newEvs['klaimpengobatanformoptions button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoption().getForm().reset();
                me.getDataintranet();
            }

        };

        newEvs['klaimpengobatanformoptions'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDataintranet();
            }
        };

        newEvs['klaimpengobatanformoptions button[action=cancel]'] = {
            click: function() {
                var me;
                me = this;
                me.getGrid().getStore().reload();
            }
        };

        newEvs['klaimpengobatanformdataintranet'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataAfterrender();
            },
        };
        newEvs['klaimpengobatanformdataintranet [action=view_file]'] = {
            click: function(el, val) {
                me.viewFileIntranet();    
            }

        };
        newEvs['klaimpengobatanformdataintranet [action=view_file1]'] = {
            click: function(el, val) {
                me.viewFile1Intranet();    
            }

        };
        newEvs['klaimpengobatanformdataintranet [action=view_file2]'] = {
            click: function(el, val) {
                me.viewFile2Intranet();    
            }

        };
        newEvs['klaimpengobatanformdataintranet [action=process]'] = {
            click: function(el, val) {
                me.processBrowse();    
            }

        };
        newEvs['klaimpengobatanformdataintranet [action=reject]'] = {
            click: function(el, val) {
                me.rejectBrowse();    
            }

        };
        newEvs['klaimpengobatanformdataintranet [name=total]'] = {
            blur: function(el, val) {
                // me.totalOnBlur_v2(el, val);
                me.totalOnBlur_v2(el,1);
            }
        };
        // newEvs['klaimpengobatanformdataintranet [name=amount_pengganti]'] = {
        //     blur: function(el, val) {
        //         me.totalOnBlur_amountpengganti(el,1);
        //     }
        // };
        newEvs['klaimpengobatanformdataintranet [name=claim_date]'] = {
            change: function(el, val) {
                
                me.tanggalKlaimOnChange_Intranet(1);
            }
        };
        // newEvs['klaimpengobatanformdataintranet [name=claim_date]'] = {
        //     change: function(el, val) {
        //         me.tanggalKlaimOnChange(1);
        //     }
        // };

        newEvs['klaimpengobatanformdataintranetkacamata'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataAfterrender();
            },
        };
        newEvs['klaimpengobatanformdataintranetkacamata [action=view_file]'] = {
            click: function(el, val) {
                me.viewFileIntranetKacamata();    
            }

        };
        newEvs['klaimpengobatanformdataintranetkacamata [action=process]'] = {
            click: function(el, val) {
                me.processKacamataBrowse();    
            }

        };
        newEvs['klaimpengobatanformdataintranetkacamata [action=reject]'] = {
            click: function(el, val) {
                me.rejectKacamataBrowse();    
            }

        };
        newEvs['klaimpengobatanformdataintranetkacamata [name=total]'] = {
            blur: function(el, val) {
                me = this;
                form = me.getFormintranetkacamata();
                jenispengobatan_id = form.down("[name=jenispengobatan_id]").getValue();

                if(jenispengobatan_id == 2){
                    type = 'F';
                    typetag = 'formFrameID';
                }

                if(jenispengobatan_id == 4){
                    type = 'L';
                    typetag = 'formLensID';
                }

                me.totalKlaimKacamataOnBlur(form.down("[name=total]").getValue(), typetag);

                if(jenispengobatan_id == 2){

                    me.loadDataPlafonKacamata(function() {
                        me.totalKlaimKacamataOnBlurFrame();
                    });
                }

                if(jenispengobatan_id == 4){

                    me.loadDataPlafonKacamata(function() {
                        me.totalKlaimKacamataOnBlurLensa();
                    });
                }
            }
        };

        newEvs['klaimpengobatanformoptions button[action=process]'] = {
            click: this.SaveIntranetToCES
        };
        newEvs['klaimpengobatanformoptions button[action=save]'] = {
            click: this.saveIntranettoStore
        };

        newEvs['klaimpengobatangridbrowseintranet actioncolumn'] = {
            click: this.gridIntranetActionColumnClick
        };

        newEvs['klaimpengobatanformoptions button[action=export]'] = {
            click: function () {
                var me;
                me = this;
                me.exportData();
            }
        };

        //process to FAMS

        newEvs['klaimpengobatangrid toolbar button[action=pfams]'] = {
            click: function () {
                var me;
                me = this;
                me.Formpfamsshow();
            },
        };

        newEvs['klaimpengobatanformpfams'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formPfamsAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDatapfams();
            }
        };

        newEvs['klaimpengobatanformpfams button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.FormDatapfamsshow();
            },
        };

        newEvs['klaimpengobatanformdatapfams'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataPfamsAfterrender();
            },
        };

        newEvs['klaimpengobatanformdatapfams button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.Processpfams();
            },
        };

        newEvs['klaimpengobatanformpfams button[action=delete]'] = {
            click: function () {
                var me;
                me = this;
                me.FormDataDeletepfamsshow();
            },
        };

        newEvs['klaimpengobatanformdatadeletepfams'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataDeletePfamsAfterrender();
            },
        };

        newEvs['klaimpengobatanformdatadeletepfams button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.CancelProcesspfams();
            },
        };

        newEvs['klaimpengobatanformpfams button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatapfams();
            }
        };
        newEvs['klaimpengobatanformpfams button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormpfams().getForm().reset();
                me.getDatapfams();
            }

        };
        



        this.control(newEvs);

        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});

    },
    printOnClick: function() {
        var me = this;
        me.report.processReport(me.getFormreport());
    },
    dataPrint: function() {

        var me = this;
        me.instantWindow("FormPrint", 600, "Print Report", "create", "printreport");
        return false;
    },
    Formuploadshow: function () {
        var me;
        me = this;

        me.tools.ajax({
            params: {
            },
            success: function (data, model) {
                console.log(data);

                if (data['others'][0][0]['MSG'] == 'success') {
                    me.instantWindow("FormUpload", 600, "Upload", "create", "klaimpengobatanformupload");
                } else {
                    me.tools.alert.warning(data['others'][0][0]['HASIL']);
                }
                
            }
        }).read('checkplafon');

        // me.instantWindow("FormUpload", 400, "Upload", "create", "klaimpengobatanformupload");
    },
    Formbrowseshow: function () {
        var me;
        me = this;

        me.instantWindow("FormOptions", 900, "Browse from Intranet", "formoptions", "klaimpengobatanformoptions");
      
    },
    
    hitungKlaim: function() {
        var me = this;
        var f = me.getFormdata();
        me.totalOnBlur_v2(f.down("[name=total]"),0);
    },
    totalOnBlur: function(el,is_return) {
        var me = this;
        var recEm = me.getGrid().getSelectedRecord();
        var f = me.getFormdata();
        var idKlaim = me.tools.intval(f.down("[name=klaimpengobatan_id]").getValue());


        var selectedPlafon = f.down("[name=jenispengobatan_jenispengobatan_id]").getValue();
        var v = el.getValuem();
        var plafon = f.down("[name=plafon]").getValuem();
        var saldoAwal = 0;
        var totalKlaimBefore = 0;
        var saldo = 0;
        var s = me.getGridclaim().getStore();
        var percent = me.tools.floatval(f.down("[name=percent_pengganti]").getValue());
        var klaimAfterPercent = 0;
        var fixKlaim = 0;
        var totalKlaimLama = 0;
        saldoAwal = plafon;


        var klaimCode = me.tools.comboHelper(f.down("[name=jenispengobatan_jenispengobatan_id]")).getField("jenispengobatan_id", "code");


        var klaimDate = f.down("[name=claim_date]").getValue();
        if (!klaimDate) {
            console.log("Tidak ada tanggal klaim");
            return;
        }
        var tahun = klaimDate.getFullYear();





        if (me.isKlaimHamilSalin(klaimCode)) {

            var klaimTerakhir = null; // klaim hamil salin 1 salin 2 terakhir


            /// jika klaim salin1 dan salin2 dan khusus perempuan
            if (me.isKlaimSalin(klaimCode) && recEm.get("sex") === "F" && me.getPlafonKaryawan(recEm.get("employee_id"), tahun, klaimCode) === 0) {

                return;
            }

            if (s.getCount() > 0) {

                s.each(function(rec) {

                    if (rec != null) {

                        if (me.isKlaimHamilSalin(rec.get("jenispengobatan_code"))) {





                            if (!klaimTerakhir) {
                                klaimTerakhir = rec;
                            }


                        }



                    }

                });
            }

            console.log(totalKlaimLama);

            /// jika ada klaim
            if (klaimTerakhir) {

                 // add on 20161129
                if (s.getCount() > 0) {

                    s.each(function(rec) {

                        if (rec != null) {

                          
                            /* mark on 2018 02 27
                              if (rec.get("jenispengobatan_jenispengobatan_id") === selectedPlafon
                                    && rec.get("year") === me.tools.intval(f.down("[name=year]").getValue())
                                    && rec.get("klaimpengobatan_id") != idKlaim) {
                                totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                            }
                              
                             */
                            if (rec.get("jenispengobatan_jenispengobatan_id") === selectedPlafon && rec.get("klaimpengobatan_id") != idKlaim) {
                                totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                            }
                            
                            

                        }

                    });
                  

                }

                // mark on 20161129
                /*
                 var tglKlaim = f.down("[name=claim_date]").getValue();
                 
                 
                 var now = moment(tglKlaim); //tgl klaim
                 var end = moment(klaimTerakhir.get("claim_date")); //tanggal terakhir klaim
                 var duration = moment.duration(now.diff(end));
                 var days = duration.asDays();
                 
                 
                 
                 
                 
                 if (me.isKlaimSalin(klaimTerakhir.get("jenispengobatan_code"))) {
                 totalKlaimLama = 0;
                 } else {
                 if(klaimTerakhir.get("jenispengobatan_code")===klaimCode){
                 totalKlaimLama = me.tools.floatval(klaimTerakhir.get("total_klaim"));
                 }
                 
                 }
                 */

                // /mark on 20161129
            }


        } else {
            if (s.getCount() > 0) {

                s.each(function(rec) {

                    if (rec != null) {

                 

                        if (rec.get("jenispengobatan_jenispengobatan_id") === selectedPlafon
                                && rec.get("year") === me.tools.intval(f.down("[name=year]").getValue())
                                && rec.get("klaimpengobatan_id") != idKlaim) {
                            totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                        }

                    }

                });
            }




        }
        // looping grid claim 
        

        console.log(totalKlaimLama);

        saldoAwal = plafon - totalKlaimLama;

        if (saldoAwal === 0) {
            me.tools.alert.warning("Saldo 0. Tidak bisa melakukan klaim.");
            return;
        }



        klaimAfterPercent = ((percent / 100) * v);
        if (klaimAfterPercent > saldoAwal) {
            fixKlaim = saldoAwal;
        } else {
            fixKlaim = klaimAfterPercent;
        }
        saldo = saldoAwal - fixKlaim;
        el.setValuem(v);

        f.down("[name=claim_value]").setValuem(fixKlaim);
        f.down("[name=amount_pengganti]").setValuem(klaimAfterPercent);
        f.down("[name=saldo]").setValuem(saldo);
        f.down("[name=total_klaim]").setValuem((saldoAwal - saldo) + totalKlaimLama);
        
    },
    totalOnBlur_amountpengganti: function(el,is_return){
        var me = this;
        var f = me.getFormintranet();
        var plafon = f.down("[name=plafon]").getValuem();
        var amount_pengganti = f.down("[name=amount_pengganti]").getValuem();

        if(amount_pengganti >= plafon){
            // alert('lebih besar');
            f.down("[name=claim_value]").setValuem(plafon);
            f.down("[name=total_klaim]").setValuem(plafon);
        }else{
            // alert('lebih kecil');
            f.down("[name=claim_value]").setValuem(amount_pengganti);
            f.down("[name=total_klaim]").setValuem(amount_pengganti);
        }


    },
    totalOnBlur_v2: function(el,is_return) {
        
        var me = this;
        var recEm = me.getGrid().getSelectedRecord();
        var f = me.getFormdata();
        var idKlaim = me.tools.intval(f.down("[name=klaimpengobatan_id]").getValue());
        
        var selectedPlafon = f.down("[name=jenispengobatan_jenispengobatan_id]").getValue();
        var v = el.getValuem();
        var plafon = f.down("[name=plafon]").getValuem();
        var saldoAwal = 0;
        var totalKlaimBefore = 0;
        var saldo = 0;
        var s = me.getGridclaim().getStore();
        var percent = me.tools.floatval(f.down("[name=percent_pengganti]").getValue());
        var klaimAfterPercent = 0;
        var fixKlaim = 0;
        var totalKlaimLama = 0;
        saldoAwal = plafon;
        
        //console.log('selectedPlafon ' + selectedPlafon);
        
        var klaimCode = me.tools.comboHelper(f.down("[name=jenispengobatan_jenispengobatan_id]")).getField("jenispengobatan_id", "code");
        
        //console.log('klaimCode ' + klaimCode);
        
        /*
        Karyawan Pria
        saat pilih jenis klaim keguguran, potongnya ke plafon SALIN1
        */
        if (recEm.get("sex") === "M" && klaimCode === 'KEGUGURAN') {            
            klaimCode = 'SALIN1';    
            selectedPlafon = 8;            
            me.jenispengobatanOnChange_2(selectedPlafon, klaimCode); 
        }
        
        /*
        Karyawan Wanita
        saat pilih jenis klaim keguguran
        kalau dengan keterangan  : masuk ke plafon SALIN1
        kalau tidak dengan keterangan : masuk ke plafon HAMIL
        */
        if (recEm.get("sex") === "F" && klaimCode === 'KEGUGURAN') {            
            var dengan_keterangan = f.down("[name=dengan_keterangan]").getValue();            
            if(dengan_keterangan){                
                klaimCode = 'SALIN1';
                selectedPlafon = 8;               
            } else {                
                klaimCode = 'HAMIL';
                selectedPlafon = 3;             
            }
            me.jenispengobatanOnChange_2(selectedPlafon, klaimCode);
        }
        
        //console.log('klaimCode ' + klaimCode);
               
        
        var klaimDate = f.down("[name=claim_date]").getValue();
        if (!klaimDate) {
            console.log("Tidak ada tanggal klaim");
            return;
        }
        var tahun = klaimDate.getFullYear();


        if (me.isKlaimHamilSalin(klaimCode)) {

            var klaimTerakhir = null; // klaim hamil salin 1 salin 2 terakhir

            if (s.getCount() > 0) {

                s.each(function(rec) {

                    if (rec != null) {

                        if (me.isKlaimHamilSalin(rec.get("jenispengobatan_code"))) {


                            if (!klaimTerakhir) {
                                klaimTerakhir = rec;
                            }


                        }



                    }

                });
            }

            //console.log(' totalKlaimLama ' + totalKlaimLama);

            /// jika ada klaim
            if (klaimTerakhir) {
                
                var count = s.getCount() - 1;
                var ind = count;
                
                for(ind == ind; ind >= 0; ind--){
                    rec = s.getAt(ind);
                    
                    if (rec != null) {

                        if (rec.get("jenispengobatan_jenispengobatan_id") === selectedPlafon && rec.get("klaimpengobatan_id") != idKlaim) {
                            totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                        } else if(rec.get("klaimpengobatan_id") != idKlaim) {

                            var dengan_keterangan = f.down("[name=dengan_keterangan]").getValue();  
                            if(klaimCode == 'SALIN1' && recEm.get("sex") === "M" && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21) {                                        
                                totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                            } else if(klaimCode == 'SALIN1' && recEm.get("sex") === "F" && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21 && dengan_keterangan) {                                    
                                totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                            } else if(klaimCode == 'HAMIL' && recEm.get("sex") === "F" && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21 && !dengan_keterangan) {                                    
                                totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                            }

                        }
                        
                        // jika sedang memakai plafon hamil dan sudah ada klaim keguguran maka plafon kembali utuh
                        if (me.tools.intval(selectedPlafon) === 3 && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21) {
                            totalKlaimLama = 0;
                        }
                        
                        // jika sedang memakai plafon hamil dan sudah ada klaim salin1 maka plafon kembali utuh
                        if (me.tools.intval(selectedPlafon) === 3 && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 8) {
                            totalKlaimLama = 0;

                        }
                                                
                        // jika sedang memakai plafon salin1 dan sudah ada klaim keguguran maka plafon kembali utuh
                        if (me.tools.intval(selectedPlafon) === 8 && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21) {
                            totalKlaimLama = 0;
                        }
                        
                        // jika sedang memakai plafon salin1 dan sudah ada klaim salin1 maka plafon kembali utuh
                        if (me.tools.intval(selectedPlafon) === 8 && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 8) {
                            totalKlaimLama = 0;
                        }
                        
                        
                    }

                }
                
                
                /*
                if (s.getCount() > 0) {

                    s.each(function(rec) {

                        if (rec != null) {

                            if (rec.get("jenispengobatan_jenispengobatan_id") === selectedPlafon && rec.get("klaimpengobatan_id") != idKlaim) {
                                totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                            } else if(rec.get("klaimpengobatan_id") != idKlaim) {
                                
                                var dengan_keterangan = f.down("[name=dengan_keterangan]").getValue();  
                                if(klaimCode == 'SALIN1' && recEm.get("sex") === "M" && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21) {                                        
                                    totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                                } else if(klaimCode == 'SALIN1' && recEm.get("sex") === "F" && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21 && dengan_keterangan) {                                    
                                    totalKlaimLama += me.tools.floatval(rec.get("claim_value"));
                                    
                                } else if(klaimCode == 'HAMIL' && recEm.get("sex") === "F" && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21 && !dengan_keterangan) {                                    
                                    totalKlaimLama += me.tools.floatval(rec.get("claim_value"));
                                    
                                }
                                
                            }
                            
                            if (me.tools.intval(selectedPlafon) === 3 && me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id")) === 21) {
                                totalKlaimLama = 0;
                                console.log('reset ' + totalKlaimLama);

                            }
                            
                                console.log('new ' + totalKlaimLama);
                        }

                    });
                  

                }
                */

            }


        } else {
            if (s.getCount() > 0) {

                s.each(function(rec) {

                    if (rec != null) {
                 

                        if (rec.get("jenispengobatan_jenispengobatan_id") === selectedPlafon
                                && rec.get("year") === me.tools.intval(f.down("[name=year]").getValue())
                                && rec.get("klaimpengobatan_id") != idKlaim) {
                            totalKlaimLama += me.tools.floatval(rec.get("claim_value"));

                        }

                    }

                });
            }




        }
        // looping grid claim 
        

        console.log('totalKlaimLama ' + totalKlaimLama);

        saldoAwal = plafon - totalKlaimLama;

        if (saldoAwal === 0) {
            me.tools.alert.warning("Saldo 0. Tidak bisa melakukan klaim.");
            return;
        }



        klaimAfterPercent = ((percent / 100) * v);
        if (klaimAfterPercent > saldoAwal) {
            fixKlaim = saldoAwal;
        } else {
            fixKlaim = klaimAfterPercent;
        }
        saldo = saldoAwal - fixKlaim;
        el.setValuem(v);
        console.log('klaimAfterPercent ' + klaimAfterPercent);
        f.down("[name=claim_value]").setValuem(fixKlaim);
        f.down("[name=amount_pengganti]").setValuem(klaimAfterPercent);
        f.down("[name=saldo]").setValuem(saldo);
        f.down("[name=total_klaim]").setValuem((saldoAwal - saldo) + totalKlaimLama);

        //added by michael 2022-12-15 | saat dambil data dari intranet
        if(is_return == 1){
            form = me.getFormintranet();
            setTimeout(function(){  

                            form.down("[name=plafon]").setValuem(f.down("[name=plafon]").getValue());
                            form.down("[name=percent_pengganti]").setValue(f.down("[name=percent_pengganti]").getValue());
                            form.down("[name=amount_pengganti]").setValuem(f.down("[name=amount_pengganti]").getValue());
                            form.down("[name=claim_value]").setValuem(f.down("[name=claim_value]").getValue());
                            form.down("[name=total_klaim]").setValuem(f.down("[name=total_klaim]").getValue());
                            form.down("[name=saldo]").setValuem(f.down("[name=saldo]").getValue());
                            form.down("[name=year]").setValue(f.down("[name=year]").getValue());
                        }, 100);
        }
        
    },
    isKlaimHamilSalin: function(kodeKlaim) {
        if (kodeKlaim === "SALIN1" || kodeKlaim === "SALIN2") { /*  || kodeKlaim === "HAMIL"*/
            return true;
        }
        return false;
    },
    isKlaimSalin: function(kodeKlaim) {
        if (kodeKlaim === "SALIN1" || kodeKlaim === "SALIN2") {
            return true;
        }
        return false;
    },
    tanggalKlaimOnChange: function(is_return) {
        var me = this;
        var f = me.getFormdata();
        // me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"));
        me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"),0);

        // if(is_return == 1){
        //     var v = me.getFormintranet().down("[name=claim_date]").getValue();
        //     if (v) {
        //         var y = v.getFullYear();
        //         me.getFormdata().down("[name=year]").setValue(y);
        //         me.getFormintranet().down("[name=year]").setValue(y);
        //         me.getFormdata().down("[name=claim_date]").setValue();
        //     }
        // }
    },
    tanggalKlaimOnChange_Intranet: function(is_return) {
        var me = this;
        var f = me.getFormdata();
        // me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"));
        // me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"),0);

        if(is_return == 1){
            var v = me.getFormintranet().down("[name=claim_date]").getValue();
            if (v) {
                var y = v.getFullYear();
                me.getFormdata().down("[name=year]").setValue(y);
                me.getFormintranet().down("[name=year]").setValue(y);
                me.getFormdata().down("[name=claim_date]").setValue(v);
                me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"),1);
            }
        }
    },
    // jenispengobatanOnChange: function(el) {
    jenispengobatanOnChange: function(el,is_return) {
        
        var me = this;
        var f = me.getFormdata();
        f.down("[name=plafon]").setValue(0.00);
        f.down("[name=percent_pengganti]").setValue(0);

        var klaimDate = f.down("[name=claim_date]").getValue();
        if (!klaimDate) {
            console.log("Tidak ada tanggal klaim");
            return;
        }
        var tahun = klaimDate.getFullYear();
        f.down("[name=year]").setValue(tahun);

        var jpCode = me.tools.comboHelper(el).getField("jenispengobatan_id", "code"); // jenis pengobatan code
        
        if(jpCode === 'KEGUGURAN'){
            f.down("[name=dengan_keterangan]").show();
        } else{
            f.down("[name=dengan_keterangan]").hide();  
            f.down("[name=dengan_keterangan]").setValue(false);        
        }
        

        if (el.getValue()) {

            f.down("[name=jenispengobatan_jenispengobatan]").setValue(me.tools.comboHelper(el).getText(me.comboBoxFields.jenispengobatan));
            f.down("[name=percent_pengganti]").setValue(me.tools.floatval(me.tools.comboHelper(el).getField("jenispengobatan_id", "percent_value")));
            /// load plafon value by employee and type
            var rec = me.getGrid().getSelectedRecord();
            var emId = rec.get("employee_id");

            // check jika ada di plafon golongan
            if (me.plafonGolonganList) {
                var plafons = me.plafonGolonganList.data;
                var employeeRec = me.getGrid().getSelectedRecord();
                var groupId = employeeRec.get("group_group_id");
                // var tahun = me.tools.intval(f.down("[name=year]").getValue());

                var jenisPengobatanId = me.tools.intval(el.getValue());
                if (employeeRec) {


                    for (var i in plafons) {
                        //  console.log(plafons[i]);
                        //  console.log(groupId,tahun,jenisPengobatanId);
                        if (plafons[i]['group_group_id'] === groupId
                                && plafons[i]['year'] === tahun
                                && plafons[i]['jenispengobatan_jenispengobatan_id'] === jenisPengobatanId) {
                            
                            //console.log('Plafon ' + plafons[i]["value"]);
                            f.down("[name=plafon]").setValuem(plafons[i]["value"]);
                        }
                    }

                }



            }



            // check jika ada di plafon karyawan
            var plafonValue = me.getPlafonKaryawan(emId, tahun, jpCode);
            console.log('plafonValue ' + plafonValue);
            if (plafonValue > 0) {
                f.down("[name=plafon]").setValuem(plafonValue);
            }

            
            // Start Added by Wulan Sari 2018.07.02 
            
            var klaimCode = jpCode;
            var recEm = me.getGrid().getSelectedRecord();
            /*
            Karyawan Pria
            saat pilih jenis klaim keguguran, potongnya ke plafon SALIN1
            */
            if (recEm.get("sex") === "M" && klaimCode === 'KEGUGURAN') {            
                klaimCode = 'SALIN1';    
                selectedPlafon = 8;            
                me.jenispengobatanOnChange_2(selectedPlafon, klaimCode); 
            }

            /*
            Karyawan Wanita
            saat pilih jenis klaim keguguran
            kalau dengan keterangan  : masuk ke plafon SALIN1
            kalau tidak dengan keterangan : masuk ke plafon HAMIL
            */
            if (recEm.get("sex") === "F" && klaimCode === 'KEGUGURAN') {            
                var dengan_keterangan = f.down("[name=dengan_keterangan]").getValue();            
                if(dengan_keterangan){                
                    klaimCode = 'SALIN1';
                    selectedPlafon = 8;               
                } else {                
                    klaimCode = 'HAMIL';
                    selectedPlafon = 3;             
                }
                me.jenispengobatanOnChange_2(selectedPlafon, klaimCode);
            }

            console.log('klaimCode ' + klaimCode);    
            
            // End Added by Wulan Sari 2018.07.02

            //added by michael 2022-12-15 | saat dambil data dari intranet
            if(is_return == 1){
                form = me.getFormintranet();
                setTimeout(function(){  

                            form.down("[name=plafon]").setValuem(f.down("[name=plafon]").getValue());
                            form.down("[name=percent_pengganti]").setValue(f.down("[name=percent_pengganti]").getValue());
                            form.down("[name=amount_pengganti]").setValuem(f.down("[name=amount_pengganti]").getValue());
                            form.down("[name=claim_value]").setValuem(f.down("[name=claim_value]").getValue());
                            form.down("[name=total_klaim]").setValuem(f.down("[name=total_klaim]").getValue());
                            form.down("[name=saldo]").setValuem(f.down("[name=saldo]").getValue());
                            form.down("[name=year]").setValue(f.down("[name=year]").getValue());
                        }, 100);
            }

        }


    },
    jenispengobatanOnChange_2: function(jenispengobatan_id, code) {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=plafon]").setValue(0.00);
        f.down("[name=percent_pengganti]").setValue(0);

        var klaimDate = f.down("[name=claim_date]").getValue();
        if (!klaimDate) {
            console.log("Tidak ada tanggal klaim");
            return;
        }
        var tahun = klaimDate.getFullYear();
        f.down("[name=year]").setValue(tahun);

        var jpCode = code; // jenis pengobatan code

        // Hamil 3
        // Salin1 8
        
        if (jenispengobatan_id) {
            
            var s = f.down("[name=jenispengobatan_jenispengobatan_id]").getStore();
            var index = s.findExact('jenispengobatan_id', me.tools.intval(jenispengobatan_id));
            
            var percent_value = 0;
            if (index >= 0) {
                percent_value = s.getAt(index).get('percent_value');
            }
            
            f.down("[name=percent_pengganti]").setValue(percent_value);
            
            /// load plafon value by employee and type
            var rec = me.getGrid().getSelectedRecord();
            var emId = rec.get("employee_id");
             
            
            // check jika ada di plafon golongan
            if (me.plafonGolonganList) {
                var plafons = me.plafonGolonganList.data;
                var employeeRec = me.getGrid().getSelectedRecord();
                var groupId = employeeRec.get("group_group_id");

                var jenisPengobatanId = me.tools.intval(jenispengobatan_id);
                if (employeeRec) {


                    for (var i in plafons) {
                        //  console.log(plafons[i]);
                        //  console.log(groupId,tahun,jenisPengobatanId);
                        if (plafons[i]['group_group_id'] === groupId
                                && plafons[i]['year'] === tahun
                                && plafons[i]['jenispengobatan_jenispengobatan_id'] === jenisPengobatanId) {
                            
                            //console.log('Plafon ' + plafons[i]["value"]);
                            f.down("[name=plafon]").setValuem(plafons[i]["value"]);
                        }
                    }

                }



            }




            // check jika ada di plafon karyawan
            var plafonValue = me.getPlafonKaryawan(emId, tahun, jpCode);
            if (plafonValue > 0) {
                f.down("[name=plafon]").setValuem(plafonValue);
            }



        }


    },
    /*@params emId = employeee id,tahun = tahun klaim,jpCode = kode jenis pengobatan*/

    getPlafonKaryawan: function(emId, tahun, jpCode) {
        var me = this;
        var plafonValue = 0;
        if (me.plafonKaryawanList) {
            var plafons = me.plafonKaryawanList.data;

            console.log(plafons);

            for (var i in plafons) {

                if (plafons[i]['employee_employee_id'] === emId && plafons[i]['year'] === tahun) {

                    var plafonName = me.plafonMap[jpCode];

                    plafonValue = plafons[i][plafonName];




                    //if (plafonValue > 0) {
                    //f.down("[name=plafon]").setValuem(plafons[i][plafonName]);
                    // }


                }
            }
        }
        return plafonValue;

    },
    claimDateOnChange: function(el, is_return) {
        var me = this;
        var v = el.getValue();
        if (v) {
            var y = v.getFullYear();
            me.getFormdata().down("[name=year]").setValue(y);
        }

        if(is_return == 1){
            me.getFormdata().down("[name=year]").setValue(y);
            me.getFormintranet().down("[name=year]").setValue(y);
        }

    },
    /*@override 06 Jan 2015*/
    loadPage: function(store) {
        var me = this;
        store.loadPage(1, {
            callback: function(rec, operation, success) {
                if (!me.getGrid().getStore().modelExist) {
                    me.getGrid().attachModel(operation);
                    me.getPanel().setLoading(false);
                    me.mySystem.afterGridLoad();
                }

            }
        });


    },
    formDataAfterRender: function(el) {
        return false;
    },
    panelAfterRender: function(el) {

        this.callParent(arguments);

        this.mySystem.panelAfterRender(el);
        this.getPanel().setLoading(false);


    },
    // override 7 jan 2015        
    gridSelectionChange: function() {
        return false;
    },
    execAction: function(el, action, me) {
        return false;
    },
    disabledFields: function(isDisable) {
        var me = this;
        var f = me.getFormdata();
        if (me.fieldDisabled !== isDisable) {
            var vs = f.getForm().getValues();
            for (var i in vs) {
                var el = f.down("[name=" + i + "]");

                if (el && !el.stayReadOnly) {
                    el.setReadOnly(isDisable);
                }
            }
            me.fieldDisabled = isDisable;
        }

        f.down("[name=plafon]").setReadOnly(true);
        f.down("[name=jenispengobatan_jenispengobatan]").setReadOnly(true);
        f.down("[name=total_klaim]").setReadOnly(true);
        f.down("[name=saldo]").setReadOnly(true);
        f.down("[name=percent_pengganti]").setReadOnly(true);
        f.down("[name=amount_pengganti]").setReadOnly(true);
        f.down("[name=claim_value]").setReadOnly(true);
        f.down("[name=addon]").setReadOnly(true);
    },
    fixMoneyFields: function(f) {
        f.down("[name=plafon]").setValuem(f.down("[name=plafon]").getValue());
        f.down("[name=total]").setValuem(f.down("[name=total]").getValue());
        f.down("[name=claim_value]").setValuem(f.down("[name=claim_value]").getValue());
        f.down("[name=amount_pengganti]").setValuem(f.down("[name=amount_pengganti]").getValue());
        f.down("[name=total_klaim]").setValuem(f.down("[name=total_klaim]").getValue());
        f.down("[name=saldo]").setValuem(f.down("[name=saldo]").getValue());
    },
    // added 7 Jan 2015
    // add this menthod if use Jofa system
    sysfunc: function() {
        var me = this;
        var x = {
            gridSelectionChange: function() {
                if (!me.gridLoaded) {
                    return false;
                }

                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    me.getFormdata().down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
                }
                var p = me.getPanel();
                p.setLoading("Loading Claim");
                var gc = me.getGridclaim();
                var s = gc.getStore();
                var f = me.getFormdata();
                s.loadData([], false);
                s.loadPage(1, {
                    params: {
                        employee_employee_id: f.down("[name=employee_employee_id]").getValue(),
                        year: f.down("[name=year]").getValue()
                    },
                    callback: function(rec, operation, success) {
                        console.log(rec);
                        console.log(operation);
                        console.log(success);
                        if (!s.modelExist) {
                            gc.attachModel(operation);
                        }

                        /// select one record
                        if (me.getGridclaim().getStore().getCount() > 0) {
                            me.getGridclaim().getSelectionModel().select(0);

                            var f = me.getFormdata();
                            f.loadRecord(me.getGridclaim().getSelectedRecord());

                            me.fixMoneyFields(f);

                        }

                        p.setLoading(false);

                        me.gridLoaded = true;


                    }
                });



                /// disable form fields
                me.disabledFields(true);

            },
            clickNew: function(rec) {
                var f = me.getFormdata();
                f.down("[name=employee_employee_id]").setValue(rec.get('employee_id'));
                f.down("[name=claim_date]").setValue(new Date());
                f.down("[name=kwitansi_date]").setValue(new Date());

                f.down("[name=addon]").setValue(new Date());

                /// disable form fields
                me.disabledFields(false);
                me.getGridclaim().getSelectionModel().deselectAll();


            },
            clickEdit: function() {
                me.disabledFields(false);
                return false;
            },
            gridDetailSelectionChange: function() {
                me.fixMoneyFields(me.getFormdata());
                return false;
            },
            clickCancel: function() {
                me.disabledFields(true);
            },
            detailReadLoaded: function(data) {
                me.plafonGolonganList = data.plafonpengobatan;
                me.plafonKaryawanList = data.plafonkaryawan;
                me.plafonMap = data['others'][0][0]['PLAFONMAP'];

                var f = me.getFormdata();
                var sr = me.getGridclaim().getSelectedRecord();
                if (sr) {
                    f.loadRecord(sr);
                    me.fixMoneyFields(f);
                }



            },
            getParams: function(modeRead) {
                var params = {};
                switch (modeRead) {
                    case 'detailRead':
                        params = {
                            year: 2015
                        };
                        break;
                }
                return params;
            }
        };
        return x;
    },
    formDataShow: function(el, act, action) {
        return false;
    },
    formUploadFoto: function(fld, a, mode) {
        var me = this;

        if (me.uploadFotoKlik === 0) {
            var me = this;
            var form = me.getFormupload();
            var p = form.up("window");

            // var vs = form.getValues();
            // var choose = vs["upload_type"];
            me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": 'dokumen', 
                    // 'choose': choose
                  //  "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                   // "employee_id":me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {
                        p.setLoading(false);
                        //console.log(fn);
                      //  me.refreshPhotoInfo(fn);
                        me.uploadFotoKlik = 0;
                        form.down("[name=file_name_upload]").setValue(fn);
                        form.down("[name=file_name_show]").show();
                        form.down("[name=file_name_show]").setValue(fn);
                        form.down("#view_file").show();
                        console.log(fn);

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        p.setLoading(false);
                    }
                }
            });
            
            me.uploadFotoKlik = 1;
        }


    },
    viewFile:function(){
       var me = this;
       var f = me.getFormupload();
       var vs = f.getValues();
       var fileName = f.down("[name=file_name_show]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    templateFile:function(){
        var me = this;
        var f = me.getFormupload();
        var vs = f.getValues();
        var fileName = 'claim_templateA_sept2022';
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/template/"+fileName+".xlsx");
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    templateFileB:function(){
        var me = this;
        var f = me.getFormupload();
        var vs = f.getValues();
        var fileName = 'claim_templateB_sept2022';
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/template/"+fileName+".xlsx");
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    formUploadProcess: function () {
        var me, grid, store;
        me = this;
        var form = me.getFormupload();
        var p = me.getPanel();

        var fn = '';

        if(form.down('[name=file_name_show]').getValue() == '' || form.down('[name=file_name_show]').getValue() == null){
            me.tools.alert.warning("Upload File is required");
            return false;
        } else {
           fn = form.down("[name=file_name_show]").getValue();
        }
        form.setLoading('Please wait...');
        me.tools.ajax({
            params: {
                file_name: fn
            },
            success: function (data, model) {
                console.log(data);
                form.setLoading(false);
                form.up('window').close();
                if (data['others'][0][0]['MSG'] == 'Success') {
                    me.tools.alert.info("Success");
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                
                //reload
                if (!me.gridLoaded) {
                    return false;
                }

                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    me.getFormdata().down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
                }
                var p = me.getPanel();
                p.setLoading("Loading Claim");
                var gc = me.getGridclaim();
                var s = gc.getStore();
                var f = me.getFormdata();
                s.loadData([], false);
                s.loadPage(1, {
                    params: {
                        employee_employee_id: f.down("[name=employee_employee_id]").getValue(),
                        year: f.down("[name=year]").getValue()
                    },
                    callback: function(rec, operation, success) {
                        console.log(rec);
                        console.log(operation);
                        console.log(success);
                        if (!s.modelExist) {
                            gc.attachModel(operation);
                        }

                        /// select one record
                        if (me.getGridclaim().getStore().getCount() > 0) {
                            me.getGridclaim().getSelectionModel().select(0);

                            var f = me.getFormdata();
                            f.loadRecord(me.getGridclaim().getSelectedRecord());

                            me.fixMoneyFields(f);

                        }

                        p.setLoading(false);

                        me.gridLoaded = true;


                    }
                });



                /// disable form fields
                me.disabledFields(true);
            }
        }).read('uploadexcel');
        
    },
    getFilterdata: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptions();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }

        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.hrd_check == undefined) {
            formvalue['hrd_check'] = 'NO';
        } else {
            formvalue['hrd_check'] = formvalue.hrd_check;
        }

        grid = me.getGridintranet();
        grid.doInit();

       
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filterintranet',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(formvalue),
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    getDataintranet: function (flag) {
        this.getFilterdata();

    },
    viewFile:function(){
        var me = this;
        var f = me.getFormdataintranet();
        var fileName = f.down("[name=attachment]").getValue();
        if(fileName.length > 0){
            window.open(document.URL+"app/hrd/uploads/claim/uploadfile/"+fileName);
              
        }else{
            me.tools.alert.warning("Tidak ada file");
        }
    },
    // gridIntranetActionColumnClick: function (view, cell, row, col, e) {
    //     var me, grid, record, row, action;
    //     me = this;
    //     grid = me.getGridintranet();
    //     record = grid.getStore().getAt(row);
    //     action = e.getTarget().className.match(/\bact-(\w+)\b/);
    //     grid.getSelectionModel().select(row);
    //     if (action) {
    //         switch (action[1]) {
    //             case 'update':
    //                 me.rowintranet = record;
    //                 me.instantWindow("FormDataIntranet", 900, "FORM DATA", "options", "klaimpengobatanformdataintranet");
    //                 break;
    //         }
    //     }
    // },
    saveIntranettoStore: function () {
        var me, form, formdata, grid, store, record, row;
        me = this;
        form = me.getFormdataintranet();
        formdata = form.getForm();
        if (formdata.isValid()) {
            grid = me.getGridintranet();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();
            me.getFormdataintranet().el.mask('Data in Intranet will be update, please wait...', 'x-mask-loading');
            me.tools.ajax({
                params: {"paramdata": Ext.JSON.encode(row), configintranet: me.configintranet},
                success: function (data, model) {
                    me.getFormdataintranet().el.unmask();
                    form.up('window').close();
                }
            }).read('updateintranetinchange');
        }
    },
    SaveIntranetToCES: function () {
        alert('a');
        var me, form, grid, store, rows, arraydata, status, msg, index, dataarray;
        me = this;
        grid = me.getGridintranet();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'APPROVE'){
                Ext.Msg.alert('Error', 'Failed. Only APPROVE status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {
                me.getFormoption().el.mask('Please wait', 'x-mask-loading');
                index;
                for (index = 0; index < arraydata.length; ++index) {
                    dataarray = arraydata[index];
                    if (dataarray.klaimpengobatan_id == undefined) {
                        dataarray['klaimpengobatan_id'] = 0;
                    }
                    dataarray['basedata'] = 'intranet';

                    me.tools.ajax({
                        params: dataarray,
                        success: function (data, model) {
                            status = data.others[0][0].HASIL;
                            msg = data.others[0][0].MSG;
                            Ext.Msg.alert('Info', msg);
                        }
                    }).read('createreason');

                }
                me.getFormoption().el.unmask();
                //Ext.Msg.alert('Info', 'Process finish');
                me.getDataintranet();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    formOptionsAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        //me.getGridintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormoptions();

        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');

    },
    formDataAfterrender: function () {
        var me, form, griddetail, storedetail, type, typetag;
        me = this;
        
        if(me.rowintranet.data.jenispengobatan_id == 2 || me.rowintranet.data.jenispengobatan_id == 4){
            form = me.getFormintranetkacamata();
        }else{
            form = me.getFormintranet();
        }

        // form.loadRecord(me.rowintranet);

        me.tools.ajax({
            params: {
                id : me.rowintranet.internalId,
                jenispengobatan_id : me.rowintranet.data.jenispengobatan_id
            },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'success'){
                    if(data.others[0][0].HASIL.jenispengobatan_id == 2 || data.others[0][0].HASIL.jenispengobatan_id == 4){
                        
                        if(data.others[0][0].HASIL.jenispengobatan_id == 2){
                            type = 'F';
                            typetag = 'formFrameID';
                        }

                        if(data.others[0][0].HASIL.jenispengobatan_id == 4){
                            type = 'L';
                            typetag = 'formLensID';
                        }

                        form.down("[name=klaimpengobatan_id]").setValue(data.others[0][0].HASIL.klaimpengobatan_id);
                        form.down("[name=jenispengobatan_id]").setValue(data.others[0][0].HASIL.jenispengobatan_id);
                        form.down("[name=tipe_klaim]").setValue(type);
                        form.down("[name=employee_id]").setValue(data.others[0][0].HASIL.employee_id);
                        form.down("[name=name]").setValue(data.others[0][0].HASIL.employee_name);
                        form.down("[name=deptcode]").setValue(data.others[0][0].HASIL.deptcode);
                        form.down("[name=jenispengobatan]").setValue(data.others[0][0].HASIL.jenispengobatan);

                        form.down("[name=claim_date_ess]").setValue(data.others[0][0].HASIL.claim_date_ess);
                        form.down("[name=claim_date]").setValue(data.others[0][0].HASIL.claim_date_ess);
                        form.down("[name=kwitansi_date_ess]").setValue(data.others[0][0].HASIL.kwitansi_date_ess);
                        form.down("[name=kwitansi_date]").setValue(data.others[0][0].HASIL.kwitansi_date_ess);
                        form.down("[name=keterangan_ess]").setValue(data.others[0][0].HASIL.description_ess);
                        form.down("[name=keterangan]").setValue(data.others[0][0].HASIL.description_ess);
                        form.down("[name=nama_optik_ess]").setValue(data.others[0][0].HASIL.nama_optik_ess);
                        form.down("[name=nama_optik]").setValue(data.others[0][0].HASIL.nama_optik_ess);
                        form.down("[name=rekomendasi_dokter_ess]").setValue(data.others[0][0].HASIL.rekomendasi_dokter_ess);
                        form.down("[name=rekomendasi_dokter]").setValue(data.others[0][0].HASIL.rekomendasi_dokter_ess);
                        form.down("[name=tipe_klaim_lensa_ess]").setValue(data.others[0][0].HASIL.tipe_klaim_lensa_ess);
                        form.down("[name=tipe_klaim_lensa]").setValue(data.others[0][0].HASIL.tipe_klaim_lensa_ess);
                        form.down("[name=ki_minus_ess]").setValue(data.others[0][0].HASIL.ki_minus_ess);
                        form.down("[name=ki_minus]").setValue(data.others[0][0].HASIL.ki_minus_ess);
                        form.down("[name=ka_minus_ess]").setValue(data.others[0][0].HASIL.ka_minus_ess);
                        form.down("[name=ka_minus]").setValue(data.others[0][0].HASIL.ka_minus_ess);
                        form.down("[name=ki_plus_ess]").setValue(data.others[0][0].HASIL.ki_plus_ess);
                        form.down("[name=ki_plus]").setValue(data.others[0][0].HASIL.ki_plus_ess);
                        form.down("[name=ka_plus_ess]").setValue(data.others[0][0].HASIL.ka_plus_ess);
                        form.down("[name=ka_plus]").setValue(data.others[0][0].HASIL.ka_plus_ess);
                        form.down("[name=ki_silinder_ess]").setValue(data.others[0][0].HASIL.ki_silinder_ess);
                        form.down("[name=ki_silinder]").setValue(data.others[0][0].HASIL.ki_silinder_ess);
                        form.down("[name=ka_silinder_ess]").setValue(data.others[0][0].HASIL.ka_silinder_ess);
                        form.down("[name=ka_silinder]").setValue(data.others[0][0].HASIL.ka_silinder_ess);

                        form.down("[name=attachment]").setValue(data.others[0][0].HASIL.file_upload);

                        form.down("[name=total_ess]").setValuem(data.others[0][0].HASIL.total_ess);
                        form.down("[name=total_ess1]").setValuem(data.others[0][0].HASIL.total_ess);
                        //form.down("[name=total]").setValuem(data.others[0][0].HASIL.total_ess);
                        if(data.others[0][0].HASIL.hrd_check == '1'){
                            form.down("[name=total]").setValuem(data.others[0][0].HASIL.total);
                        }else{
                            form.down("[name=total]").setValuem(data.others[0][0].HASIL.total_ess);
                        }

                        form.down("[name=hrd_comment]").setValue(data.others[0][0].HASIL.hrd_comment);
                        form.down("[name=notes]").setValue(data.others[0][0].HASIL.notes);

                        form.down("[name=is_show]").setValue(data.others[0][0].HASIL.is_show);
                        form.down("[name=is_block]").setValue(data.others[0][0].HASIL.is_block);

                        me.disabledFields_kacamata_Intranet(true);

                        me.totalKlaimKacamataOnBlur(form.down("[name=total]").getValue(), typetag);

                        if(data.others[0][0].HASIL.jenispengobatan_id == 2){

                            me.loadDataPlafonKacamata(function() {
                                me.totalKlaimKacamataOnBlurFrame();
                            });
                        }

                        if(data.others[0][0].HASIL.jenispengobatan_id == 4){

                            me.loadDataPlafonKacamata(function() {
                                me.totalKlaimKacamataOnBlurLensa();
                            });
                        }

                        g = me.getGrid();
                        g.getSelectionModel().select((data.others[0][0].HASIL.row_num - 1));

                        // form.down("[name=plafon]").setValue(data.others[0][0].HASIL.plafon);
                        // form.down("[name=percent_pengganti]").setValue(data.others[0][0].HASIL.percent_pengganti);
                        // form.down("[name=amount_pengganti]").setValue(data.others[0][0].HASIL.amount_pengganti);
                        // form.down("[name=claim_value]").setValue(data.others[0][0].HASIL.claim_value);
                        // form.down("[name=total_klaim]").setValue(data.others[0][0].HASIL.total_klaim);
                        // form.down("[name=saldo]").setValue(data.others[0][0].HASIL.saldo);
                        // form.down("[name=attachment]").setValue(data.others[0][0].HASIL.attachment);

                    }else{

                        form.down("[name=klaimpengobatan_id]").setValue(data.others[0][0].HASIL.klaimpengobatan_id);
                        form.down("[name=jenispengobatan_id]").setValue(data.others[0][0].HASIL.jenispengobatan_id);
                        form.down("[name=tipe_klaim]").setValue('');
                        form.down("[name=employee_id]").setValue(data.others[0][0].HASIL.employee_id);
                        form.down("[name=name]").setValue(data.others[0][0].HASIL.employee_name);
                        form.down("[name=deptcode]").setValue(data.others[0][0].HASIL.deptcode);
                        form.down("[name=jenispengobatan]").setValue(data.others[0][0].HASIL.jenispengobatan);
                        form.down("[name=claim_date_ess]").setValue(data.others[0][0].HASIL.claim_date_ess);
                        form.down("[name=claim_date]").setValue(data.others[0][0].HASIL.claim_date_ess);
                        form.down("[name=kwitansi_date_ess]").setValue(data.others[0][0].HASIL.kwitansi_date_ess);
                        form.down("[name=kwitansi_date]").setValue(data.others[0][0].HASIL.kwitansi_date_ess);
                        form.down("[name=docter_name_ess]").setValue(data.others[0][0].HASIL.docter_name_ess);
                        form.down("[name=docter_name]").setValue(data.others[0][0].HASIL.docter_name_ess);
                        form.down("[name=hospital_name_ess]").setValue(data.others[0][0].HASIL.hospital_name_ess);
                        form.down("[name=hospital_name]").setValue(data.others[0][0].HASIL.hospital_name_ess);
                        form.down("[name=apotic_name_ess]").setValue(data.others[0][0].HASIL.apotic_name_ess);
                        form.down("[name=apotic_name]").setValue(data.others[0][0].HASIL.apotic_name_ess);
                        form.down("[name=description_ess]").setValue(data.others[0][0].HASIL.description_ess);
                        form.down("[name=description_default]").setValue(data.others[0][0].HASIL.description_ess);
                        form.down("[name=rawat_inap_ess]").setValue(data.others[0][0].HASIL.rawat_inap_ess);
                        form.down("[name=rawat_inap]").setValue(data.others[0][0].HASIL.rawat_inap_ess);
                        form.down("[name=claim_subject_ess]").setValue(data.others[0][0].HASIL.claim_subject_ess);
                        form.down("[name=claim_subject]").setValue(data.others[0][0].HASIL.claim_subject_ess);
                        form.down("[name=total_ess]").setValuem(data.others[0][0].HASIL.total_ess);
                        form.down("[name=total_ess1]").setValuem(data.others[0][0].HASIL.total_ess);
                        // form.down("[name=total]").setValuem(data.others[0][0].HASIL.total_ess);
                        if(data.others[0][0].HASIL.hrd_check == '1'){
                            form.down("[name=total]").setValuem(data.others[0][0].HASIL.total);
                        }else{
                            form.down("[name=total]").setValuem(data.others[0][0].HASIL.total_ess);
                        }
                        form.down("[name=nama_pasien_ess]").setValue(data.others[0][0].HASIL.nama_pasien_ess);
                        form.down("[name=nama_pasien]").setValue(data.others[0][0].HASIL.nama_pasien_ess);

                        form.down("[name=attachment]").setValue(data.others[0][0].HASIL.file_upload);

                        form.down("[name=attachment1]").setValue(data.others[0][0].HASIL.file_upload_ket_suami);
                        form.down("[name=attachment2]").setValue(data.others[0][0].HASIL.file_upload_ket_rtrw);

                        form.down("[name=hrd_comment]").setValue(data.others[0][0].HASIL.hrd_comment);
                        form.down("[name=notes]").setValue(data.others[0][0].HASIL.notes);

                        form.down("[name=is_show]").setValue(data.others[0][0].HASIL.is_show);
                        form.down("[name=is_block]").setValue(data.others[0][0].HASIL.is_block);

                        f = me.getFormdata();
                        g = me.getGrid();
                        f.down("[name=jenispengobatan_jenispengobatan_id]").setValue(data.others[0][0].HASIL.jenispengobatan_id);
                        f.down("[name=claim_date]").setValue(data.others[0][0].HASIL.claim_date_ess);
                        f.down("[name=kwitansi_date]").setValue(data.others[0][0].HASIL.kwitansi_date_ess);
                        //f.down("[name=total]").setValue(data.others[0][0].HASIL.total_ess);
                        if(data.others[0][0].HASIL.hrd_check == '1'){
                            f.down("[name=total]").setValuem(data.others[0][0].HASIL.total);
                        }else{
                            f.down("[name=total]").setValuem(data.others[0][0].HASIL.total_ess);
                        }

                        g.getSelectionModel().select((data.others[0][0].HASIL.row_num - 1));
                        me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"),1);
                        me.totalOnBlur_v2(f.down("[name=total]"),1);

                        setTimeout(function(){  

                            form.down("[name=plafon]").setValuem(f.down("[name=plafon]").getValue());
                            form.down("[name=percent_pengganti]").setValue(f.down("[name=percent_pengganti]").getValue());
                            form.down("[name=amount_pengganti]").setValuem(f.down("[name=amount_pengganti]").getValue());
                            form.down("[name=claim_value]").setValuem(f.down("[name=claim_value]").getValue());
                            form.down("[name=total_klaim]").setValuem(f.down("[name=total_klaim]").getValue());
                            form.down("[name=saldo]").setValuem(f.down("[name=saldo]").getValue());
                        
                        }, 100);

                        me.disabledFields_Intranet(true);
                        // form.down("[name=attachment]").setValue(data.others[0][0].HASIL.attachment);

                    }
                    
                    setTimeout(function(){  
                        me.tools.ajax({
                            params: {
                                id : me.rowintranet.internalId,
                                jenispengobatan_id : me.rowintranet.data.jenispengobatan_id
                            },
                            success: function (data, model) {
                                if(data.others[0][0].MSG == 'success'){
                                    if(data.others[0][0].HASIL.jenispengobatan_id == 2 || data.others[0][0].HASIL.jenispengobatan_id == 4){
                                        
                                        if(data.others[0][0].HASIL.jenispengobatan_id == 2){
                                            type = 'F';
                                            typetag = 'formFrameID';
                                        }

                                        if(data.others[0][0].HASIL.jenispengobatan_id == 4){
                                            type = 'L';
                                            typetag = 'formLensID';
                                        }

                                        

                                        me.disabledFields_kacamata_Intranet(true);

                                        me.totalKlaimKacamataOnBlur(form.down("[name=total]").getValue(), typetag);

                                        if(data.others[0][0].HASIL.jenispengobatan_id == 2){

                                            me.loadDataPlafonKacamata(function() {
                                                me.totalKlaimKacamataOnBlurFrame();
                                            });
                                        }

                                        if(data.others[0][0].HASIL.jenispengobatan_id == 4){

                                            me.loadDataPlafonKacamata(function() {
                                                me.totalKlaimKacamataOnBlurLensa();
                                            });
                                        }



                                    }else{

                                        

                                        f = me.getFormdata();
                                        g = me.getGrid();
                                        f.down("[name=jenispengobatan_jenispengobatan_id]").setValue(data.others[0][0].HASIL.jenispengobatan_id);
                                        f.down("[name=claim_date]").setValue(data.others[0][0].HASIL.claim_date_ess);
                                        f.down("[name=kwitansi_date]").setValue(data.others[0][0].HASIL.kwitansi_date_ess);
                                        //f.down("[name=total]").setValue(data.others[0][0].HASIL.total_ess);
                                        if(data.others[0][0].HASIL.hrd_check == '1'){
                                            f.down("[name=total]").setValuem(data.others[0][0].HASIL.total);
                                        }else{
                                            f.down("[name=total]").setValuem(data.others[0][0].HASIL.total_ess);
                                        }

                                        g.getSelectionModel().select((data.others[0][0].HASIL.row_num - 1));
                                        me.jenispengobatanOnChange(f.down("[name=jenispengobatan_jenispengobatan_id]"),1);
                                        me.totalOnBlur_v2(f.down("[name=total]"),1);

                                        setTimeout(function(){  

                                            form.down("[name=plafon]").setValuem(f.down("[name=plafon]").getValue());
                                            form.down("[name=percent_pengganti]").setValue(f.down("[name=percent_pengganti]").getValue());
                                            form.down("[name=amount_pengganti]").setValuem(f.down("[name=amount_pengganti]").getValue());
                                            form.down("[name=claim_value]").setValuem(f.down("[name=claim_value]").getValue());
                                            form.down("[name=total_klaim]").setValuem(f.down("[name=total_klaim]").getValue());
                                            form.down("[name=saldo]").setValuem(f.down("[name=saldo]").getValue());
                                        
                                        }, 100);

                                        me.disabledFields_Intranet(true);
                                        // form.down("[name=attachment]").setValue(data.others[0][0].HASIL.attachment);

                                    }
                                    
                                }
                            }
                        }).read('getdatabrowse');
                    }, 100);
                }
            }
        }).read('getdatabrowse');

    }, 

    disabledFields_Intranet: function(isDisable) {
        var me = this;
        var f = me.getFormintranet();
        if (me.fieldDisabled !== isDisable) {
            var vs = f.getForm().getValues();
            for (var i in vs) {
                var el = f.down("[name=" + i + "]");

                if (el && !el.stayReadOnly) {
                    el.setReadOnly(isDisable);
                }
            }
            me.fieldDisabled = isDisable;
        }

        f.down("[name=plafon]").setReadOnly(true);
        f.down("[name=percent_pengganti]").setReadOnly(true);
        f.down("[name=amount_pengganti]").setReadOnly(true);
        f.down("[name=claim_value]").setReadOnly(true);
        f.down("[name=total_klaim]").setReadOnly(true);
        f.down("[name=saldo]").setReadOnly(true);
        f.down("[name=total_ess]").setReadOnly(true);
        f.down("[name=total_ess1]").setReadOnly(true);
    },

    disabledFields_kacamata_Intranet: function(isDisable) {
        var me = this;
        var f = me.getFormintranetkacamata();
        if (me.fieldDisabled !== isDisable) {
            var vs = f.getForm().getValues();
            for (var i in vs) {
                var el = f.down("[name=" + i + "]");

                if (el && !el.stayReadOnly) {
                    el.setReadOnly(isDisable);
                }
            }
            me.fieldDisabled = isDisable;
        }

        f.down("[name=plafon]").setReadOnly(true);
        f.down("[name=percent_pengganti]").setReadOnly(true);
        f.down("[name=amount_pengganti]").setReadOnly(true);
        f.down("[name=claim_value]").setReadOnly(true);
        f.down("[name=total_klaim]").setReadOnly(true);
        f.down("[name=saldo]").setReadOnly(true);
        f.down("[name=total_ess]").setReadOnly(true);
        f.down("[name=total_ess1]").setReadOnly(true);
    },

    processKacamataBrowse:function(){
       var me = this;
       var form = me.getFormintranetkacamata();
       
       form.setLoading('Please wait...');

       me.tools.ajax({
            params: {
                klaimpengobatan_id : form.down("[name=klaimpengobatan_id]").getValue(),
                jenispengobatan_id : form.down("[name=jenispengobatan_id]").getValue(),
                tipe_klaim : form.down("[name=tipe_klaim]").getValue(),
                employee_id : form.down("[name=employee_id]").getValue(),

                claim_date : form.down("[name=claim_date]").getValue(),
                kwitansi_date : form.down("[name=kwitansi_date]").getValue(),
                keterangan : form.down("[name=keterangan]").getValue(),
                rekomendasi_dokter : form.down("[name=rekomendasi_dokter]").getValue(),
                tipe_klaim_lensa : form.down("[name=tipe_klaim_lensa]").getValue(),
                ki_minus : form.down("[name=ki_minus]").getValue(),
                ka_minus : form.down("[name=ka_minus]").getValue(),
                ki_plus : form.down("[name=ki_plus]").getValue(),
                ka_plus : form.down("[name=ka_plus]").getValue(),
                ki_silinder : form.down("[name=ki_silinder]").getValue(),
                ka_silinder : form.down("[name=ka_silinder]").getValue(),

                total : form.down("[name=total]").getValue(),
                plafon : form.down("[name=plafon]").getValue(),
                percent_pengganti : form.down("[name=percent_pengganti]").getValue(),
                amount_pengganti : form.down("[name=amount_pengganti]").getValue(),
                claim_value : form.down("[name=claim_value]").getValue(),
                total_klaim : form.down("[name=total_klaim]").getValue(),
                saldo : form.down("[name=saldo]").getValue(),
                hrd_comment : form.down("[name=hrd_comment]").getValue(),
                paid : form.down("[name=paid]").getValue(),
                pay_date : form.down("[name=pay_date]").getValue(),
                is_show : form.down("[name=is_show]").getValue(),
                is_block : form.down("[name=is_block]").getValue(),

                notes : form.down("[name=notes]").getValue(),
                nama_optik : form.down("[name=nama_optik]").getValue(),

            },
            success: function (data, model) {
                form.setLoading(false);
                
                if(data.others[0][0].MSG == 'success'){
                    form.up('window').close();
                    me.tools.alert.info("Success");
                    me.getFilterdata();
                }else{
                    me.tools.alert.info("Failed");
                }
            }
        }).read('processkacamatabrowse');
    },

    rejectKacamataBrowse:function(){
       var me = this;
       var form = me.getFormintranetkacamata();
       
       form.setLoading('Please wait...');

       me.tools.ajax({
            params: {
                klaimpengobatan_id : form.down("[name=klaimpengobatan_id]").getValue(),
                jenispengobatan_id : form.down("[name=jenispengobatan_id]").getValue(),
                tipe_klaim : form.down("[name=tipe_klaim]").getValue(),
                employee_id : form.down("[name=employee_id]").getValue(),

                claim_date : form.down("[name=claim_date]").getValue(),
                kwitansi_date : form.down("[name=kwitansi_date]").getValue(),
                keterangan : form.down("[name=keterangan]").getValue(),
                rekomendasi_dokter : form.down("[name=rekomendasi_dokter]").getValue(),
                tipe_klaim_lensa : form.down("[name=tipe_klaim_lensa]").getValue(),
                ki_minus : form.down("[name=ki_minus]").getValue(),
                ka_minus : form.down("[name=ka_minus]").getValue(),
                ki_plus : form.down("[name=ki_plus]").getValue(),
                ka_plus : form.down("[name=ka_plus]").getValue(),
                ki_silinder : form.down("[name=ki_silinder]").getValue(),
                ka_silinder : form.down("[name=ka_silinder]").getValue(),

                total : form.down("[name=total]").getValue(),
                plafon : form.down("[name=plafon]").getValue(),
                percent_pengganti : form.down("[name=percent_pengganti]").getValue(),
                amount_pengganti : form.down("[name=amount_pengganti]").getValue(),
                claim_value : form.down("[name=claim_value]").getValue(),
                total_klaim : form.down("[name=total_klaim]").getValue(),
                saldo : form.down("[name=saldo]").getValue(),
                hrd_comment : form.down("[name=hrd_comment]").getValue(),
                paid : form.down("[name=paid]").getValue(),
                pay_date : form.down("[name=pay_date]").getValue(),
                is_show : form.down("[name=is_show]").getValue(),
                is_block : form.down("[name=is_block]").getValue(),

                notes : form.down("[name=notes]").getValue(),
                nama_optik : form.down("[name=nama_optik]").getValue(),
            },
            success: function (data, model) {
                form.setLoading(false);
                
                if(data.others[0][0].MSG == 'success'){
                    form.up('window').close();
                    me.tools.alert.info("Success");
                    me.getFilterdata();
                }else{
                    me.tools.alert.info("Failed");
                }
            }
        }).read('rejectkacamatabrowse');
    },

    processBrowse:function(){
       var me = this;
       var form = me.getFormintranet();
       
       form.setLoading('Please wait...');

       me.tools.ajax({
            params: {
                klaimpengobatan_id : form.down("[name=klaimpengobatan_id]").getValue(),
                jenispengobatan_id : form.down("[name=jenispengobatan_id]").getValue(),
                tipe_klaim : form.down("[name=tipe_klaim]").getValue(),
                employee_id : form.down("[name=employee_id]").getValue(),
                claim_date : form.down("[name=claim_date]").getValue(),
                kwitansi_date : form.down("[name=kwitansi_date]").getValue(),
                docter_name : form.down("[name=docter_name]").getValue(),
                hospital_name : form.down("[name=hospital_name]").getValue(),
                apotic_name : form.down("[name=apotic_name]").getValue(),
                description : form.down("[name=description_default]").getValue(),
                rawat_inap : form.down("[name=rawat_inap]").getValue(),
                claim_subject : form.down("[name=claim_subject]").getValue(),
                total : form.down("[name=total]").getValue(),
                plafon : form.down("[name=plafon]").getValue(),
                percent_pengganti : form.down("[name=percent_pengganti]").getValue(),
                amount_pengganti : form.down("[name=amount_pengganti]").getValue(),
                claim_value : form.down("[name=claim_value]").getValue(),
                total_klaim : form.down("[name=total_klaim]").getValue(),
                saldo : form.down("[name=saldo]").getValue(),
                hrd_comment : form.down("[name=hrd_comment]").getValue(),
                paid : form.down("[name=paid]").getValue(),
                pay_date : form.down("[name=pay_date]").getValue(),
                is_show : form.down("[name=is_show]").getValue(),
                is_block : form.down("[name=is_block]").getValue(),

                notes : form.down("[name=notes]").getValue(),
                nama_pasien : form.down("[name=nama_pasien]").getValue(),
                year : form.down("[name=year]").getValue(),
            },
            success: function (data, model) {
                form.setLoading(false);
                
                if(data.others[0][0].MSG == 'success'){
                    form.up('window').close();
                    me.tools.alert.info("Success");
                    me.getFilterdata();
                }else{
                    me.tools.alert.info("Failed");
                }
            }
        }).read('processbrowse');
    },

    rejectBrowse:function(){
       var me = this;
       var form = me.getFormintranet();
       
       form.setLoading('Please wait...');

       me.tools.ajax({
            params: {
                klaimpengobatan_id : form.down("[name=klaimpengobatan_id]").getValue(),
                jenispengobatan_id : form.down("[name=jenispengobatan_id]").getValue(),
                tipe_klaim : form.down("[name=tipe_klaim]").getValue(),
                employee_id : form.down("[name=employee_id]").getValue(),
                claim_date : form.down("[name=claim_date]").getValue(),
                kwitansi_date : form.down("[name=kwitansi_date]").getValue(),
                docter_name : form.down("[name=docter_name]").getValue(),
                hospital_name : form.down("[name=hospital_name]").getValue(),
                apotic_name : form.down("[name=apotic_name]").getValue(),
                description : form.down("[name=description_default]").getValue(),
                rawat_inap : form.down("[name=rawat_inap]").getValue(),
                claim_subject : form.down("[name=claim_subject]").getValue(),
                total : form.down("[name=total]").getValue(),
                plafon : form.down("[name=plafon]").getValue(),
                percent_pengganti : form.down("[name=percent_pengganti]").getValue(),
                amount_pengganti : form.down("[name=amount_pengganti]").getValue(),
                claim_value : form.down("[name=claim_value]").getValue(),
                total_klaim : form.down("[name=total_klaim]").getValue(),
                saldo : form.down("[name=saldo]").getValue(),
                hrd_comment : form.down("[name=hrd_comment]").getValue(),
                paid : form.down("[name=paid]").getValue(),
                pay_date : form.down("[name=pay_date]").getValue(),
                is_show : form.down("[name=is_show]").getValue(),
                is_block : form.down("[name=is_block]").getValue(),

                notes : form.down("[name=notes]").getValue(),
                nama_pasien : form.down("[name=nama_pasien]").getValue(),
                year : form.down("[name=year]").getValue(),
            },
            success: function (data, model) {
                form.setLoading(false);
                
                if(data.others[0][0].MSG == 'success'){
                    form.up('window').close();
                    me.tools.alert.info("Success");
                    me.getFilterdata();
                }else{
                    me.tools.alert.info("Failed");
                }
            }
        }).read('rejectbrowse');
    },

    gridIntranetActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridintranet();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        
        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranet = record;
                    if(record.data.jenispengobatan_id == 2 || record.data.jenispengobatan_id == 4){
                        me.instantWindow("FormDataIntranetKacamata", 900, "Form Data Intranet Kacamata", "options", "klaimpengobatanformdataintranetkacamata");
                    }else{
                        me.instantWindow("FormDataIntranet", 900, "Form Data Intranet", "options", "klaimpengobatanformdataintranet");
                    }
                    break;
            }
        }
    },

    totalKlaimKacamataOnBlur: function(el, val, formTab) {
        var me = this;
        me.hitungPlafonResult = null;
        var f = me.getFormintranetkacamata();
        // f = f.down("#" + formTab);

        var vs = f.getValues();



        var tanggal = f.down("[name=claim_date]").getValue();
        var emRec = me.getGrid().getSelectedRecord();

        var plafonDefault = accounting.unformat(f.down("[name=plafon]").getValue());
console.log('plafonDefault0: '+plafonDefault);
        var isRedok = false; /// rekomendasi dokter?
        isRedok = vs.rekomendasi_dokter === 1 ? true : false;
console.log('plafonDefault1: '+plafonDefault);
        if (isRedok) {
            plafonDefault = plafonDefault + ((me.persenAdd / 100) * plafonDefault);
        }
console.log('isRedok: '+isRedok);
console.log('me.persenAdd: '+me.persenAdd);
console.log('plafonDefault2: '+plafonDefault);
        if (vs.tipe_klaim_lensa === "PROGRESIVE" && formTab === "formLensID") {

            plafonDefault = plafonDefault * 2;
        }
        console.log('plafonDefault3: '+plafonDefault);
        console.log('[name=plafon]: '+f.down("[name=plafon]").getValue());
        console.log('accounting.unformat[name=plafon]: '+accounting.unformat(f.down("[name=plafon]").getValue()));
        //// klaim lama
        var klaimLama = [];
        
        //added by michael 2023-04-12
        //ini diset 0, krn sudah tidak dipakai lg untuk parameter yg ini
        me.paramLimit = 0;

        /// jika periode klaim 1 tahun
        if (me.tools.intval(me.paramLimit) == 1) {
            var g = formTab === "formLensID" ? me.getGridlens() : me.getGridframe();
            var recs = g.getStore().data.items;

            for (var i in recs) {
                klaimLama.push({
                    jenisPengobatanCode: formTab === "formLensID" ? "LENSA" : "FRAME",
                    year: recs[i].get("claim_date") ? recs[i].get("claim_date").getFullYear() : 0,
                    klaimPengobatanId: 0,
                    klaimValue: recs[i].get("total")
                });
            }
        }
        
        var sysTools = new Hrd.library.system.Tools();
        var params = {
            klaimPengobatanId: null,
            jenisPengobatanCode: formTab === "formLensID" ? "LENSA" : "FRAME",
            nilaiKlaim: accounting.unformat(f.down("[name=total]").getValue()),
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

        f.down("[name=claim_value]").setValuem(accounting.format(hp.claimValue));
        f.down("[name=amount_pengganti]").setValuem(accounting.format(hp.amountPengganti));
        f.down("[name=total_klaim]").setValuem(accounting.format(hp.totalKlaim));
        f.down("[name=saldo]").setValuem(accounting.format(hp.saldo));
console.log(hp);
console.log(params);
        // f.down("[name=plafon]").setValue(accounting.format(plafonDefault));
    },

    totalKlaimKacamataOnBlurLensa: function() {
        var me = this;
        me.totalKlaimKacamataOnBlur(null, 0, "formLensID");
    },
    totalKlaimKacamataOnBlurFrame: function() {
        var me = this;
        me.totalKlaimKacamataOnBlur(null, 0, "formFrameID");
    },

    loadDataPlafonKacamata: function(callback) {
        var me = this;

        var f = me.getFormintranetkacamata();
        var form = me.getFormintranetkacamata();

        /// load data plafon
        var p = me.getPanel();
        // p.setLoading("Mengambil data plafon...");

        var type = f.down("[name=tipe_klaim]").getValue();

        var jenisKlaim = type === "L" ? "LENSA" : "FRAME";
        var g = me.getGrid();
        var rec = g.getSelectedRecord();

        var groupId = rec.get("group_group_id");


        var formTab = type === "L" ? "formLensID" : "formFrameID";

        var tglKlaim = f.down("[name=claim_date]").getValue();
        f.down("[name=claim_date]").setValue(tglKlaim);
        console.log(form.down("[name=claim_date]").getValue());
        // console.log(form.down("[name=tipe_klaim]").getValue());

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




                        f.down("[name=plafon]").setValuem(accounting.format(plafon));
                        f.down("[name=percent_pengganti]").setValue(percent);


                        if (typeof callback === "function") {
                            callback();
                        }


                    }
                }).read('plafoninfo_kacamata');


            }
        }).read('plafongolongan_kacamata');


    },

    viewFileIntranet:function(){
       var me = this;
       var f = me.getFormintranet();
       var vs = f.getValues();
       var fileName = f.down("[name=attachment]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    viewFile1Intranet:function(){
       var me = this;
       var f = me.getFormintranet();
       var vs = f.getValues();
       var fileName = f.down("[name=attachment1]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },
    viewFile2Intranet:function(){
       var me = this;
       var f = me.getFormintranet();
       var vs = f.getValues();
       var fileName = f.down("[name=attachment2]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },

    viewFileIntranetKacamata:function(){
       var me = this;
       var f = me.getFormintranetkacamata();
       var vs = f.getValues();
       var fileName = f.down("[name=attachment]").getValue();
       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/claim/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },

    Formpfamsshow: function () {
        var me;
        me = this;

        me.instantWindow("FormPfams", 900, "Process to FAMS", "formoptions", "klaimpengobatanformpfams");
      
    },
    formPfamsAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        //me.getGridpfams().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormpfams();

        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');

    },
    getDatapfams: function (flag) {
        this.getFilterdatapfams();

    },
    getFilterdatapfams: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormpfams();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }

        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.fams_process == undefined) {
            formvalue['fams_process'] = 'NO';
        } else {
            formvalue['fams_process'] = formvalue.fams_process;
        }

        if (formvalue.fams_status == undefined) {
            formvalue['fams_status'] = '';
        } else {
            formvalue['fams_status'] = formvalue.fams_status;
        }

        grid = me.getGridpfams();
        grid.doInit();

       
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filterpfams',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(formvalue),
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    FormDatapfamsshow: function () {
        var me;
        me = this;
        me.instantWindow("FormDataPfams", 900, "Process to Data FAMS", "create", "klaimpengobatanformdatapfams");
      
    },
    formDataPfamsAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        // me.getGridpfams().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormdatapfams();

        grid = me.getGridpfams();
        rows = grid.getSelectionModel().getSelection();
        arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].fams_status == 'OPEN') {
                    arraydata.push(rows[i]['data']);
                }
            }


        griddata = me.getGriddatapfams();
        griddata.doInit();

       
        var store = griddata.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filterdatapfams',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(arraydata),
        };
        
        store = store.load({
            callback: function (data, model) {
                griddata.attachModel(model);
                griddata.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });

        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=code]")).comboBox();
            }
        }).read('departmentfams');

        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                form.down("[name=project_id]").setValue(data.others[0][0].projectpt.project_id);
                form.down("[name=pt_id]").setValue(data.others[0][0].projectpt.pt_id);
                form.down("[name=project_name]").setValue(data.others[0][0].projectpt.project_name);
                form.down("[name=pt_name]").setValue(data.others[0][0].projectpt.pt_name);

                form.down("[name=reg_date]").setValue(new Date());
                // form.down("[name=duedate]").setValue(new Date());
                form.down("[name=dataflow]").setValue('OUT TRANS');
                form.down("[name=vendor]").setValue('YBS');
                form.down("[name=description]").setValue(data.others[0][0].text);

                me.tools.alert.info('Only OPEN status can be processed.');
            }
        }).read('datafamsinit');

    },
    // Processpfams: function () {
    //     var me, form, grid, store, rows, arraydata, status, msg, index, dataarray;
    //     me = this;
    //     grid = me.getGridpfams();
    //     rows = grid.getSelectionModel().getSelection();
    //     if (rows.length < 1) {
    //         Ext.Msg.alert('Info', 'No record selected..!');
    //         return;
    //     } else {
            
    //         if(rows[0]['data'].fams_status != 'OPEN'){
    //             Ext.Msg.alert('Error', 'Failed. Only OPEN status can be processed.');
    //             return;            
    //         }
            
    //         arraydata = [];
    //         for (var i = 0; i < rows.length; i++) {
    //             if (rows[i]['data'].fams_status == 'OPEN') {
    //                 arraydata.push(rows[i]['data']);
    //             }
    //         }
    //         if (arraydata.length) {
    //             console.log(JSON.stringify(arraydata));
    //             // me.getFormoption().el.mask('Please wait', 'x-mask-loading');
    //             index;
    //             for (index = 0; index < arraydata.length; ++index) {
    //                 dataarray = arraydata[index];
    //                 if (dataarray.klaimpengobatan_kacamata_id == undefined) {
    //                     dataarray['klaimpengobatan_kacamata_id'] = 0;
    //                 }
    //                 if (dataarray.jenispengobatan_id == undefined) {
    //                     dataarray['jenispengobatan_id'] = 0;
    //                 }
    //                 dataarray['basedata'] = 'intranet';
    //             }

    //                 me.tools.ajax({
    //                     params: {"paramdata": Ext.JSON.encode(arraydata)},
    //                     success: function (data, model) {
    //                         // status = data.others[0][0].HASIL;
    //                         // msg = data.others[0][0].MSG;
    //                         // Ext.Msg.alert('Info', msg);
    //                     }
    //                 }).read('create_fams_voucherdepartment');
    //             // me.getFormoption().el.unmask();
    //             //Ext.Msg.alert('Info', 'Process finish');
    //             // me.getDataintranet();
    //         } else {
    //             Ext.Msg.alert('Info', 'Failed. Only OPEN status can be processed.');
    //         }
    //     }
    // },
    Processpfams: function () {
        var me, form, grid, store, rows, arraydata, status, msg, index, dataarray;
        me = this;
        grid = me.getGridpfams();
        rows = grid.getSelectionModel().getSelection();

        formdata = me.getFormdatapfams();

        project_id = formdata.down("[name=project_id]").getValue();
        pt_id = formdata.down("[name=pt_id]").getValue();
        code = formdata.down("[name=code]").getValue();
        reg_date = formdata.down("[name=reg_date]").getValue();
        duedate = formdata.down("[name=duedate]").getValue();
        dataflow = formdata.down("[name=dataflow]").getValue();
        vendor = formdata.down("[name=vendor]").getValue();
        payment_method = formdata.down("[name=payment_method]").getValue();
        description = formdata.down("[name=description]").getValue();

        if(code == '' || code == null){
            me.tools.alert.warning("Department is required");
            return false;
        } else {
            code = code;
        }

        if(reg_date == '' || reg_date == null){
            me.tools.alert.warning("Reg Date is required");
            return false;
        } else {
            reg_date = reg_date;
        }

        if(duedate == '' || duedate == null){
            me.tools.alert.warning("Due Date is required");
            return false;
        } else {
            duedate = duedate;
        }

        if(dataflow == '' || dataflow == null){
            me.tools.alert.warning("Data Flow is required");
            return false;
        } else {
            dataflow = dataflow;
        }

        if(vendor == '' || vendor == null){
            me.tools.alert.warning("Vendor is required");
            return false;
        } else {
            vendor = vendor;
        }

        if(payment_method == '' || payment_method == null){
            me.tools.alert.warning("Payment Method is required");
            return false;
        } else {
            payment_method = payment_method;
        }

        if(description == '' || description == null){
            me.tools.alert.warning("Description is required");
            return false;
        } else {
            description = description;
        }

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {

            if(rows[0]['data'].fams_status != 'OPEN'){
                Ext.Msg.alert('Error', 'Failed. Only OPEN status can be processed.');
                return;            
            }

            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].fams_status == 'OPEN') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {

                formdata.setLoading('Please wait...');
                index;
                for (index = 0; index < arraydata.length; ++index) {
                    dataarray = arraydata[index];
                    if (dataarray.klaimpengobatan_kacamata_id == undefined) {
                        dataarray['klaimpengobatan_kacamata_id'] = 0;
                    }
                    if (dataarray.jenispengobatan_id == undefined) {
                        dataarray['jenispengobatan_id'] = 0;
                    }
                    dataarray['basedata'] = 'intranet';
                }

                    me.tools.ajax({
                        params: {
                            "paramdata": Ext.JSON.encode(arraydata),
                            "project_id": project_id,
                            "pt_id": pt_id,
                            "code": code,
                            "reg_date": reg_date,
                            "duedate": duedate,
                            "dataflow": dataflow,
                            "vendor": vendor,
                            "payment_method": payment_method,
                            "description": description
                            },
                        success: function (data, model) {
                            status = data.others[0][0].STATUS;
                            msg = data.others[0][0].MSG;

                            me.tools.alert.info(msg);

                        }
                    }).read('create_fams_voucherdepartment');
                    
                    formdata.setLoading(false);
                    formdata.up('window').close();
                    this.getFilterdatapfams();

                
            } else {
                Ext.Msg.alert('Info', 'Failed. Only OPEN status can be processed.');
            }
        }
    },
    FormDataDeletepfamsshow: function () {
        var me;
        me = this;
        me.instantWindow("FormDataDeletePfams", 900, "Process to Delete Data FAMS", "options", "klaimpengobatanformdatadeletepfams");
      
    },
    formDataDeletePfamsAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        // me.getGridpfams().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormdatadeletepfams();

        grid = me.getGridpfams();
        rows = grid.getSelectionModel().getSelection();
        arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].fams_status == 'PROCESS') {
                    arraydata.push(rows[i]['data']);
                }
            }


        griddata = me.getGriddatadeletepfams();
        griddata.doInit();

       
        var store = griddata.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filterdatadeletepfams',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(arraydata),
        };
        
        store = store.load({
            callback: function (data, model) {
                griddata.attachModel(model);
                griddata.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });

        me.tools.ajax({
            params: {

            },
            success: function (data, model) {
                form.down("[name=project_id]").setValue(data.others[0][0].projectpt.project_id);
                form.down("[name=pt_id]").setValue(data.others[0][0].projectpt.pt_id);
                form.down("[name=project_name]").setValue(data.others[0][0].projectpt.project_name);
                form.down("[name=pt_name]").setValue(data.others[0][0].projectpt.pt_name);

                me.tools.alert.info('Only PROCESS status can be processed.');
            }
        }).read('datafamsinit');

    },
    CancelProcesspfams: function () {
        var me, form, grid, store, rows, arraydata, status, msg, index, dataarray;
        me = this;
        grid = me.getGridpfams();
        rows = grid.getSelectionModel().getSelection();

        formdata = me.getFormdatadeletepfams();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].fams_status != 'PROCESS'){
                Ext.Msg.alert('Error', 'Failed. Only PROCESS status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].fams_status == 'PROCESS') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {

                index;
                for (index = 0; index < arraydata.length; ++index) {
                    dataarray = arraydata[index];
                    if (dataarray.klaimpengobatan_kacamata_id == undefined) {
                        dataarray['klaimpengobatan_kacamata_id'] = 0;
                    }
                    if (dataarray.jenispengobatan_id == undefined) {
                        dataarray['jenispengobatan_id'] = 0;
                    }
                    dataarray['basedata'] = 'intranet';
                }

                    description = formdata.down("[name=description]").getValue();
                    project_id = formdata.down("[name=project_id]").getValue();
                    pt_id = formdata.down("[name=pt_id]").getValue();

                    if(description == '' || description == null){
                        me.tools.alert.warning("Delete Description is required");
                        return false;
                    } else {
                        description = description;
                    }

                Ext.Msg.confirm('Confirm', "Semua data dengan Voucher Department tersebut akan dihapus. Apakah Anda yakin ingin dihapus?", function (btn) {



                    formdata.setLoading('Please wait...');
                    if (btn == 'yes') {
                        me.tools.ajax({
                            params: {
                                "paramdata": Ext.JSON.encode(arraydata),
                                "description": description,
                                "project_id": project_id,
                                "pt_id": pt_id,
                            },
                            success: function (data, model) {      
                                status = data.others[0][0].STATUS;
                                msg = data.others[0][0].MSG;

                                me.tools.alert.info(msg);

                                formdata.setLoading(false);
                                formdata.up('window').close();
                                this.getFilterdatapfams();
                                
                            }
                        }).read('delete_fams_voucherdepartment');
                      }
                });

                
            } else {
                Ext.Msg.alert('Info', 'Failed. Only PROCESS status can be processed.');
            }
        }
    },

    //EXPORT DATA ----------------------------
    exportData: function(){
        var me, form, formvalue, grid, store, rows, arraydata, index;
        me = this;
        form = me.getFormoptions();
        formvalue = form.getForm().getValues();

        grid = me.getGridintranet();
        grid.doInit();
        store = grid.getStore();

        rows = grid.getSelectionModel().getSelection();
        
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        }else{
            if(rows[0]['data'].hrd_check != '1'){
                Ext.Msg.alert('Error', 'Failed. Only HRD CHECKED status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == '1') {
                    arraydata.push(rows[i]['data']);
                }
            }

            if (arraydata.length) {

                index;
                for (index = 0; index < arraydata.length; ++index) {
                    dataarray = arraydata[index];
                    if (dataarray.klaimpengobatan_kacamata_id == undefined) {
                        dataarray['klaimpengobatan_kacamata_id'] = 0;
                    }
                    if (dataarray.jenispengobatan_id == undefined) {
                        dataarray['jenispengobatan_id'] = 0;
                    }
                    dataarray['basedata'] = 'intranet';
                }


                me.tools.ajax({
                    params: {                          
                        data: Ext.JSON.encode(arraydata)
                    },
                    success: function (data, model) {
                        grid.setLoading(false);
                        url = data['others'][1]['directdata'];
                                if (url) {
                                    Ext.Msg.show({
                                        title: 'Info',
                                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                                        icon: Ext.Msg.INFO,
                                        buttons: Ext.Msg.OK,
                                        fn: function () {
                                        }
                                    });
                                }
                    }
                }).read('exportdata'); 


                //     description = formdata.down("[name=description]").getValue();
                //     project_id = formdata.down("[name=project_id]").getValue();
                //     pt_id = formdata.down("[name=pt_id]").getValue();

                //     if(description == '' || description == null){
                //         me.tools.alert.warning("Delete Description is required");
                //         return false;
                //     } else {
                //         description = description;
                //     }

                // Ext.Msg.confirm('Confirm', "Semua data dengan Voucher Department tersebut akan dihapus. Apakah Anda yakin ingin dihapus?", function (btn) {



                //     formdata.setLoading('Please wait...');
                //     if (btn == 'yes') {
                //         me.tools.ajax({
                //             params: {
                //                 "paramdata": Ext.JSON.encode(arraydata),
                //                 "description": description,
                //                 "project_id": project_id,
                //                 "pt_id": pt_id,
                //             },
                //             success: function (data, model) {      
                //                 status = data.others[0][0].STATUS;
                //                 msg = data.others[0][0].MSG;

                //                 me.tools.alert.info(msg);

                //                 formdata.setLoading(false);
                //                 formdata.up('window').close();
                //                 this.getFilterdatapfams();
                                
                //             }
                //         }).read('delete_fams_voucherdepartment');
                //       }
                // });

                
            } else {
                Ext.Msg.alert('Info', 'Failed. Only HRD CHECKED status can be processed.');
            }
        }
        
    },


});