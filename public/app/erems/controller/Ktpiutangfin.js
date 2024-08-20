Ext.define('Erems.controller.Ktpiutangfin', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Ktpiutangfin',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['ktpiutangfin.Panel', 'ktpiutangfin.Grid', 'ktpiutangfin.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'ktpiutangfingrid'
        },
        {
            ref: 'formdata',
            selector: 'ktpiutangfinformdata'
        },

        {
            ref: 'panel',
            selector: 'ktpiutangfinpanel'
        },
        {
            ref: 'formsearch',
            selector: 'ktpiutangfinformsearch'
        },
        {
            ref: 'gridgl',
            selector: 'ktpiutangfingridgl'
        },
        {
            ref: 'gridpurc',
            selector: 'ktpiutangfingridpurc'
        },
    ],
    controllerName: 'ktpiutangfin',
    fieldName: 'payment_id',
    formWidth: 800,
    fillForm: null,
    unitFormula: null,
    paymentFunc: null,
    browseHandler: null,
    dateNow: new Date(),
    flaggeneratevoucherno: 0,
    state: null,
    accept_date: null,
    pt_id: 0,
    stData: {},
    bindPrefixName: 'Ktpiutangfin',
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tagihanDefaultValue: false,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    stList: null, // list of schedule type
    effectedSch: [], // list schedule id yang dibayar
    formxWinId: 'win-instalpaymentwinId',
    paymentId: 0,

    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    xyReport: null,
    printOutData: null,
    globalParams: null,
    globalParamsForm: null,
    selectedPurchaseletter: null,
    myParams: {
        paymentteks: null,
        global: null
    },
    init: function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

                if (typeof ApliJs === "undefined") {
                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

                        //   console.log("[INFO] ApliJs loaded.");

                    }, function () {
                        // error load file
                    });
                }


            }, function () {
                //  me.tools.alert.warning("Error load Prolibs.js file.");
            });

        }

        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
            }, function () {
            });
        }

        this.control({
            'ktpiutangfinpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.ktpfinPanelAfterRender

            },
            'ktpiutangfingrid': {
                 afterrender: this.gridAfterRender,
                /*
                afterrender: function () {
                    me.getGrid().on('afteredit', function (editor, e) {
                        me.ktpfinUpdateGrid(editor, e);

                    });

                },
            */
                gridcellchanging:function(a,b,c){
                    console.log(a);
                    console.log(b);
                    console.log(c);
                },
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.ktpfinGridSelectionChange
            },

            'ktpiutangfinformsearch button[action=search]': {
                click: this.dataSearch
            },
            'ktpiutangfinformsearch button[action=reset]': {
                click: this.dataReset
            },
            'ktpiutangfingridgl combobox[name=year]': {
                select: function () {
                    me.ktpfinSelectYear();
                }
            },
            'ktpiutangfingridpurc combobox[name=cluster_id]': {
                select: function () {
                    me.ktpfinSelectCluster();
                }
            },
            'ktpiutangfingridpurc combobox[name=unit_id]': {
                select: function () {
                    me.ktpfinSelectUnit();
                }
            },
            'ktpiutangfingrid button[action=tarik_data]': {
                click: function () {
                    me.ktpfinTarikData();
                }
            },
            'ktpiutangfingrid button[action=batal_data]': {
                click: function () {
                    me.ktpfinBatalData();
                }
            },
            'ktpiutangfingridpurc': {
                selectionchange: this.ktpfinGSelecChange
            },
            'ktpiutangfingrid button[action=print]': {
                click: function () {
                    me.ktpfinPrintData();
                }
            },

        });
    },
    ktpfinUpdateColumnGrid:function(field, value, oldValue){
        var me = this;
        var cols = [false,false,false,false];
        if(field.name==="flag_sj" && value){
            cols[0] = true;
        }
        if(field.name==="flag_pj0" && value){
            cols[1] = true;
        }
        if(field.name==="flag_pph_partner" && value){
            cols[2] = true;
        }
        if(field.name==="flag_pph_owner" && value){
            cols[3] = true;
        }
        /*
        var rec = me.getGrid().getSelectedRecord();
       if(rec){
           
          rec.beginEdit();
          rec.set({
              flag_sj:cols[0],
               flag_pj0:cols[1],
                flag_pph_partner:cols[2],
                 flag_pph_owner:cols[3]
          });
          rec.endEdit();
       }
        */
       
      // console.log(field.up("panel"));
      
      field.up("panel").items.items[1].setValue(cols[0]);
       field.up("panel").items.items[2].setValue(cols[1]);
        field.up("panel").items.items[3].setValue(cols[2]);
         field.up("panel").items.items[4].setValue(cols[3]);
      
       console.log(field.name);
       console.log(value);
    },
    ktpfinUpdateGrid: function () {
       var me = this;
       var rec = me.getGrid().getSelectedRecord();
       if(rec){
           me.ktpfinGridUpdateRecord();
       }
       
       // me.ktpfinGridUpdateRecord();

    },
    ktpfinGridUpdateRecord: function () {
        var me = this;

        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            me.tools.ajax({
                params: {
                    unit_unit_id: rec.get("unit_unit_id"),
                    no_vch: rec.get("no_vch"),
                    kode_acc: rec.get("kode_acc"),
                    flag_sj: rec.get("flag_sj")?1:0,
                    flag_pj0: rec.get("flag_pj0")?1:0,
                    flag_pph_partner: rec.get("flag_pph_partner")?1:0,
                    flag_pph_owner: rec.get("flag_pph_owner")?1:0
                },
                success: function (data, model) {

                }
            }).read('update');
        }
    },
    ktpfinGridSelectionChange: function () {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();
        if (rec) {
            me.getFormdata().loadRecord(rec);
        }

    },
    ktpfinPrintData: function () {
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");


        Ext.Ajax.timeout = 60000 * 5;

        var rec = me.getGridpurc().getSelectedRecord();



        me.tools.ajax({
            params: {
                unit_id: rec.get("unit_unit_id"),
                purchaseletter_id: rec.get("purchaseletter_id")
            },
            success: function (data, model) {
                console.log(data);
                console.log(model);
                p.setLoading(false);
                var url = data['URL'];
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
        }).read('excel');

    },
    ktpfinGSelecChange: function () {
        var me = this;

        var rec = me.getGridpurc().getSelectedRecord();

        me.getGridpurc().setDisabled(true);



        me.getGrid().getStore().getProxy().setExtraParam("unit_id", rec.get("unit_unit_id"));
        me.getGrid().getStore().loadPage(1, {
            callback: function (rec, op) {
                me.getGridpurc().setDisabled(false);
            }
        });

    },
    ktpfinBatalData: function () {
        var me = this;
        var recs = me.getGrid().getSelectionModel().getSelection();
        for (var i in recs) {
            me.getGrid().getStore().remove(recs[i]);
        }

        /// cek jika sudah terdaftar di database
        var rec = recs[0];
        // var idRecord = me.tools.intval(rec.get("kartupiutangacc_id"));

        me.getGrid().down("button[action=tarik_data]").setDisabled(true);
        me.getGrid().down("button[action=batal_data]").setDisabled(true);
        me.getGrid().down("#KtPiutanglabelToolbarID").setText("Sedang meghapus record ....");
        //
        me.tools.ajax({
            params: {
                unit_unit_id: rec.get("unit_unit_id"),
                no_vch: rec.get("no_vch"),
                kode_acc: rec.get("kode_acc")

            },
            success: function (data, model) {

                me.getGrid().down("button[action=tarik_data]").setDisabled(false);
                me.getGrid().down("button[action=batal_data]").setDisabled(false);
                me.getGrid().down("#KtPiutanglabelToolbarID").setText(" ");




            }
        }).read('delete');




    },
    ktpfinTarikData: function () {
        var me = this;
        var g = me.getGrid();

        //validasi
        var unit = me.getGridpurc().getSelectedRecord();
        // console.log(unit);

        var jurnals = me.getGridgl().getSelectionModel().getSelection();
        // console.log(jurnals);

        if (!unit) {
            me.tools.alert.warning("Silahkan memilih unit terlebih dahulu.");
            return;
        }
        if (jurnals.length == 0) {
            me.tools.alert.warning("Silahkan memilih jurnal terlebih dahulu.");
            return;
        }
        var countFound = 0;
        var dataInsert = [];
        for (var i in jurnals) {
            // console.log(jurnals[i]);

            var found = g.getStore().findBy(
                    function (record, id) {
                        if (record.get('no_vch') === jurnals[i].get("no_vch") && record.get('kode_acc') === jurnals[i].get("kode_acc")) {
                            return true;
                        }
                        return false;
                    }
            );

            //  console.log(found);
            console.log(unit);

            if (found < 0) {
                var newData = {

                    unit_unit_number: unit.get("unit_unit_number"),
                    cluster_code: unit.get("cluster_code"),
                    unit_unit_id: unit.get("unit_unit_id"),
                    tgl_vch: jurnals[i].get("tgl_vch"),
                    no_vch: jurnals[i].get("no_vch"),
                    kode_acc: jurnals[i].get("kode_acc"),
                    sub_kode_sub: jurnals[i].get("sub_kode_sub"),
                    ket: jurnals[i].get("ket"),
                    mutasi: jurnals[i].get("mutasi"),
                    sts_mutasi: jurnals[i].get("sts_mutasi"),
                    flag_sub: jurnals[i].get("flag_sub")
                };
                dataInsert.push(newData);
                g.getStore().add(newData);
            } else {
                countFound++;
            }


        }

        if (countFound === jurnals.length) {
            me.tools.alert.warning("Jurnal sudah terdaftar di kartupiutang ACC");
        }

        // me.getGridpurc().getSelectionModel().deselectAll();
        me.getGridgl().getSelectionModel().deselectAll();

        // save ke database
        me.getGrid().down("button[action=tarik_data]").setDisabled(true);
        me.getGrid().down("button[action=batal_data]").setDisabled(true);
        me.getGrid().down("#KtPiutanglabelToolbarID").setText("Sedang menyimpan record ....");
        //
        me.tools.ajax({
            params: {
                data: Ext.encode(dataInsert)
            },
            success: function (data, model) {

                me.getGrid().down("button[action=tarik_data]").setDisabled(false);
                me.getGrid().down("button[action=batal_data]").setDisabled(false);
                me.getGrid().down("#KtPiutanglabelToolbarID").setText(" ");

            }
        }).read('save');



    },
    ktpfinSelectUnit: function () {
        var me = this;
        var unitId = me.getGridpurc().down("combobox[name=unit_id]").getValue();
        me.getGridpurc().getStore().getProxy().setExtraParam("unit_id", unitId <= 0 ? 0 : unitId);
        me.getGridpurc().getStore().loadPage(1);
    },
    ktpfinSelectCluster: function () {
        var me = this;
        var us = me.getGridpurc().down("combobox[name=unit_id]").getStore();
        var clusterId = me.getGridpurc().down("combobox[name=cluster_id]").getValue();
        // console.log(me.getGridpurc().down("combobox[name=cluster_id]").getValue());

        us.clearFilter(); // ms.clearFilter(); -> kalau tidak berefek.
        // var count = 0;
        var recTopId = "-1";
        if (clusterId > 0) {
            us.filterBy(function (rec, id) {

                if (rec.get("cluster_cluster_id") === clusterId || me.tools.intval(rec.get("cluster_cluster_id")) === 0) {
                    /*
                     if(count==0){
                     recTopId = rec.get("unit_id")
                     }
                     count++;
                     */
                    return true;
                } else {
                    return false;
                }
            });

        }
        me.getGridpurc().down("combobox[name=unit_id]").setValue(recTopId);


        me.getGridpurc().getStore().getProxy().setExtraParam("cluster_id", clusterId <= 0 ? 0 : clusterId);
        me.getGridpurc().getStore().getProxy().setExtraParam("unit_id", 0);

        me.getGridpurc().getStore().loadPage(1);




    },
    ktpfinSelectYear: function () {
        var me = this;
        var year = me.getGridgl().down("combobox[name=year]").getValue();
        me.getGridgl().getStore().getProxy().setExtraParam("year", year);
        me.getGridgl().getStore().load(
                {
                    callback: function (rec, op) {
                        me.getGridgl().attachModel(op);
                        var pg = me.getGridgl().down("pagingtoolbar");
                        if (pg) {
                            pg.getStore().load();
                        }


                    }
                });


    },
    ktpfinPanelAfterRender: function (el) {
        var me = this;



        var limit = 100;
        // GL
        me.getGridgl().doInit();
        me.getGridgl().getStore().getProxy().setExtraParam("limit", limit);
        me.getGridgl().getStore().getProxy().setExtraParam("year", me.getGridgl().down("combobox[name=year]").getValue());
        me.getGridgl().getStore().pageSize = limit;
        me.getGridgl().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGridgl().attachModel(op);
                var pg = me.getGridgl().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }


            }
        });

        // PURCHASELETTER
        me.getGridpurc().getSelectionModel().setSelectionMode('SINGLE');
        me.getGridpurc().doInit();

        me.getGridpurc().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGridpurc().attachModel(op);
                var pg = me.getGridpurc().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }


            }
        });

        // KARTU PIUTANG ACC
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        me.getGrid().doInit();

        me.getGrid().getStore().load({
            params: {},
            callback: function (rec, op) {
                me.getGrid().attachModel(op);
                var pg = me.getGrid().down("pagingtoolbar");
                if (pg) {
                    pg.getStore().load();
                }


            }
        });

        $('.myktpiutangcheckbox').change(function () {
            if ($(this).prop("checked")) {
                console.log("Checked berhasil");
                console.log($(this));
                return;
            }
        });


        $.ajax({
            method: "POST",
            url: "erems/ktpiutangfin/read/",
            data: {mode_read: "panelinit2"}
        }).done(function (msg) {
            console.log(msg);
            me.tools.weseaB(msg.maindata.cluster, me.getGridpurc().down("combobox[name=cluster_id]")).comboBox(true);
            me.tools.weseaB(msg.maindata.unit, me.getGridpurc().down("combobox[name=unit_id]")).comboBox(true);
        }).fail(function () {
            console.log("Panel init 2 fail");
        });


        el.up("window").maximize();

        me.getGrid().on('edit', function (editor, e) {

            e.record.commit();
            if (e.record.data.flag_pj) {
                e.record.beginEdit();
                e.record.set({
                    flag_pj: 0,
                    flag_pph_partner: 0,
                    flag_pph_owner: 0,

                });
                e.record.endEdit();
                e.record.commit();
            }
        });

    },
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    gridAfterRender: function (configs) {
        // this.callParent(arguments);
        var me = this;


    },
    showFormdata: function (action) {
        var me = this;


    },

});

/*
 function ktPiutangFinsetTableBody()
 {
 $(".grid-ku .table-body").height($(".grid-ku .inner-container").height() - $(".grid-ku .table-header").height());
 }
 */
