Ext.define('Hrd.controller.Personalhistory', {
    extend: 'Hrd.library.box.controller.ControllerByEmployee2',
    alias: 'controller.Personalhistory',
    requires: [],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'personalhistory',
    fieldName: 'leaveentitlements_id',
    formWidth: 500,
    refs: [
        {
            ref: 'gridtaka',
            selector: 'personalhistorytandakasihgrid'
        },
        {
            ref: 'gridpromosi',
            selector: 'personalhistorypromosigrid'
        },
        {
            ref: 'gridmutasi',
            selector: 'personalhistorymutasigrid'
        },
        {
            ref: 'gridrotasi',
            selector: 'personalhistoryrotasigrid'
        },
        {
            ref: 'gridstatus',
            selector: 'personalhistorystatuskaryawangrid'
        },
        {
            ref: 'gridjenisklaim',
            selector: 'personalhistoryjenisklaimgrid'
        },
        {
            ref: 'gridtanggalklaim',
            selector: 'personalhistorytanggalklaimgrid'
        },
        {
            ref:'griddinas',
            selector:'personalhistorydinasgrid'
        },
        {
            ref:'gridbiayajalan',
            selector:'personalhistorybiayajalangrid'
        },
        {
            ref:'gridbiayatrans',
            selector:'personalhistorybiayatransgrid'
        },
        {
            ref:'gridbiayaent',
            selector:'personalhistorybiayaentgrid'
        },
        {
            ref:'gridtraining',
            selector:'personalhistorypelatihangrid'
        },
        {
            ref:'gridsp',
            selector:'personalhistoryspgrid'
        }
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Personalhistory',
    browseHandler: null,
    comboLoader: null,
    globalParams: null,
    localStore: {
        selectedUnit: null
    },
    tempSelectedEmployee: 0,
    textCombos: [],
    tools: null,
    expireDuration: 0,
    isLoadingParameter: false,
    isGridSelectionChange: false,
    refreshKarirTabCount: 0,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    /*
     init: function() {
     var me = this;
     this.callParent(arguments);
     var newEvs = {};
     
     //
     this.control(newEvs);
     
     },
     */
    init: function() {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector2b();
        console.log("init personal history");
        this.control(events.getEvents(me, me.controllerName));


        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});

        var newEvs = {};
        newEvs['personalhistoryformdata combobox[name=tahun_absencuti]'] = {
            select: function() {
                me.refreshAbsenCutiTab();
            }

        };

        newEvs['personalhistoryjenisklaimgrid'] = {
            selectionchange: function() {
                me.obatJenisKlaimSc();
            }
        };

        newEvs['personalhistorytanggalklaimgrid'] = {
            selectionchange: function() {
                me.obatTglKlaimSc();
            }
        };

        newEvs['personalhistoryformdata combobox[name=tahun_obat]'] = {
            select: function() {
                me.refreshPengobatanTab();
            }

        };


        newEvs['personalhistoryformdata #tabPanelPersonalHistoryId'] = {
            tabchange: function(tabPanel, newTab, oldTab, eOpts) {
                // you can examine some property of newTab, then determine what size to set.
                me.tabPanelOnChange();
            }

        };
        
        newEvs['personalhistorydinasgrid'] = {
            selectionchange: function() {
                me.dinsaSc();
            }
        };





        this.control(newEvs);


    },
    dinsaSc:function(){
      var me = this;
      var f= me.getFormdata();
      var gd = me.getGriddinas();
      var rec = gd.getSelectedRecord();
      if(rec){
          
          var dataRec = rec.data;
          
         
          
          for(var i in dataRec){
              var el = f.down("[name=dinas_"+i+"]");
              if(el){
                  el.setValue(dataRec[i]);
              }
          }
      }
    },
    tabPanelOnChange:function(){
        var me = this;
        me.gridSelectionChange();
    },
    refreshPhotoInfo: function(imageName) {
        var me = this;
        var form = me.getFormdata();
        // form.down("[name=photo]").setValue(imageName);
        //me.mt.customerPhoto(form.down("#photo_image"),imageName,me.myConfig.IMG_FOLDER);
        var size = null;
        var folder = "app/hrd/uploads/personal/foto/";
        var s = size ? size : '200px 250px';



        form.down("#photo_image").el.setStyle({backgroundImage: 'none'});
        if (!imageName) {
            return;
        }
        if (imageName.length > 0) {
            form.down("#photo_image").el.setStyle({backgroundImage: 'url(' + folder + '' + imageName + ')', backgroundSize: s, backgroundRepeat: "no-repeat"});

        }

    },
    gridSelectionChange: function() {
        var me = this;
        console.log(me);
        if (me.isLoadingParameter) {
            return;
        }





        var g = me.getGrid();
        var gt = me.getGridtaka();
        var rec = g.getSelectedRecord();
        var activeTab = me.getFormdata().down("tabpanel").getActiveTab();
        console.log(activeTab);
        console.log(1);

        if (rec) {
            var eId = rec.get("employee_id");
            g.setLoading("Please wait...");
            if (activeTab.itemId === "personalDataTabId") {
                me.tools.ajax({
                    params: {
                        employee_id: eId
                    },
                    success: function(data, model) {

                        console.log(data);
                        var f = me.getFormdata();
                        var respon = data.others[0][0]["PERSONAL"];
                        for (var i in respon) {

                            var el = f.down("[name=" + i + "]");
                            if (el) {
                                el.setValue(respon[i]);
                            }
                        }
                        me.refreshPhotoInfo(respon["photo"]);

                        // children
                        //name
                        var anaks = data.others[0][0]["CHILDREN"];
                        /// reset
                        for (var i = 0; i < 3; i++) {
                            if (i <= 2) {
                                f.down("[name=anak" + (i + 1) + "]").setValue("");
                            }
                        }

                        for (var i = 0; i < anaks.length; i++) {
                            if (i <= 2) {
                                f.down("[name=anak" + (i + 1) + "]").setValue(anaks[i]["name"]);
                            }
                        }

                        g.setLoading(false);

                    }

                }).read('personaldata');
            }
            else if (activeTab.itemId === "absentCutiTabId") {
                me.refreshAbsenCutiTab();
            }
            else if (activeTab.itemId === "karirTabId") {
                me.refreshKarirTab();

            }else if (activeTab.itemId === "trainingTabId") {
                me.refreshTrainingTab();

            }else if (activeTab.itemId === "pengobatanTabId") {
                me.refreshPengobatanTab();
            }else if (activeTab.itemId === "dinasTabId") {
                me.refreshDinasTab();
            }else if (activeTab.itemId === "spTabId") {
                me.refreshSpTab();
            } else {


                //gt.getStore().getProxy().extraParams.month = me._getDate().getMonth();
                gt.doLoad({
                    employee_id: eId
                }, function(rec, operation, success) {
                    g.setLoading(false);
                });
            }

        }




    },
    refreshSpTab:function(){
        var me = this;
       var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var eId = rec.get("employee_id");
        
        var gt = me.getGridsp();
        gt.doInit();
        g.setLoading("Please wait...");
        gt.doLoad({
            employee_id: eId,
        }, function(rec, operation, success) {
            g.setLoading(false);
        });
    },
    refreshTrainingTab:function(){
       var me = this;
       var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var eId = rec.get("employee_id");
        
        var gt = me.getGridtraining();
        gt.doInit();
        g.setLoading("Please wait...");
        gt.doLoad({
            employee_id: eId,
        }, function(rec, operation, success) {
            g.setLoading(false);
        });
        
    },
    refreshDinasTab:function(){
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var eId = rec.get("employee_id");
 

        var gd = me.getGriddinas();
        var gby = me.getGridbiayajalan();
        var gbt = me.getGridbiayatrans();
        var gbe = me.getGridbiayaent();

        gd.doInit();
        gby.doInit();
        gbt.doInit();
        gbe.doInit();
        
        gd.getSelectionModel().setSelectionMode('SINGLE');
        gby.getSelectionModel().setSelectionMode('SINGLE');
        gbt.getSelectionModel().setSelectionMode('SINGLE');
        gbe.getSelectionModel().setSelectionMode('SINGLE');
        
        
        g.setLoading("Please wait...");
        gd.doLoad({
            employee_id: eId,
        }, function(rec, operation, success) {
            g.setLoading(false);
        });
    },
    obatJenisKlaimSc: function() {
        var me = this;
        var gt = me.getGridtanggalklaim();
        var s = gt.getStore();
        var rec = me.getGridjenisklaim().getSelectedRecord();
        if (!rec) {
            return;
        }

        var idJenis = me.tools.intval(rec.get("jenispengobatan_jenispengobatan_id"));
        s.clearFilter();


        console.log(idJenis);
        if (s.getCount() > 0 && idJenis > 0) {


            s.filterBy(function(rec, id) {

                if (rec.get("jenispengobatan_jenispengobatan_id") === idJenis) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    },
    obatTglKlaimSc: function() {
        var me = this;
        var f = me.getFormdata();
        var gt = me.getGridtanggalklaim();
        var s = gt.getStore();
        var rec = gt.getSelectedRecord();
        if (!rec) {
            return;
        }

        f.loadRecord(rec);
        f.down("[name=total_klaim]").setValue(accounting.format(f.down("[name=total_klaim]").getValue()));
        f.down("[name=total]").setValue(accounting.format(f.down("[name=total]").getValue()));
        f.down("[name=saldo]").setValue(accounting.format(f.down("[name=saldo]").getValue()));
        f.down("[name=plafon]").setValue(accounting.format(f.down("[name=plafon]").getValue()));
        f.down("[name=obat_group_code]").setValue(rec.get("group_code"));

    },
    refreshPengobatanTab: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var eId = rec.get("employee_id");
        var year = f.down("[name=tahun_obat]").getValue();

        var gj = me.getGridjenisklaim();
        var gt = me.getGridtanggalklaim();

        gj.doInit();
        gt.doInit();

        gj.getSelectionModel().setSelectionMode('SINGLE');
        gt.getSelectionModel().setSelectionMode('SINGLE');

        g.setLoading("Please wait...");
        gj.doLoad({
            employee_id: eId,
            year: year
        }, function(rec, operation, success) {
            gt.doLoad({
                employee_id: eId,
                year: year
            }, function(rec, operation, success) {
                g.setLoading(false);
            });
        });


    },
    refreshKarirTab: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var eId = rec.get("employee_id");
        var gp = me.getGridpromosi();
        var gm = me.getGridmutasi();
        var gr = me.getGridrotasi();
        var gs = me.getGridstatus();

        me.refreshKarirTabCount = 0;

        gp.doInit();
        gm.doInit();
        gr.doInit();
        gs.doInit();
        g.setLoading("Please wait...");
        gp.doLoad({
            employee_id: eId
        }, function(rec, operation, success) {
            me.refreshKarirTabCount += 1;
            if (me.refreshKarirTabCount === 4) {
                g.setLoading(false);
            }
        });
        gm.doLoad({
            employee_id: eId
        }, function(rec, operation, success) {
            me.refreshKarirTabCount += 1;
            if (me.refreshKarirTabCount === 4) {
                g.setLoading(false);
            }
        });
        gr.doLoad({
            employee_id: eId
        }, function(rec, operation, success) {
            me.refreshKarirTabCount += 1;
            if (me.refreshKarirTabCount === 4) {
                g.setLoading(false);
            }
        });
        gs.doLoad({
            employee_id: eId
        }, function(rec, operation, success) {
            me.refreshKarirTabCount += 1;
            if (me.refreshKarirTabCount === 4) {
                g.setLoading(false);
            }
        });


    },
    refreshAbsenCutiTab: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var rec = g.getSelectedRecord();
        var emId = rec.get("employee_id");
        var year = f.down("[name=tahun_absencuti]").getValue();
        g.setLoading("Please wait...");


        // reset fields
        for (var i = 1; i <= 13; i++) {

            f.down("[name=total_hadir_" + i + "]").setValue("");
            f.down("[name=hadir_normal_" + i + "]").setValue("");
            f.down("[name=hadir_libur_" + i + "]").setValue("");
            f.down("[name=cuti_" + i + "]").setValue("");
            f.down("[name=alpha_" + i + "]").setValue("");
            f.down("[name=sakit_" + i + "]").setValue("");
            f.down("[name=ijin_" + i + "]").setValue("");
            f.down("[name=terlambat_" + i + "]").setValue("");


        }


        f.down("[name=jc_tahunan_absencuti]").setValue("");
        f.down("[name=jc_limatahunan_absencuti]").setValue("");


        // /reset fields

        me.tools.ajax({
            params: {
                employee_id: emId,
                year: year
            },
            success: function(data, model) {

                var bulans = data.others[0][0]["DATA"];
                var jc = data.others[0][0]["DATA_JATAHCUTI"];

                /// jc
                f.down("[name=jc_tahunan_absencuti]").setValue(jc[0] ? jc[0]["sisa"] : "");
                f.down("[name=jc_limatahunan_absencuti]").setValue(jc[1] ? jc[1]["sisa"] : "");
                /// /jc


                var tTotalHadir = 0, tHadirNormal = 0, tHadirLibur = 0, tAlpha = 0, tSakit = 0, tIjin = 0, tTerlambat = 0, tCuti = 0;


                if (bulans) {
                    for (var i in bulans) {

                        f.down("[name=total_hadir_" + bulans[i]['month'] + "]").setValue(bulans[i]['total_hadir']);
                        f.down("[name=hadir_normal_" + bulans[i]['month'] + "]").setValue(bulans[i]['hadir_normal']);
                        f.down("[name=hadir_libur_" + bulans[i]['month'] + "]").setValue(bulans[i]['hadir_libur']);
                        f.down("[name=cuti_" + bulans[i]['month'] + "]").setValue(bulans[i]['cuti']);
                        f.down("[name=alpha_" + bulans[i]['month'] + "]").setValue(bulans[i]['alpha']);
                        f.down("[name=sakit_" + bulans[i]['month'] + "]").setValue(bulans[i]['sakit']);
                        f.down("[name=ijin_" + bulans[i]['month'] + "]").setValue(bulans[i]['izin']);
                        f.down("[name=terlambat_" + bulans[i]['month'] + "]").setValue(bulans[i]['terlambat']);

                        tTotalHadir += bulans[i]['total_hadir'];
                        tHadirNormal += bulans[i]['hadir_normal'];
                        tHadirLibur += bulans[i]['hadir_libur'];
                        tAlpha += bulans[i]['alpha'];
                        tSakit += bulans[i]['sakit'];
                        tIjin += bulans[i]['izin'];
                        tTerlambat += bulans[i]['terlambat'];
                        tCuti += bulans[i]['cuti'];
                    }

                    f.down("[name=total_hadir_13]").setValue(tTotalHadir);
                    f.down("[name=hadir_normal_13]").setValue(tHadirNormal);
                    f.down("[name=hadir_libur_13]").setValue(tHadirLibur);
                    f.down("[name=cuti_13]").setValue(tCuti);
                    f.down("[name=alpha_13]").setValue(tAlpha);
                    f.down("[name=sakit_13]").setValue(tSakit);
                    f.down("[name=ijin_13]").setValue(tIjin);
                    f.down("[name=terlambat_13]").setValue(tTerlambat);


                }

                g.setLoading(false);

            }

        }).read('absentcuti');
    },
    getMainGrid: function() {
        var me = this;
        return me.getGrid();
    },
    panelAfterRender: function(el) {
        var me = this;


        var me = this;
        var p = me.getPanel();
        //  el.up("window").maximize();
        p.down("toolbar button[action=create]").hide();
        p.down("toolbar button[action=edit]").hide();
        p.down("toolbar button[action=save]").hide();
        p.down("toolbar button[action=cancel]").hide();
        p.down("toolbar button[action=delete]").hide();
        p.down("toolbar button[action=print]").hide();

        var gt = me.getGridtaka();
        gt.doInit();

        me.isLoadingParameter = true;
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                me.tools.wesea(data.department, me.getFormsearch().down("[name=department_department_id]")).comboBox();
                me.isLoadingParameter = false;
            }
        }).read('parameter');



    },
    mainDataSave: function() {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();




    },
    storeLoadedAfterSaveUpdate: function() {
        var me = this;

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

            },
            delete: function() {

            },
            new : function() {
                var f = me.getFormdata();
                var d = new Date();

                f.down("[name=start_use]").setValue(d.getFullYear());

                me.leaveGroupOnBlur();
                me.startUseKeyUp();

            }
        }
        return x;
    },
});