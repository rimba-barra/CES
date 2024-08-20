Ext.define('Erems.controller.Spk', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Spk',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    views: ['spk.Panel', 'spk.Grid', 'spk.FormSearch', 'spk.FormData', 'spk.FormDataSelectUnit'],
    refs: [
        {
            ref: 'grid',
            selector: 'spkgrid'
        },
        {
            ref: 'gridu',
            selector: 'spkgridunit'
        },
        {
            ref: 'formsearch',
            selector: 'spkformsearch'
        },
        {
            ref: 'formdata',
            selector: 'spkformdata'
        },
        {
            ref: 'formdatasu',
            selector: 'spkformdataselectunit'
        }
    ],
    controllerName: 'spk',
    formWidth: 800,
    fieldName: 'spk_no',
    bindPrefixName: 'Spk',
    nomMaster: 'main_list',
    nomIdProperty: 'spk_id',
    contractorDetail: null,
    browseHandler: null,
    SPKTYPUNIT: 0,
    dae: {
        unit: null,
        cluster: null,
        block: null
    }, // handel dae
    localStore: {
        detail: null,
        unit: null,
        selectedUnit:null,
    },
    cbf: null,
    mt: null,
    tools: null,
    myConfig: null,
    dataunit: {
        cluster: null,
        block: null,
        unit: null
    },
    dataContractor: null,
    globalParams: {},
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'spkpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'spkgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'spkgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'spkgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'spkgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'spkgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'spkgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'spkgridunit toolbar button[action=addNewDetail]': {
                /*  click: function() {
                 me.showFormUnit("create");
                 }*/
                click: this.browseUnit
            },
            'spkgridunit toolbar button[action=deleteDetail]': {
                click: function() {
                    me.deleteUnitOnClick();
                }
            },
            'spkunitgrid button[action=select]': {
                click: this.unitSelect
            },
            'spkformsearch': {
                afterrender: this.spkformsearchAfterRender
            },
            'spkformsearch button[action=search]': {
                click: this.dataSearch
            },
            'spkformsearch button[action=reset]': {
                click: this.dataReset
            },
            'spkformdata': {
                afterrender: this.formDataAfterRender
            },
            'spkformdata button[action=save]': {
                click: this.mainDataSave
            },
            'spkformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'spkformdata button[action=add_contractor]': {
                click: this.addContractor
            },
            'spkformdata [name=spktype_spktype_id]': {
                select: function(el, val) {
                    me.spktypeOnSelect(el, val);
                }
            },
            'spkformdata [name=contractor_contractor_id]': {
                select: function(el, val) {
                    me.seFi.cb('contractor_code', el, 'code', val);

                    me.loadContractorProfile(el.getValue(), function() {
                        me.getFormdata().setLoading(false);
                    });
                }
            },
            'spkformdata [name=contractor_code]': {
                blur: function(el, e) {
                    /*
                     me.seFi.tf('contractor_contractor_id', el, {
                     name: 'code',
                     tipe: 'id'
                     }, 'contractor_contractor_id');
                     */

                    me.contractorCodeOnKeyUp();



                },
            },
            'spkformdataselectunit [name=cluster_cluster_id]': {
                select: function(el, val) {
                    // me.seFi.cb('cluster_code', el, 'code', val);
                    //  me.filterCBUnit();
                    //   me.filterCBBlock();
                }
            },
            'spkformdataselectunit [name=block_block_id]': {
                select: function(el, val) {
                    //   me.seFi.cb('block_code', el, 'code', val);
                    //  me.filterCBUnit();
                }
            },
            'spkformdataselectunit button[action=reset]': {
                click: this.formdataSuReset
            },
            'spkformdataselectunit button[action=save]': {
                click: this.addUnitToGrid
            },
            'spkformdataselectunit button[action=update]': {
                click: this.addUnitToGrid
            },
            'spkgridunit actioncolumn': {
                click: this.insActionColumnClick
            },
            'spkformdata [name=time_duration]': {
                blur: function() {
                    me.timeDurationOnBlur();
                }
            },
        });
    },
    browseUnit: function(el) {
        var me = this;
        var maxUnit = me.tools.intval(me.globalParams.SPK_MAX_UNIT_NUMBER);
        var unitTotal = me.getGridu().getStore().getCount();
        // if (unitTotal < maxUnit) {

            var browse = new Erems.library.Browse();
            browse.init({
                controller: me,
                view: 'UnitGrid',
                el: el,
                localStore: "selectedUnit",
                mode_read: "selectedUnit"
            });
            browse.showWindow();

            /*
             var browse = new Erems.library.Browse();
             browse.init({
             controller: me,
             view: 'UnitGrid',
             el: el,
             localStore: "customer",
             mode_read: "selectedUnit",
             browseId: 'unitpl'
             });
             browse.showWindow();
             */
        // } else {
        //     me.tools.alert.error("Max unit is " + maxUnit);
        // }

    },
    deleteUnitOnClick: function() {
        var me = this;
        var g = me.getGridu();
        var records = g.getSelectionModel().getSelection();


        if (records.length > 0) {
            for (var i in records) {
                me.deleteUnitFromGrid(records[i]);
            }
        }

    },
    contractorCodeOnKeyUp: function() {
        var me = this;
        var f = me.getFormdata();
        var val = f.down("[name=contractor_code]").getValue();
        var combo = f.down("[name=contractor_contractor_id]");

        combo.getStore().clearFilter(true);

        combo.getStore().filterBy(function(rec, id) {

            if (rec.raw.code.toLowerCase().includes(val.toLowerCase())) {
                return true;
            }
            else {
                return false;
            }
        });
        if (combo.getStore().getCount() > 0) {
            me.tools.comboHelper(combo).setFirstValue();

            me.loadContractorProfile(combo.getValue(), function() {
                me.getFormdata().setLoading(false);
            });

        }

    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        //var p = me.getPanel();
        // p.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var fs = me.getFormsearch();
                me.tools.wesea(data.spktype, fs.down("[name=spktype_id]")).comboBox(true);
                me.tools.wesea(data.contractor, fs.down("[name=contractor_id]")).comboBox(true);
            }
        }).read('detail');

    },
    loadPage: function(store) {
        store.loadPage(1, {
            callback: function(rec, operation, success) {
                if (!me.getGrid().getStore().modelExist) {

                    me.getGrid().attachModel(operation);
                }


            }
        });
        var me = this;
        // me.getGrid().xLoad();
    },
    timeDurationOnBlur: function() {
        var me = this;
        var f = me.getFormdata();
        var bulan = me.tools.intval(f.down("[name=time_duration]").getValue());


        var date = f.down("[name=started]").getValue();
        if (!date) {
            date = new Date();
            f.down("[name=started]").setValue(date);
        }
        date.setMonth(date.getMonth() + bulan);
        f.down("[name=ended]").setValue(date);

    },
    addContractor: function() {
        this.tools.iNeedYou(this).showWindow('Mastercontractor', {title: 'Create New Contractor'});
    },
    afterAddNewFromOutside: function(controllerId) {
        var me = this;
        var f = me.getFormdata();
        var win = Ext.getCmp(_Apps.getController(controllerId).formxWinId);
        if (win) {
            win.close();
        }
        f.setLoading("Refreshing...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {


                me.fillFormComponents(data, f);

                f.setLoading(false);

            }
        }).read('detail');
    },
    mainDataSave: function() {
        var me = this;
        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.getGrid().getStore(),
            finalData: function(data) {

                //data["pricetype_id"] = data["pricetype_pricetype_id"];
                var f = me.getFormdata();
                me.tools.money(f).clearFields(data);

                if (data["spktype_spktype_id"] === me.SPKTYPUNIT) {

                    data["detail"] = me.tools.gridHelper(me.getGridu()).getJson();
                }
                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                }
            }
        });
    },
    insACC: function(view, action, row) {
        var me = this;
        var grid = view.up("grid");

        switch (grid.itemId) {
            case "SPKGridUnit":
                if (action == "destroy") {
                    me.deleteUnitFromGrid(row);
                }
                break;
        }
    },
    deleteUnitFromGrid: function(row) {
        var me = this;
        var gu = me.getGridu();

        var record = typeof row === "object" ? row : gu.getStore().getAt(row);
        var id = me.tools.intval(record.get("spkdetail_id"));
        if (id > 0) {
            me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), record.get("spkdetail_id"));
        }
        if (typeof row === "object") {
            gu.getStore().remove(row);
        } else {
            gu.getStore().removeAt(row);
        }


        me.updateTotalUnit();



    },
    alertError: function(msg) {
        var me = this;
        me.instantWindow('Alert', 200, 'Alert', 'alert', 'myAlertWindow');
        var panel = Ext.getCmp('MyAlertWinId');
        panel.add({
            html: msg,
            bodyStyle: 'background:none;border:0px'
        });
    },
    unitSelect: function() {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItemB(function(grid, store, recs) {
                console.log(recs);
                var gu = me.getGridu();
                var maxUnit = me.tools.intval(me.globalParams.SPK_MAX_UNIT_NUMBER);


                // if (recs.length + gu.getStore().getCount() > maxUnit) {
                //     me.tools.alert.warning("Max unit for spk is " + maxUnit);
                //     return;
                // }

                if (recs.length > 0) {


                    var msgWarning = "";

                    var maxSpkforUnit = me.tools.intval(me.globalParams.SPK_MAX_EACH_UNIT);
                    var maxActive = me.tools.intval(me.globalParams.SPK_ACTIVE_EACH_UNIT);

                    for (var i in recs) {
                        var rec = recs[i];
                        var indexExist = gu.getStore().findExact('unit_unit_id', me.tools.intval(rec.get("unit_id")));
                        console.log(rec.get("unit_id"));
                        console.log(indexExist);
                        if (indexExist > -1) {

                            //  me.alertError('Unit already added in grid');
                            msgWarning += "Unit " + rec.get("unit_number") + " already added in grid,";

                        } else {
                            /// spk active for this unit


                            if (me.tools.intval(rec.get("eo_spkactive")) >= maxActive) {

                                // me.alertError("Max spk active per unit is " + maxActive);
                                msgWarning += "Max spk active per unit is " + maxActive + " for " + rec.get("unit_number") + ",";

                            } else if (me.tools.intval(rec.get("eo_spkcount")) >= maxSpkforUnit) {

                                //  me.alertError("Max spk per unit is " + maxSpkforUnit);
                                msgWarning += "Max spk per unit is " + maxSpkforUnit + " for " + rec.get("unit_number") + ",";
                            } else {
                                gu.getStore().add({
                                    cluster_cluster: rec.get("cluster_cluster"),
                                    block_block: rec.get("block_block"),
                                    unit_unit_number: rec.get("unit_number"),
                                    unit_unit_id: rec.get("unit_id")
                                });
                            }



                        }


                    }

                    grid.up("window").close();

                    if (msgWarning.length > 0) {
                        me.tools.alert.warning(msgWarning);
                    }

                    me.updateTotalUnit();



                }

                return;


            });
        }

    },
    
    fillGlobalParams: function(data) {
        var me = this;
        me.globalParams = {};
        me.globalParams = data;
    },
    loadUnitInformation: function(spkId) {
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Loading block list information...");
        me.tools.ajax({
            params: {},
            success: function(d, m) {

                me.dataunit.block = {model: null, data: null};
                me.dataunit.block.model = m;
                me.dataunit.block.data  = d;
                f.setLoading("Loading unit...");
                me.tools.ajax({
                    params  : { spk_id : spkId },
                    success : function(db, mb) {
                        me.dataunit.unit = {model: null, data: null};
                        me.dataunit.unit.model = mb;
                        me.dataunit.unit.data = db;
                        f.setLoading(false);

                    }
                }).read('unitlist');
            }
        }).read('blocklist');
    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var sg = me.getGridu();

        me.mt = new Erems.library.ModuleTools();


        var x = {
            init: function() {
                me.setActiveForm(me.getFormdata());



                sg.doInit();



                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'SPKDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'spk_id'
                });

                me.tools.money(f).addCurrencyEvent();

                f.down("[name=spk_no]").setReadOnly(false);
                me.showSH1fields(f);


            },
            create: function() {
                me.spktypeOnSelect(null, null);
                f.setLoading("Please wait.. loading components");

                f.down("[name=progress]").setValue("0");
                f.down("[name=job_fee]").setValue("0.00");

                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        if(typeof data.contractor != 'undefined'){
                            me.dataContractor = data.contractor.data;
                        }

                        me.fillFormComponents(data, f);
                        me.fillGlobalParams(data['others'][0][0]['GLOBALPARAMSPARAMS']);
                        me.SPKTYPUNIT = data['others'][0][0]['SPKTYPE_UNIT'];

                        me.dataunit.cluster = {data: null, model: null};
                        if(typeof data.cluster != 'undefined'){
                            me.dataunit.cluster.data  = data.cluster.data;
                            me.dataunit.cluster.model = data.cluster.model;
                        }

                        me.loadUnitInformation(0);

                        me.tools.ajax({
                            params: {},
                            success: function(schdata, schmodel) {
                                me.tools.wesea({
                                    data: schdata,
                                    model: schmodel
                                }, sg).grid();
                                f.setLoading(false);
                            }
                        }).read('spklist');
                        var d = new Date();
                        d.setMonth(d.getMonth() + 1);
                        f.down("[name=ended]").setValue(d);
                        f.down("[name=time_duration]").setValue(1);
                    }
                }).read('detail');
            },
            update: function() {
                var rec = me.getGrid().getSelectedRecord();
                var plId = rec.get("spk_id");
                f.editedRow = me.getGrid().getSelectedRow();
                f.setLoading("Loading...");
                if (rec.get("status") !== "OPEN") {
                    var gridu = me.getGridu();
                    if (gridu) {
                        gridu.setDisabled(true);
                    }
                    var vs = f.getForm().getValues();
                    var ar = ["contractor_contractor_id", "spktype_spktype_id"];
                    for (var i in ar) {
                        f.down("[name=" + ar[i] + "]").setReadOnly(true);

                    }
                    for (var i in vs) {
                        f.down("[name=" + i + "]").setReadOnly(true);

                    }
                    f.down("button[action=save]").setDisabled(true);
                }
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {

                        if(typeof data.contractor != 'undefined'){
                            me.dataContractor = data.contractor.data;
                        }

                        me.fillFormComponents(data, f);
                        me.fillGlobalParams(data['others'][0][0]['GLOBALPARAMSPARAMS']);
                        me.SPKTYPUNIT = data['others'][0][0]['SPKTYPE_UNIT'];

                        me.dataunit.cluster = {data: null, model: null};
                        if(typeof data.cluster != 'undefined'){
                            me.dataunit.cluster.data = data.cluster.data;
                            me.dataunit.cluster.model = data.cluster.model;
                        }

                        me.loadUnitInformation(rec.get("spk_id"));

                        me.fillFormComponents(data, f);
                        f.loadRecord(rec);
                        f.down("[name=jumlah_unit]").setValue(rec.get("jumlah_unit"));

                        //f.setLoading("Request Spk information...");
                        var spktypeId = rec.get("spktype_spktype_id");

                        if (spktypeId === me.SPKTYPUNIT) {
                            /// load detail

                            me.getGridu().doInit();
                            me.getGridu().getStore().getProxy().setExtraParam("spk_id", plId);
                            me.getGridu().getStore().load({
                                params: {
                                    mode_read: 'spklist',
                                    spk_id: plId
                                },
                                callback: function(data, model) {

                                    me.getGridu().attachModel(model);
                                    me.getGridu().down("pagingtoolbar").doRefresh();



                                    //   me.hitungTotalUnit();


                                    //var pt = me.getGridu().down("pagingtoolbar"); /// pagingtoolbar
                                    //pt.bindStore(me.getGridu().getStore());
                                    // me.calculatesumUnit();
                                }
                            });

                            /*		
                             me.tools.ajax({
                             params: {
                             spk_id: plId
                             },
                             success: function(schdata, schmodel) {
                             
                             
                             
                             me.tools.wesea({
                             data: schdata,
                             model: schmodel
                             }, sg).grid();
                             
                             me.loadContractorProfile(rec.get("contractor_contractor_id"), function() {
                             f.setLoading(false);
                             });
                             
                             me.calculatesumUnit();	
                             
                             }
                             }).read('spklist');
                             
                             */


                            /* start added by ahmad riadi */
                            /*
                             me.getGridu().doInit();
                             me.getGridu().getStore().load({
                             params: {
                             mode_read: 'spklist',
                             spk_id: plId,
                             page: 1,
                             limit: 25,
                             },
                             callback: function(data, model) {
                             var storepage;
                             me.getGridu().attachModel(model);
                             me.calculatesumUnit();
                             }
                             });
                             */
                            /* start end by ahmad riadi */

                            me.loadContractorProfile(f.down("[name=contractor_contractor_id]").getValue(), function() {
                                me.getFormdata().setLoading(false);
                            });


                        } else {

                            me.spktypeOnSelect(null, null);

                            me.loadContractorProfile(rec.get("contractor_contractor_id"), function() {
                                f.setLoading(false);
                            });
                        }


                    }
                }).read('detail');
            }
        };
        return x;
    },
    loadContractorProfile: function(contractorId, callback) {
        var me = this;

        var f = me.getFormdata();

        if (me.dataContractor.length > 0) {
            var find = me.dataContractor.find(function(field) {

                return field.contractor_id == contractorId;
            });
            if (find) {
                for (var x in find) {
                    var el = f.down("[name=contractor_" + x + "]");
                    if (el) {
                        el.setValue(find[x]);
                    }
                }
            }
        }


        return;

        var f = me.getFormdata();
        f.setLoading("Load contractor profile..");
        me.tools.ajax({
            params: {
                // spk_id: plId
                contractor_id: contractorId
            },
            success: function(data, model) {
                /* start edited by ahmad riadi 04-01-2017*/
                if (typeof data[0] === 'undefined') {
                    me.Warningalert("Contractor code is undefined");
                    f.setLoading(false);
                } else {
                    var d = data[0]['contractor'];
                    if (d) {
                        for (var x in d) {
                            var el = f.down("[name=contractor_" + x + "]");
                            if (el) {
                                el.setValue(d[x]);
                            }
                        }
                    }
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
                /* end edited by ahmad riadi 04-01-2017*/
            }}).read('contractordetail');
    },
    showFormUnit: function(state) {
        var s = typeof state === "undefined" ? "create" : state;
        var me = this;
        me.instantWindow('FormDataSelectUnit', 500, 'Select Unit', s, 'mySelectUnitWindow');
        var fd = me.getFormdatasu();
        fd.setLoading("Please wait...");

        me.tools.wesea(me.dataunit.cluster, fd.down("[name=cluster_cluster_id]")).comboBox(true);
        me.tools.wesea(me.dataunit.block, fd.down("[name=block_block_id]")).comboBox(true);
        me.tools.wesea(me.dataunit.unit, fd.down("[name=unit_unit_id]")).comboBox(true);

        fd.setLoading(false);

    },
    spktypeOnSelect: function(el, val) {
        ///listUnitContainer
        var me = this;
        var f = me.getFormdata();
        var luc = f.down("#listUnitContainer");

        var spkUnitId = me.SPKTYPUNIT;
        if (f.down("[name=spktype_spktype_id]").getValue() == spkUnitId) {
            luc.show();
        } else {
            luc.hide();
        }
    },
    spkformsearchAfterRender: function() {

        var me = this;

        /*
         
         var z = function() {
         
         var ar = ['spktype_id', 'contractor_id'];
         
         var arx = ['spktype', 'contractor'];
         for (var x in ar) {
         var y = me.getFormsearch().down("[name='" + ar[x] + "']");
         
         y.createStore(me, arx[x]);
         y.getStore().load();
         }
         
         }
         //jika model - model selesai dijalankan
         if (this.acmoDone) {
         z();
         } else { // jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc
         this.acmoArrayFuncs.push(z());
         }
         */





    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.spktype, form.down("[name=spktype_spktype_id]")).comboBox();
        me.tools.wesea(data.contractor, form.down("[name=contractor_contractor_id]")).comboBox();
    },
    dataDestroy: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();

        //cek status spk
        for (var i in rows) {
            if (rows[i].get("status") !== "OPEN") {
                rows.splice(i);
            }
        }


        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected (with status OPEN)!');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();

                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    updateTotalUnit: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=jumlah_unit]").setValue(me.getGridu().getStore().getCount());

    },
    showSH1fields: function (f){
        var me = this;
        me.tools.ajax({
            params: {},
            success: function (data) {
                if(data.others[0][0].SPKCODE==0){ //0 default = visible
                     f.down("[name=code]").setVisible(true);
                }
            }
        }).read('isSh1Features');
    }


});