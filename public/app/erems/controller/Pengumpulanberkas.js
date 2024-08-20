Ext.define('Erems.controller.Pengumpulanberkas', {
    extend: 'Erems.library.template.controller.Controller',
    //    extend: 'Erems.library.template.controller.Controlleralt',
    requires: ['Erems.library.DetailtoolAll','Erems.library.template.component.Citycombobox','Erems.library.template.component.Blockcombobox'],
    alias: 'controller.Pengumpulanberkas',
    views: ['pengumpulanberkas.Panel', 'pengumpulanberkas.Grid', 'pengumpulanberkas.FormSearch', 'pengumpulanberkas.FormData', 'pengumpulanberkas.GridDetail', 'pengumpulanberkas.GridSpr', 'pengumpulanberkas.FormDataDetail', 'pengumpulanberkas.FormDataSpr', 'pengumpulanberkas.GridSprDetail'],
    stores: ['Pengumpulanberkas', 'Pengumpulanberkasspr', 'Pengumpulanberkasdetail', 'Purchaseletterberkas', 'Purchaseletterdetail', 'Masterberkas', 'Masterparameterglobal','Mastercluster','Masterblock'],
    models: ['Pengumpulanberkas', 'Purchaseletter','Masterblock'],
    detailTool: null,
    detailTool2: null,
    refs: [
        {
            ref: 'panel',
            selector: 'pengumpulanberkaspanel'
        },
        {
            ref: 'grid',
            selector: 'pengumpulanberkasgrid'
        },
        {
            ref: 'gridspr',
            selector: 'pengumpulanberkasgridspr'
        },
        {
            ref: 'formsearch',
            selector: 'pengumpulanberkasformsearch'
        },
        {
            ref: 'formdata',
            selector: 'pengumpulanberkasformdata'
        },
        {
            ref: 'detailgrid',
            selector: 'pengumpulanberkasgriddetail'
        },
        {
            ref: 'formdatadetail',
            selector: 'pengumpulanberkasformdatadetail'
        },
        {
            ref: 'formdataspr',
            selector: 'pengumpulanberkasformdataspr'
        },
        {
            ref: 'gridsprdetail',
            selector: 'pengumpulanberkasgridsprdetail'
        },
    ],
    //    comboBoxIdEl: ['fs_cluster_id','fs_block_id'],
    controllerName: 'pengumpulanberkas',
    fieldName: 'berkas',
    bindPrefixName: 'Pengumpulanberkas',
    formWidth: 800,
    ctrler: '', //for get controller on browse item
    spcreq: '', //for get param_spcreq on browse item
    mnuname: '',
    sprIndex: 0,
    paramnosuratberkas: 0,
    paramnosprberkas: 0,
    init: function (application) {
        var me = this;
        this.control({
            'pengumpulanberkaspanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'pengumpulanberkasgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'pengumpulanberkasgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'pengumpulanberkasgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'pengumpulanberkasgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'pengumpulanberkasgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'pengumpulanberkasgrid toolbar button[action=generate_spr]': {
                click: this.formDataSpr
            },
            'pengumpulanberkasgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'pengumpulanberkasgrid toolbar button[action=cetak_surat_berkas]': {
                click: this.docPrint
            },
            'pengumpulanberkasformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'pengumpulanberkasformsearch button[action=search]': {
                click: this.dataSearch
            },
            'pengumpulanberkasformsearch button[action=reset]': {
                click: this.dataReset
            },
            'pengumpulanberkasformdata': {
                afterrender: this.formDataAfterRender
            },
            'pengumpulanberkasformdata button[action=save]': {
                click: this.dataSave
            },
            'pengumpulanberkasformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'pengumpulanberkasformdata button[action=browse_unit]': {
                click: me.selectUnitGridShow
            },
            'pengumpulanberkasformdata button[action=generate]': {
                click: me.generateberkas
            },
            'pengumpulanberkasgriddetail actioncolumn': {
                editaction: me.detailberkasactionEditColumnClick,
                deleteaction: me.detailberkasactionDeleteColumnClick
            },
            'pengumpulanberkasgriddetail button[action=add_new]': {
                click: function () {
                    //                    alert('woy');
                    me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
                }
            },
            'pengumpulanberkasformdatadetail': {
                afterrender: this.formDataDetailAfterRender
            },
            'pengumpulanberkasformdatadetail button[action=save]': {
                click: me.detailForm.save
            },
            'pengumpulanberkasformdatadetail #fs_berkas_id': {
                change: me.loaddataberkas
            },
            'pengumpulanberkasformdataspr': {
                afterrender: this.formDataSprAfterRender
            },
            'pengumpulanberkasformdataspr button[action=savespr]': {
                click: me.dataSaveSpr
            },
            'pengumpulanberkasgridspr': {
                selectionchange: this.gridSprSelectionChange
            },
            'pengumpulanberkasgridspr toolbar button[action=view_spr]': {
                click: this.formDataSprView
            },
            'pengumpulanberkasgridspr toolbar button[action=cetak_spr]': {
                click: this.docPrintSpr
            },
            /* BROWSE CONTROL */
            'pengumpulanberkasbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'pengumpulanberkasbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'pengumpulanberkasbrowsegrid': {
                afterrender: me.browsegridAfterRender
            },
            'pengumpulanberkasbrowseformsearch': {
                afterrender: me.browseformSearchAfterRender
            },
            'pengumpulanberkasbrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
            'pengumpulanberkasbrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            },
            /* END BROWSE CONTROL */

        });
    },
    //printout
    docPrintSpr: function () {
        var me = this;

        var globalparameterStore = me.getMasterparameterglobalStore();
        globalparameterStore.removeAll();
        globalparameterStore.load({ params: { parametername: 'PRINTOUT_BERKASSPR_DOC' } });

        var grid = me.getGridspr();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        //        console.log(record.data);
        var id = record.data.berkas_spr_id + ',' + record.data.spr_index + ',spr';
        //        console.log(id)
        me.documentPrintout(id, 'erems/pengumpulanberkas/read');

        var combo = Ext.getCmp('cbPrintoutID');
        combo.bindStore(globalparameterStore);
    },
    docPrint: function () {
        var me = this;

        var globalparameterStore = me.getMasterparameterglobalStore();
        globalparameterStore.removeAll();
        globalparameterStore.load({ params: { parametername: 'PRINTOUT_BERKAS_DOC' } });

        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

        var id = record.data.berkas_surat_id;
        //        console.log(id)
        me.documentPrintout(id, 'erems/pengumpulanberkas/read');

        var combo = Ext.getCmp('cbPrintoutID');
        combo.bindStore(globalparameterStore);
    },
    formDataSprView: function () {
        var me = this;
        me.detailTool2 = new Erems.library.DetailtoolAll();
        me.detailTool2.setConfig({
            viewPanel: 'FormDataSpr',
            parentFDWindowId: me.getPanel().up('window').id,
            controllerName: me.controllerName
        });
        me.detailTool2.parentGridAlias = 'pengumpulanberkasgrid';
        me.detailTool2.form().show('view', 800, 'Generate');
    },
    gridSprSelectionChange: function () {
        var me = this;
        var grid = me.getGridspr(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnView').setDisabled(row.length < 1);
        grid.down('#btnCetakSpr').setDisabled(row.length < 1);

        var rec = me.getGridspr().getSelectedRecord();
        if (!rec) {
            return false;
        }
    },
    dataSaveSpr: function () {
        var me = this;
        var form = me.getFormdataspr().getForm();
        var storegrid = me.getGrid().getStore();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
        if (form.isValid()) {

            resetTimer();
            var storeXyx = null;

            var fida = me.getFinalData(form.getValues());


            //detail akad store
            //            Pengumpulanberkasdetail
            var detailsprgridStore = me.getGridsprdetail().getStore();
            detailsprgridStore.clearFilter(true);
            var data_detail = [];
            for (var i = 0; i < detailsprgridStore.getCount(); i++) {
                detailsprgridStore.each(function (record, idx) {
                    if (i == idx) {
                        data_detail[i] = record.data;
                    }
                });
            }
            fida['details_spr'] = data_detail;
            fida['mode_create'] = 'spr';
            storeXyx = me.getGridspr().getStore();
            //                console.log(store);

            var win = me.getFormdataspr().up('window');

            var msg = function () {
                me.getFormdataspr().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdataspr().up('window').state.toLowerCase()) {
                case 'create':
                    storeXyx.add(fida);
                    addingRecord = true;
                    break;
                case 'update':

                    var idProperty = storeXyx.getProxy().getReader().getIdProperty();
                    var rec = storeXyx.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }
            var data = Ext.encode(fida)
            Ext.Ajax.request({
                url: 'erems/pengumpulanberkas/create',
                params: {
                    data
                },
                success: function (response) {
                    var result = JSON.parse(response.responseText);
                    console.log(response);
                    storeXyx.reload({
                        params: {
                            purchaseletter_id: me.getFormdataspr().down('[name=purchaseletter_id]').getValue(),
                            berkas_surat_id: me.getFormdataspr().down('[name=berkas_surat_id]').getValue(),
                            mode_read: 'load_spr'
                        },
                        callback: function (rec, op) {
                        }
                    });
                    storegrid.reload();

                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            win.close();
                        }
                    });
                },
                failure: function () {
                    me.getFormdataspr().up('window').body.unmask();
                    if (storeXyx.getCount() > 0 && addingRecord) {
                        storeXyx.removeAt(storeXyx.getCount() - 1);
                    }
                    //                                storeXyx.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });


            //                storeXyx.getProxy().setExtraParam('mode_create', 'spr');
            //                storeXyx.on('beforesync', msg);
            //                storeXyx.sync({
            //                    success: function() {
            //                        alert('kwkwk');
            //                        me.getFormdataspr().up('window').body.unmask();
            //                        storeXyx.un('beforesync', msg);
            //                        storeXyx.reload();
            //                        alert('masukpakeko');
            //                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
            //                            Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
            //                        }
            //                        Ext.Msg.show({
            //                            title: 'Success',
            //                            msg: 'Data saved successfully.',
            //                            icon: Ext.Msg.INFO,
            //                            buttons: Ext.Msg.OK,
            //                            fn: function() {
            //                                   win.close();
            //                            }
            //                        });
            //                    },
            //                    failure: function() {
            //                        alert("SINI");
            //                        me.getFormdataspr().up('window').body.unmask();
            //                        store.un('beforesync', msg);
            //                        if (store.getCount() > 0 && addingRecord) {
            //                            store.removeAt(store.getCount() - 1);
            //                        }
            //                        store.reload();
            //                        Ext.Msg.show({
            //                            title: 'Failure',
            //                            msg: 'Error: Unable to save data.',
            //                            icon: Ext.Msg.ERROR,
            //                            buttons: Ext.Msg.OK
            //                        });
            //                    }
            //                });
            //            }
        }
    },
    formDataSprAfterRender: function (el) {

        var me = this;
        var state = el.up('window').state;

        if (state == 'create') {
            if (me.paramnosprberkas > 0) {
                me.getFormdataspr().down('[name=spr_no]').setReadOnly(true);
                me.getFormdataspr().down('[name=spr_no]').allowBlank = true;
            }
            var grid = me.getGrid();
            var store = grid.getStore();
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            me.getFormdataspr().down('[name=berkas_surat_id]').setValue(record.data.berkas_surat_id);

            Ext.Ajax.request({
                url: 'erems/pengumpulanberkas/read',
                params: {
                    mode_read: 'last_date_um', purchaseletter_id: record.data.purchaseletter_id
                },
                success: function (response) {
                    var result = JSON.parse(response.responseText);
                    //                                console.log(result.data.length);
                    //                                console.log(result.data);
                    if (result.data.length > 0) {
                        var tgl_um = new Date(result.data[0].lastdate_um);
                        var date_now = new Date(result.data[0].lastdate_um);
                        //                                    console.log(result.data[0].lastdate_um)
                        date_now.setDate(date_now.getDate() - 90);
                        me.getFormdataspr().down('[name=spr_next_date]').setValue(date_now);
                        me.getFormdataspr().down('[name=lbl_tglum]').setText('Tanggal UM Terakhir: ' + tgl_um.getDate() + "-" + tgl_um.getMonth() + "-" + tgl_um.getFullYear());
                        me.getFormdataspr().down('[name=lbl_tglum]').setVisible(true);
                    } else {
                        var date_now = new Date();
                        date_now.setDate(date_now.getDate() + 14);
                        me.getFormdataspr().down('[name=spr_next_date]').setValue(date_now);
                    }
                }
            });

            var plDetailStore = me.getPurchaseletterdetailStore();
            //                //me.getFormdata().up('window').body.mask('Loading data...');
            plDetailStore.load({
                params: { mode_read: 'detail', purchaseletter_id: record.data.purchaseletter_id },
                callback: function (rec) {
                    //                                            console.log('RECORDS PURCHASE LETTER...');
                    //                                            console.log(rec[0]);
                    me.getFormdataspr().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
                    me.getFormdataspr().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                    me.getFormdataspr().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

                    me.getFormdataspr().down('[name=code]').setValue(rec[0].get('cluster_code'));
                    me.getFormdataspr().down('[name=block_code]').setValue(rec[0].get('block_code'));
                    me.getFormdataspr().down('[name=unit_cluster_id]').setValue(rec[0].get('unit_cluster_id'));
                    me.getFormdataspr().down('[name=unit_block_id]').setValue(rec[0].get('unit_block_id'));
                    me.getFormdataspr().down('[name=unit_unit_number]').setValue(rec[0].get('unit_unit_number'));

                    me.getFormdataspr().down('[name=customer_name]').setValue(rec[0].get('customer_name'));
                    me.getFormdataspr().down('[name=unit_id]').setValue(rec[0].get('unit_id'));

                    //}
                }
            });

            me.getFormdataspr().down('[name=spr_index]').setValue(me.sprIndex);

            var gd = me.getGridsprdetail();
            var p = me.getFormdataspr();
            p.setLoading("Please wait...");
            gd.getStore().load({
                params: {
                    mode_read: "griddetailspr",
                    berkas_surat_id: record.data.berkas_surat_id
                },
                callback: function (rec, op) {
                    //                gd.attachModel(op);
                    //                    console.log(rec);
                    p.setLoading(false);
                }
            });

        } else if (state == 'view') {
            var grid = me.getGrid();
            var store = grid.getStore();
            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            me.getFormdataspr().down('[name=berkas_surat_id]').setValue(record.data.berkas_surat_id);
            //            console.log(record)
            var plDetailStore = me.getPurchaseletterdetailStore();
            //                //me.getFormdata().up('window').body.mask('Loading data...');
            plDetailStore.load({
                params: { mode_read: 'detail', purchaseletter_id: record.data.purchaseletter_id },
                callback: function (rec) {
                    //                                            console.log('RECORDS PURCHASE LETTER...');
                    //                                            console.log(rec[0]);
                    me.getFormdataspr().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
                    me.getFormdataspr().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                    me.getFormdataspr().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

                    me.getFormdataspr().down('[name=code]').setValue(rec[0].get('cluster_code'));
                    me.getFormdataspr().down('[name=block_code]').setValue(rec[0].get('block_code'));
                    me.getFormdataspr().down('[name=unit_cluster_id]').setValue(rec[0].get('unit_cluster_id'));
                    me.getFormdataspr().down('[name=unit_block_id]').setValue(rec[0].get('unit_block_id'));
                    me.getFormdataspr().down('[name=unit_unit_number]').setValue(rec[0].get('unit_unit_number'));

                    me.getFormdataspr().down('[name=customer_name]').setValue(rec[0].get('customer_name'));

                    //}
                }
            });

            var gridspr = me.getGridspr();
            var storespr = gridspr.getStore();
            var recordspr = storespr.getAt(storespr.indexOf(gridspr.getSelectionModel().getSelection()[0]));

            me.getFormdataspr().down('[name=spr_no]').setReadOnly(true);
            me.getFormdataspr().down('[name=spr_date]').setReadOnly(true);
            me.getFormdataspr().down('[name=spr_index]').setReadOnly(true);
            me.getFormdataspr().down('[name=spr_next_date]').setReadOnly(true);
            me.getFormdataspr().down('[name=notes]').setReadOnly(true);

            me.getFormdataspr().down('#btnSaveSpr').setDisabled(true);

            me.getFormdataspr().down('[name=spr_no]').setValue(recordspr.data.spr_no);
            me.getFormdataspr().down('[name=spr_date]').setValue(recordspr.data.spr_date);
            me.getFormdataspr().down('[name=spr_index]').setValue(recordspr.data.spr_index);
            me.getFormdataspr().down('[name=spr_next_date]').setValue(recordspr.data.spr_next_date);
            me.getFormdataspr().down('[name=notes]').setValue(recordspr.data.notes);

            var gd = me.getGridsprdetail();
            var p = me.getFormdataspr();
            p.setLoading("Please wait...");
            gd.getStore().load({
                params: {
                    mode_read: "griddetailsprview",
                    berkas_spr_id: recordspr.data.berkas_spr_id
                },
                callback: function (rec, op) {
                    //                gd.attachModel(op);
                    //                    console.log(rec);
                    p.setLoading(false);
                }
            });
        }
    },
    formDataSpr: function () {
        //        alert('woy');
        var me = this;
        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        var due_date_spr = '';
        var dateNow = new Date();
        Ext.Ajax.request({
            url: 'erems/pengumpulanberkas/read',
            params: {
                mode_read: 'get_spr_index', purchaseletter_id: record.data.purchaseletter_id, berkas_surat_id: record.data.berkas_surat_id
            },
            success: function (response) {
                var result = JSON.parse(response.responseText);
                if (result.data[0].length > 0) {
                    me.sprIndex = result.data[0][0]['spr_index'] + 1;
                    due_date_spr = result.data[0][0]['spr_next_date'];
                } else {
                    me.sprIndex = 1;
                }

                if (due_date_spr == '') {
                    due_date_spr = record.data.berkas_jatuhtempo_date;
                }
                var d = new Date(due_date_spr);
                if (me.sprIndex > 4) {
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Tidak bisa Generate SPr Berkas karena sudah batal sepihak.',
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK
                    });
                    //                                } 
                    //                                else if (d.getTime() > dateNow.getTime()){
                    //                                    Ext.Msg.show({
                    //                                                    title: 'Failure',
                    //                                                    msg: 'Error: SPr Berkas belum kena tanggal jatuh tempo.',
                    //                                                    icon: Ext.Msg.WARNING,
                    //                                                    buttons: Ext.Msg.OK
                    //                                                });
                } else {
                    me.detailTool2 = new Erems.library.DetailtoolAll();
                    me.detailTool2.setConfig({
                        viewPanel: 'FormDataSpr',
                        parentFDWindowId: me.getPanel().up('window').id,
                        controllerName: me.controllerName
                    });
                    me.detailTool2.parentGridAlias = 'pengumpulanberkasgrid';
                    me.detailTool2.form().show('create', 800, 'Generate');
                }
            }
        });



    },
    getFinalData: function (formGetValues) {
        var finalData = formGetValues;
        return finalData;
    },
    validationProcess: function () {
        return true;
    },
    dataSave: function () {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }


        if (form.isValid()) {
            var formdata = this.getFormdata();
            var unit_id = formdata.down('[name=unit_id]').getValue();
            var countdetail = me.getDetailgrid().getStore().getCount();

            if (unit_id == '') {
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Unit belum dipilih.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
            } else if (countdetail <= 0) {
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Harap Generate Berkas.',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });
            } else {
                resetTimer();
                //var store = me.getGrid().getStore();
                var store = null;
                if (me.instantCreateMode) {
                    store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
                } else {
                    store = me.getGrid().getStore();
                }
                var fida = me.getFinalData(form.getValues());


                //detail akad store
                //            Pengumpulanberkasdetail
                var detailgridStore = me.getDetailgrid().getStore();
                detailgridStore.clearFilter(true);
                var data_detail = [];
                for (var i = 0; i < detailgridStore.getCount(); i++) {
                    detailgridStore.each(function (record, idx) {
                        if (i == idx) {
                            data_detail[i] = record.data;
                        }
                    });
                }

                fida['details_data'] = data_detail;
                fida['berkas_group_menu'] = me.mnuname;
                console.log(fida);


                var msg = function () {
                    me.getFormdata().up('window').body.mask('Saving data, please wait ...');
                };
                switch (me.getFormdata().up('window').state.toLowerCase()) {
                    case 'create':

                        store.add(fida);
                        addingRecord = true;
                        break;
                    case 'update':

                        var idProperty = store.getProxy().getReader().getIdProperty();
                        var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                        rec.beginEdit();
                        rec.set(fida);
                        rec.endEdit();
                        break;
                    default:
                        return;
                }

                store.on('beforesync', msg);
                store.sync({
                    success: function () {
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        store.reload();

                        if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                            Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                        }
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully.',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function () {
                                me.formDataClose();
                            }
                        });
                    },
                    failure: function () {
                        me.getFormdata().up('window').body.unmask();
                        store.un('beforesync', msg);
                        if (store.getCount() > 0 && addingRecord) {
                            store.removeAt(store.getCount() - 1);
                        }
                        store.reload();
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: Unable to save data.',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                });
            }
        }
    },
    loaddataberkas: function () {
        //        alert('loadberkas');
        var formdetail = this.getFormdatadetail();
        var id_berkas = formdetail.down('[name=berkas_id]').getValue();
        var data_berkas = formdetail.down('[name=berkas_id]').getStore();
        var select_data = data_berkas.data.getByKey(id_berkas);

        formdetail.down('[name=code]').setValue(select_data.get('code'));
        formdetail.down('[name=berkas]').setValue(select_data.get('berkas'));
        formdetail.down('[name=description]').setValue(select_data.get('description'));

        //        console.log(select_data.get('code'));
        //        console.log(id_berkas);
    },
    detailForm: {

        that: this,
        editingIndexRow: 0,
        save: function () {
            var me = this;
            var form = me.getFormdatadetail().getForm();
            var formVal = me.getFormdatadetail().getForm().getValues();
            //            console.log(formVal.status_id);


            var msg = '';
            var win = me.getFormdatadetail().up('window');

            if (form.isValid()) {
                var dStore = null;
                var win = me.getFormdatadetail().up('window');

                dStore = me.getDetailgrid().getStore();

                var val = {

                    berkas_id: formVal.berkas_id,
                    berkas_code: formVal.code,
                    berkas_name: formVal.berkas,
                    berkas_description: formVal.description,
                    berkas_status: formVal.status_id,
                    //                        temp_id_akad: temp_id_detail
                };

                if (win.state == 'create') {
                    var select_data = me.getDetailgrid().getStore().findRecord('berkas_id', formVal.berkas_id);
                    if (select_data === null) {
                        dStore.add(val);
                    } else {
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: Berkas sudah ada',
                            icon: Ext.Msg.WARNING
                        });
                    }
                    //                        console.log(select_data === null );
                    //                        
                } else {

                    var rec = dStore.getAt(me.detailForm.editingIndexRow);
                    rec.beginEdit();
                    rec.set(val);
                    rec.endEdit();

                }

                win.close();
            }
        }
    },
    formDataDetailAfterRender: function (el) {

        var me = this;
        //        me.storeProcess = me.createSpProcessObj(me.storeProcess);

        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            me.getFormdatadetail().down('[name=status_id]').setValue('BELUM');
            me.getFormdatadetail().down('[name=status_id]').setReadOnly(true);

            //            $()
        } else if (state == 'update') {
            me.getFormdatadetail().down('[name=status_id]').setReadOnly(false);
        }
    },
    detailberkasactionEditColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this;
        //            var gr = me.getBankgridakad();

        me.detailTool.form().show('update', 500, 'Edit Confirmation', '');
        me.detailForm.editingIndexRow = view[1];
        me.getFormdatadetail().getForm().setValues({
            berkas_id: view[5].data.berkas_id,
            code: view[5].data.berkas_code,
            berkas: view[5].data.berkas_name,
            description: view[5].data.berkas_description,
            status_id: view[5].data.berkas_status,
        });
    },
    detailberkasactionDeleteColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this;
        var gr = me.getDetailgrid();
        view[5].set("deleted", true);
        view[5].set("status", '');
        gr.getStore().filterBy(function (recod) { return recod.data.deleted == false; });
    },
    generateberkas: function () {
        //        alert('woy');
        var me = this;
        var gd = me.getDetailgrid();
        var p = me.getPanel();
        p.setLoading("Please wait...");
        gd.getStore().load({
            params: {
                mode_read: "generate_berkas"
            },
            callback: function (rec, op) {
                //                gd.attachModel(op);
                console.log(rec);
                p.setLoading(false);
            }
        });
        //        gd.getStore().reload();
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
        grid.down('#btnCetaksuratberkas').setDisabled(row.length < 1);
        grid.down('#btnGeneratespr').setDisabled(row.length < 1);

        var gd = me.getGridspr();
        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return false;
        }
        var p = me.getPanel();
        p.setLoading("Please wait...");
        gd.getStore().load({
            params: {
                purchaseletter_id: rec.get("purchaseletter_id"),
                berkas_surat_id: rec.get("berkas_surat_id"),
                mode_read: 'load_spr'
            },
            callback: function (rec, op) {
                //                gd.attachModel(op);
                p.setLoading(false);
            }
        });
        //        gd.getStore().reload();
    },
    panelAfterRender: function () {
        var me = this;
        var mnuName = Ext.WindowManager;
        if (mnuName.front.id == 'WINDOW-mnuPengumpulanberkascollection') {
            me.getFormsearch().down('[name=berkas_group_menu]').setValue('COLLECTION');
            this.mnuname = 'COLLECTION';
        } else if (mnuName.front.id == 'WINDOW-mnuPengumpulanberkaslegal') {
            me.getFormsearch().down('[name=berkas_group_menu]').setValue('LEGAL');
            this.mnuname = 'LEGAL';
        }

        Ext.Ajax.request({
            url: 'erems/pengumpulanberkas/read',
            params: {
                mode_read: 'cek_parameter_generate'
            },
            success: function (response) {
                var result = JSON.parse(response.responseText);
                me.paramnosuratberkas = result.data[0][0]['NO_SURAT_BERKAS'];
                me.paramnosprberkas = result.data[1][0]['NO_SPR_BERKAS'];
            }
        });


    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                //show form add pencarian 
                me.detailTool = new Erems.library.DetailtoolAll();
                me.detailTool.setConfig({
                    viewPanel: 'FormDataDetail',
                    parentFDWindowId: me.getFormdata().up('window').id,
                    controllerName: me.controllerName
                });
                me.detailTool.parentGridAlias = 'pengumpulanberkasgriddetail';

                if (me.paramnosuratberkas > 0) {
                    me.getFormdata().down('[name=berkas_no]').setReadOnly(true);
                    me.getFormdata().down('[name=berkas_no]').allowBlank = true;

                }
            },
            create: function () {
                var date_now = new Date();
                date_now.setDate(date_now.getDate() + 14);
                me.getFormdata().down('[name=berkas_jatuhtempo_date]').setValue(date_now);

                me.getDetailgrid().getStore().removeAll();

            },
            update: function () {
                var grid = me.getGrid();
                var store = grid.getStore();

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here
                //                console.log(record.data.purchaseletter_id);
                me.getFormdata().down('#fd_browse_unit_btn').setDisabled(true);
                me.getFormdata().down('#btnGenerate').setDisabled(true);

                var plDetailStore = me.getPurchaseletterdetailStore();
                //                //me.getFormdata().up('window').body.mask('Loading data...');
                plDetailStore.load({
                    params: { mode_read: 'detail', purchaseletter_id: record.data.purchaseletter_id },
                    callback: function (rec) {
                        console.log('RECORDS PURCHASE LETTER...');
                        console.log(rec[0]);
                        me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
                        me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                        me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

                        me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
                        me.getFormdata().down('[name=salesman_name]').setValue(rec[0].get('salesman_name'));
                        me.getFormdata().down('[name=harga_total_jual]').setValue(rec[0].get('harga_total_jual'));
                        me.getFormdata().down('[name=akad_date]').setValue(rec[0].get('akad_realisasiondate'));
                        me.getFormdata().down('[name=pricetype]').setValue(rec[0].get('pricetype'));

                        me.fillUnitDataToForm(rec[0]);
                        me.fillMasterCustomerData(rec[0], 'customer');

                        //}
                    }
                });

                var p = me.getPanel();
                p.setLoading("Please wait...");
                var gd = me.getDetailgrid();
                gd.getStore().load({
                    params: {
                        mode_read: "detail_berkas",
                        berkas_surat_id: record.data.berkas_surat_id
                    },
                    callback: function (rec, op) {
                        //                gd.attachModel(op);
                        console.log(rec);
                        p.setLoading(false);
                    }
                });
            }
        };
        return x;
    },
    selectUnitGridShow: function () {
        var me = this;

        //        _myAppGlobal.getController('Sppjb').ctrler = 'Pengumpulanberkas';
        //		_myAppGlobal.getController('Sppjb').spcreq = '';
        //		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');

        me.ctrler = 'Sppjb';
        //        me.spcreq = '';
        me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');

    },
    //================= BROWSE PANEL ================================
    instantWindow: function (panel, width, title, state, id) {
        var me = this;
        var formtitle, formicon;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;



        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Erems.view.' + me.controllerName + '.' + panel),
                state: state
            });
        }
        win.show();
    },

    browsepanelBeforeRender: function (el, a, b) {
        var me = this;

        var gridView = Ext.create('Erems.view.pengumpulanberkas.browse.Grid', {
            region: 'center'
        });
        var searchView = Ext.create('Erems.view.pengumpulanberkas.browse.FormSearch', {
            region: 'west',
            split: true,
            maxWidth: 500,
            minWidth: 300,
            width: 300,
            collapsed: true,
            collapsible: true,
            iconCls: 'icon-search',
            title: 'Search'
        });
        el.removeAll();
        el.add(gridView);
        el.add(searchView);

        var items = el.items.items[1].items.items;
        var textfield = Ext.ComponentQuery.query('[xtype=textfield]', items);

        for (var i=0;i<textfield.length;i++) {
            textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.browsedataSearch(e);
                }
            });
        }
    },
    browsegridSelection: function (el) {
        var me = this;
        var unitGrid = el.up('grid');
        var unitStore = el.up('grid').getStore();
        var rows = unitGrid.getSelectionModel().getSelection();
        if (rows.length == 1) {
            el.up('window').destroy();
            me.processRowFromItemSelection(rows, 'purchaseletter');

        } else {
            Ext.Msg.alert('Info', 'Require 1 unit!');
            return;

        }
    },
    browsegridAfterRender: function (el, a, b) {
        var me = this;

        me.browsedataReset(el.up('panel').up('panel').down('button[action=search]'));

        resetTimer();
        var store = el.getStore();
        store.removeAll();
        store.loadPage(1);
    },
    browseformSearchAfterRender: function (el) {
        var me = this;

        var ftStore = null;
        ftStore = el.form._fields.items[2].getStore();
        ftStore.load({ params: { start: 0, limit: 0 } });
    },
    browsedataSearch: function (el) {
        resetTimer();
        var me = this;

        var form = el.up('form');
        var store = el.up('panel').up('panel').down('grid').getStore();

        var srcform = form.getForm();
        srcform._fields.items[1].setValue(me.spcreq); //('[name=param_spcreq]')

        var fields = form.getValues();
        for (var x in fields) {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam('berkas_group', me.mnuname);
        store.loadPage(1);
    },
    browsedataReset: function (el) {
        var me = this;
        var form = el.up('form');
        form.getForm().reset();

        var srcform = form.getForm();
        srcform._fields.items[1].setValue(me.spcreq); //('[name=param_spcreq]')

        me.browsedataSearch(el.up('panel').up('panel').down('button[action=search]'));
    },
    //===================== END BROWSE PANEL ===============================	

    processRowFromItemSelection: function (rows, modul) {
        var me = this;

        me.fillPurchaseletter(rows);

    },

    fillPurchaseletter: function (rows) {
        var me = this;

        var plDetailStore = me.getPurchaseletterdetailStore();
        //me.getFormdata().up('window').body.mask('Loading data...');
        plDetailStore.load({
            params: { mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id') },
            callback: function (rec) {
                /*if(rec[0].get('sppjb_no') && rec[0].get('sppjb_deleted') == false){
                        Ext.Msg.alert('Info', 'This Kavling / Unit No. already have SPPJB');
                } else {*/
                console.log('RECORDS PURCHASE LETTER...');
                console.log(rec[0]);
                me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
                me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

                me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
                me.getFormdata().down('[name=salesman_name]').setValue(rec[0].get('salesman_name'));
                me.getFormdata().down('[name=harga_total_jual]').setValue(rec[0].get('harga_total_jual'));
                me.getFormdata().down('[name=akad_date]').setValue(rec[0].get('akad_realisasiondate'));
                me.getFormdata().down('[name=pricetype]').setValue(rec[0].get('pricetype'));

                me.fillUnitDataToForm(rec[0]);
                me.fillMasterCustomerData(rec[0], 'customer');

                //}
            }
        });
    },
    fillUnitDataToForm: function (data) {

        var me = this;
        var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name'];

        for (var x in filledFields) {
            if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
            }

        }
        me.getFormdata().down('[name=code]').setValue(data.data['cluster_code']);
        me.getFormdata().down('[name=block_code]').setValue(data.data['block_code']);
    },
    fillMasterCustomerData: function (records, prefix) {
        var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
        var me = this;
        var filledFields = [
            'name', 'ktp', 'npwp', 'mobilephone', 'email', 'homephone', 'address', 'officephone', 'city'
        ];
        console.log('RECORDS CUSTOMER...');
        console.log(records);

        for (var x in filledFields) {
            if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
            }

        }
    },


});