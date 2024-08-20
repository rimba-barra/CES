Ext.define('Erems.controller.Historysuratperingatan', {
    extend: 'Erems.library.template.controller.Controller',
    //    extend: 'Erems.library.template.controller.Controlleralt',
    requires: ['Erems.library.DetailtoolAll'],
    alias: 'controller.Historysuratperingatan',
    requires:['Erems.library.template.component.Clustercombobox'],
    views: ['historysuratperingatan.Panel', 'historysuratperingatan.Grid', 'historysuratperingatan.FormSearch', 'historysuratperingatan.GridSpr'],
    stores: ['Historysuratperingatan', 'Historysuratperingatandetail', 'Masterparameterglobal','Mastercluster'],
    models: ['Historysuratperingatan', 'Historysuratperingatandetail','Mastercluster'],
    detailTool: null,
    detailTool2: null,
    refs: [
        {
            ref: 'panel',
            selector: 'historysuratperingatanpanel'
        },
        {
            ref: 'grid',
            selector: 'historysuratperingatangrid'
        },
        {
            ref: 'gridspr',
            selector: 'historysuratperingatangridspr'
        },
        {
            ref: 'formsearch',
            selector: 'historysuratperingatanformsearch'
        },
    ],
    //    comboBoxIdEl: ['fs_cluster_id','fs_block_id'],
    controllerName: 'historysuratperingatan',
    fieldName: 'berkas',
    bindPrefixName: 'Historysuratperingatan',
    formWidth: 800,
    ctrler: '', //for get controller on browse item
    spcreq: '', //for get param_spcreq on browse item
    mnuname: '',
    sprIndex: 0,
    init: function (application) {
        var me = this;
        this.control({
            'historysuratperingatanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'historysuratperingatangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'historysuratperingatangrid toolbar button[action=cetak]': {
                click: this.cetakSpr
            },
            'historysuratperingatangrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },

            'historysuratperingatanformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'historysuratperingatanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'historysuratperingatanformsearch button[action=reset]': {
                click: this.dataReset
            },

            'historysuratperingatangridspr': {
                selectionchange: this.gridSprSelectionChange
            },
            'historysuratperingatangridspr toolbar button[action=cetak]': {
                // click: this.formDataSprView
                // click: this.cetakSpr
            },


        });
    },

    cetakSpr: function () {
        var me = this;

        var globalparameterStore = me.getMasterparameterglobalStore();
        globalparameterStore.removeAll();
        globalparameterStore.load({ params: { parametername: 'PRINTOUT_SURATPERINGATAN_DOC' } });

        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        //        console.log(record.data);
        var id = record.data.purchaseletter_id + ',' + record.data.suratperingatan_id + ',' + record.data.suratperingatan_index;
        //        console.log(id)
        me.documentPrintout(id, 'erems/historysuratperingatan/read');

        var combo = Ext.getCmp('cbPrintoutID');
        combo.bindStore(globalparameterStore);
    },
    // cetakSpr: function () {
    //     var me = this;
    //     var rec = me.getGrid().getSelectedRecord();
    //     console.log(rec);
    //     Ext.Ajax.request({
    //         url: 'erems/suratperingatan/read',
    //         params: {
    //             mode_read: 'printout',
    //             purchaseletter_id: rec.data.purchaseletter_id,
    //             suratperingatan_id: rec.data.suratperingatan_id,
    //             suratperingatan_index: rec.data.suratperingatan_index
    //         },
    //         success: function (response) {
    //             try {
    //                 var resp = response.responseText;

    //                 if (resp) {
    //                     var info = Ext.JSON.decode(resp);

    //                     if (info.success == true) {
    //                         me.getGrid().up('window').body.unmask();
    //                         Ext.Msg.show({
    //                             title: 'Info',
    //                             msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
    //                             icon: Ext.Msg.INFO,
    //                             //buttons: [], //jika ingin tidak ada buttons
    //                             buttons: Ext.Msg.CANCEL,
    //                             buttonText:
    //                             {
    //                                 cancel: 'Close',
    //                             }
    //                         });
    //                     } else {
    //                         me.getGrid().up('window').body.unmask();
    //                         Ext.Msg.show({
    //                             title: 'Failure',
    //                             msg: 'Error: Create Document Failed.',
    //                             icon: Ext.Msg.ERROR,
    //                             buttons: Ext.Msg.OK
    //                         });
    //                     }
    //                 }
    //             } catch (e) {
    //                 //console.error(e);
    //                 me.getGrid().up('window').body.unmask();
    //                 Ext.Msg.show({
    //                     title: 'Failure',
    //                     msg: 'Error: Create Document Failed.',
    //                     icon: Ext.Msg.ERROR,
    //                     buttons: Ext.Msg.OK
    //                 });
    //             }
    //         },
    //         failure: function (e) {
    //             //console.error(e);
    //             me.getGrid().up('window').body.unmask();
    //             Ext.Msg.show({
    //                 title: 'Failure',
    //                 msg: 'Error: Create Document Failed.',
    //                 icon: Ext.Msg.ERROR,
    //                 buttons: Ext.Msg.OK
    //             });
    //         }

    //     });
    // },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnCetak').setDisabled(row.length != 1);

        var gridspr = me.getGridspr();
        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return false;
        }
        console.log(rec)

        var p = me.getPanel();
        p.setLoading("Please wait...");
        gridspr.getStore().load({
            params: {
                suratperingatan_id: rec.get("suratperingatan_id"),
                mode_read: 'suratperingatan_detail'
            },
            callback: function (rec, op) {
                //                gd.attachModel(op);
                p.setLoading(false);
            }
        });

    },
    panelAfterRender: function () {

    },



});