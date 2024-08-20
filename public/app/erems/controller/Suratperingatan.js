Ext.define('Erems.controller.Suratperingatan', {
    extend: 'Erems.library.template.controller.Controller',
    //    extend: 'Erems.library.template.controller.Controlleralt',
    requires: ['Erems.library.DetailtoolAll'],
    alias: 'controller.Suratperingatan',
    requires:['Erems.library.template.component.Clustercombobox'],
    views: ['suratperingatan.Panel', 'suratperingatan.Grid', 'suratperingatan.GridSchedulePayment', 'suratperingatan.FormSearch', 'suratperingatan.FormData', 'suratperingatan.GridDetail', 'suratperingatan.GridSpr', 'suratperingatan.GridSprDetail'],
    stores: ['Suratperingatan', 'Suratperingatanschedule', 'Suratperingatanspr', 'Suratperingatansprdetail', 'Suratperingatandetail', 'Purchaseletterdetail', 'Masterparameterglobal','Mastercluster','Masterblock'],
    models: ['Suratperingatan', 'Suratperingatanschedule', 'Purchaseletter','Mastercluster','Masterblock'],
    detailTool: null,
    detailTool2: null,
    refs: [
        {
            ref: 'panel',
            selector: 'suratperingatanpanel'
        },
        {
            ref: 'grid',
            selector: 'suratperingatangrid'
        },
        {
            ref: 'gridschedulepayment',
            selector: 'suratperingatangridschedulepayment'
        },
        {
            ref: 'gridspr',
            selector: 'suratperingatangridspr'
        },
        {
            ref: 'formsearch',
            selector: 'suratperingatanformsearch'
        },
        {
            ref: 'formdata',
            selector: 'suratperingatanformdata'
        },
        {
            ref: 'detailgrid',
            selector: 'suratperingatangriddetail'
        },
        {
            ref: 'gridsprdetail',
            selector: 'suratperingatangridsprdetail'
        },
    ],
    //    comboBoxIdEl: ['fs_cluster_id','fs_block_id'],
    controllerName: 'suratperingatan',
    fieldName: 'berkas',
    bindPrefixName: 'Suratperingatan',
    formWidth: 800,
    ctrler: '', //for get controller on browse item
    spcreq: '', //for get param_spcreq on browse item
    mnuname: '',
    sprIndex: 0,
    init: function (application) {
        var me = this;
        this.control({
            'suratperingatanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'suratperingatangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'suratperingatangrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'suratperingatangrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },

            'suratperingatanformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'suratperingatanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'suratperingatanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'suratperingatanformdata': {
                afterrender: this.formDataAfterRender
            },
            'suratperingatanformdata button[action=save]': {
                click: this.dataSave
            },
            'suratperingatanformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'suratperingatanformdata [name=suratperingatan_date]': {
                change: this.loaddetailgrid
            },
            'suratperingatangridspr': {
                selectionchange: this.gridSprSelectionChange
            },
            'suratperingatangridspr toolbar button[action=view_spr]': {
                // click: this.formDataSprView
                click: function () {
                    this.formDataShow('update');
                }
            },
            'suratperingatangridspr toolbar button[action=cetak_spr]': {
                click: this.cetakSpr
                // click: function () {
                //     this.formDataShow('update');
                // }
            },


        });
    },
    cetakSpr: function () {
        var me = this;

        var globalparameterStore = me.getMasterparameterglobalStore();
        globalparameterStore.removeAll();
        globalparameterStore.load({ params: { parametername: 'PRINTOUT_SURATPERINGATAN_DOC' } });

        var grid = me.getGridspr();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        //        console.log(record.data);
        var id = record.data.purchaseletter_id + ',' + record.data.suratperingatan_id + ',' + record.data.suratperingatan_index;
        //        console.log(id)
        me.documentPrintout(id, 'erems/suratperingatan/read');

        var combo = Ext.getCmp('cbPrintoutID');
        combo.bindStore(globalparameterStore);
    },
    // cetakSpr: function () {
    //     var me = this;
    //     var rec = me.getGridspr().getSelectedRecord();
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

    gridSprSelectionChange: function () {
        var me = this;
        var grid = me.getGridspr(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnView').setDisabled(row.length != 1);
        grid.down('#btnCetakSpr').setDisabled(row.length != 1);

        var rec = me.getGridspr().getSelectedRecord();
        if (!rec) {
            return false;
        }
        var gridsprdetail = me.getGridsprdetail();
        // console.log(rec);
        var p = me.getPanel();
        p.setLoading("Please wait...");
        gridsprdetail.getStore().load({
            params: {
                suratperingatan_id: rec.get("suratperingatan_id"),
                mode_read: 'gridsprdetail'
            },
            callback: function (rec, op) {
                //                gd.attachModel(op);
                p.setLoading(false);
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

            resetTimer();
            //var store = me.getGrid().getStore();
            var store = null;
            if (me.instantCreateMode) {
                store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                store = me.getGrid().getStore();
            }
            var fida = me.getFinalData(form.getValues());

            //Suratperingatandetail
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
            //                console.log(fida);

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
                    // store.reload();

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
                    // store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
            me.getGridschedulepayment().getStore().removeAll();
            me.getGridspr().getStore().removeAll();
            me.getGridsprdetail().getStore().removeAll();

        }
    },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnProsesSpr').setDisabled(row.length != 1);
        //        grid.down('#btnDelete').setDisabled(row.length < 1);
        //        grid.down('#btnCetaksuratberkas').setDisabled(row.length < 1);
        //        grid.down('#btnGeneratespr').setDisabled(row.length < 1);

        var gd = me.getGridschedulepayment();
        var gridspr = me.getGridspr();
        var rec = me.getGrid().getSelectedRecord();
        if (!rec) {
            return false;
        }
        // console.log(rec)
        var p = me.getPanel();
        p.setLoading("Please wait...");
        gd.getStore().load({
            params: {
                purchaseletter_id: rec.get("purchaseletter_id"),
                mode_read: 'schedule_payment'
            },
            callback: function (rec, op) {
                //                gd.attachModel(op);
                p.setLoading(false);
            }
        });
        p.setLoading("Please wait...");
        gridspr.getStore().load({
            params: {
                purchaseletter_id: rec.get("purchaseletter_id"),
                mode_read: 'spr'
            },
            callback: function (rec, op) {
                //                gd.attachModel(op);
                p.setLoading(false);
            }
        });
    },
    panelAfterRender: function () {

    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                var state = me.getFormdata().up('window').state;
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                if (state == 'create') {
                    Ext.Ajax.request({
                        url: 'erems/suratperingatan/read',
                        params: {
                            mode_read: 'get_spr_index', purchaseletter_id: record.data.purchaseletter_id
                        },
                        success: function (response) {
                            var result = JSON.parse(response.responseText);
                            var plandate = new Date();
                            var dateNow = new Date();
                            me.sprIndex = 0;
                            if (result.data[0].length > 0) {
                                me.sprIndex = result.data[0][0]['suratperingatan_index'] + 1;
                                plandate = new Date(result.data[0][0]['suratperingatan_next_date']);
                            } else {
                                me.sprIndex = 1;
                            }
                            var index = me.sprIndex - 1;
                            if (me.sprIndex > 4) {
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: 'Error: Surat Peringatan tidak bisa di Generate karena Sudah Terbentuk Surat Pembatalan.',
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        me.formDataClose();
                                    }
                                });
                            }
                            else if (plandate.getTime() > dateNow.getTime()) {
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: 'Error: Data Surat Peringatan ke ' + (index) + ' sudah terbentuk.',
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        me.formDataClose();
                                    }
                                });

                            }
                        }
                    });
                }

            },
            create: function () {
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);


                var date_now = new Date();
                me.getFormdata().down('[name=suratperingatan_date]').setValue(date_now);
                date_now.setDate(date_now.getDate() + 30);
                me.getFormdata().down('[name=suratperingatan_next_date]').setValue(date_now);
                //                me.getDetailgrid().getStore().removeAll();
                var plDetailStore = me.getPurchaseletterdetailStore();
                //                //me.getFormdata().up('window').body.mask('Loading data...');
                plDetailStore.load({
                    params: { mode_read: 'detail', purchaseletter_id: record.data.purchaseletter_id },
                    callback: function (rec) {
                        // console.log('RECORDS PURCHASE LETTER...');
                        // console.log(rec[0]);
                        me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
                        me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                        me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
                        me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
                        me.fillUnitDataToForm(rec[0]);
                        me.fillMasterCustomerData(rec[0], 'customer');
                        // console.log(me.sprIndex)
                        me.getFormdata().down('[name=suratperingatan_index]').setValue(me.sprIndex);

                        //}
                    }
                });
                // console.log(record.data.purchaseletter_id)
                var p = me.getPanel();
                p.setLoading("Please wait...");
                var gd = me.getDetailgrid();
                gd.getStore().load({
                    params: {
                        mode_read: 'detail_grid',
                        purchaseletter_id: record.data.purchaseletter_id,
                        tanggal_pembuatan: me.getFormdata().down('[name=suratperingatan_date]').getValue()
                    },
                    callback: function (rec, op) {
                        var rest = 0, rest_denda = 0
                        for (i = 0; i < rec.length; ++i) {
                            rest += parseFloat(rec[i].data.remaining_balance);
                            rest_denda += parseFloat(rec[i].data.rest_denda);
                        }
                        var formdata = me.getFormdata();
                        me.getFormdata().down('[name=total_remaining_balance]').setValue(accounting.formatMoney(rest));
                        me.getFormdata().down('[name=total_remaining_denda]').setValue(accounting.formatMoney(rest_denda));
                        me.getFormdata().down('[name=total_nilai]').setValue(accounting.formatMoney(rest + rest_denda));
                        formdata.down('#indexspr').setText('Surat Peringatan ke ' + me.sprIndex);
                        p.setLoading(false);
                    }
                });




            },
            update: function () {
                var grid = me.getGridspr();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                // console.log(record)
                me.getFormdata().loadRecord(record);
                var plDetailStore = me.getPurchaseletterdetailStore();
                //                //me.getFormdata().up('window').body.mask('Loading data...');
                plDetailStore.load({
                    params: { mode_read: 'detail', purchaseletter_id: record.data.purchaseletter_id },
                    callback: function (rec) {
                        // console.log('RECORDS PURCHASE LETTER...');
                        // console.log(rec[0]);
                        me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
                        me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
                        me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
                        me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
                        me.fillUnitDataToForm(rec[0]);
                        me.fillMasterCustomerData(rec[0], 'customer');

                        me.getFormdata().down('[name=suratperingatan_index]').setValue(record.data.suratperingatan_index);

                        //}
                    }
                });
                var formdata = me.getFormdata();
                var p = me.getPanel();
                p.setLoading("Please wait...");
                var gd = me.getDetailgrid();
                gd.getStore().load({
                    params: {
                        mode_read: 'detail_grid',
                        purchaseletter_id: record.data.purchaseletter_id,
                        tanggal_pembuatan: me.getFormdata().down('[name=suratperingatan_date]').getValue()
                    },
                    callback: function (rec, op) {
                        p.setLoading(false);

                    }
                });


                formdata.down('#btnSave').setVisible(false);
                formdata.down('[name=suratperingatan_date]').setReadOnly(true);
                formdata.down('[name=suratperingatan_next_date]').setReadOnly(true);
                formdata.down('[name=notes]').setReadOnly(true);
                formdata.down('#indexspr').setText('Surat Peringatan ke ' + record.data.suratperingatan_index);


            }
        };
        return x;
    },


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
                // console.log('RECORDS PURCHASE LETTER...');
                // console.log(rec[0]);
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
        // console.log('RECORDS CUSTOMER...');
        // console.log(records);

        for (var x in filledFields) {
            if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
                me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
            }

        }
    },
    loaddetailgrid: function () {
        var me = this;
        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        var gd = me.getDetailgrid();
        gd.getStore().load({
            params: {
                mode_read: 'detail_grid',
                purchaseletter_id: record.data.purchaseletter_id,
                tanggal_pembuatan: me.getFormdata().down('[name=suratperingatan_date]').getValue()
            },
            callback: function (rec, op) {
                var rest = 0, rest_denda = 0
                for (i = 0; i < rec.length; ++i) {
                    rest += parseFloat(rec[i].data.remaining_balance);
                    rest_denda += parseFloat(rec[i].data.rest_denda);
                }
                me.getFormdata().down('[name=total_remaining_balance]').setValue(accounting.formatMoney(rest));
                me.getFormdata().down('[name=total_remaining_denda]').setValue(accounting.formatMoney(rest_denda));
                me.getFormdata().down('[name=total_nilai]').setValue(accounting.formatMoney(rest + rest_denda));
            }
        });
    }

});