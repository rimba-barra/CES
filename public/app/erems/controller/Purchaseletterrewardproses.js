Ext.define('Erems.controller.Purchaseletterrewardproses', {
    extend: 'Erems.library.template.controller.Controller',
    //    extend: 'Erems.library.template.controller.Controlleralt',
    requires: ['Erems.library.DetailtoolAll'],
    alias: 'controller.Purchaseletterrewardproses',
    views: ['purchaseletterrewardproses.Panel', 'purchaseletterrewardproses.Grid', 'purchaseletterrewardproses.RewardGrid', 'purchaseletterrewardproses.FormSearch', 'purchaseletterrewardproses.FormData'],
    stores: ['Purchaseletterreward', 'Purchaseletterrewarddetail', 'Purchaseletterrewardprosesdetail'],
    models: ['Purchaseletter', 'Purchaseletterreward', 'Purchaseletterrewarddetail', 'Purchaseletterrewardprosesdetail'],
    detailTool: null,
    detailTool2: null,
    datapl: [],
    dataprt: [],
    refs: [
        {
            ref: 'panel',
            selector: 'purchaseletterrewardprosespanel'
        },
        {
            ref: 'grid',
            selector: 'purchaseletterrewardprosesgrid'
        },
        {
            ref: 'formsearch',
            selector: 'purchaseletterrewardprosesformsearch'
        },
        {
            ref: 'formdata',
            selector: 'purchaseletterrewardprosesformdata'
        },
        {
            ref: 'detailgrid',
            selector: 'purchaseletterrewardprosesgriddetail'
        },
        {
            ref: 'formdatadetail',
            selector: 'purchaseletterrewardprosesformdatadetail'
        },


    ],
    //    comboBoxIdEl: ['fs_cluster_id','fs_block_id'],
    controllerName: 'purchaseletterrewardproses',
    fieldName: 'berkas',
    bindPrefixName: 'Purchaseletterrewardproses',
    formWidth: 800,
    ctrler: '', //for get controller on browse item
    spcreq: '', //for get param_spcreq on browse item
    mnuname: '',
    sprIndex: 0,
    init: function (application) {
        var me = this;

        this.control({
            'purchaseletterrewardprosespanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'purchaseletterrewardprosesgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },

            'purchaseletterrewardprosesgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            //            'purchseletterrewardgrid toolbar button[action=cetak_surat_berkas]': {
            //                click: this.docPrint
            //            },
            // 'purchaseletterrewardprosesgriddetail toolbar button[action=add]': {
            //     click: this.addreward
            // },
            // 'purchaseletterrewardprosesgriddetail toolbar button[action=edit]': {
            //     click: this.formdatadetailactionEdit
            // },
            // 'purchaseletterrewardprosesgriddetail toolbar button[action=delete]': {
            //     click: this.formdatadetailactionDelete
            // },
            // 'purchaseletterrewardprosesgrid toolbar button[action=destroy]': {
            //     click: this.dataDestroy
            // },
            'purchaseletterrewardprosesformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'purchaseletterrewardprosesformsearch button[action=search]': {
                click: this.dataSearch
            },
            'purchaseletterrewardprosesformsearch button[action=reset]': {
                click: this.dataReset
            },
            'purchaseletterrewardprosesformdata': {
                afterrender: this.formDataAfterRender
            },
            'purchaseletterrewardprosesformdata button[action=save]': {
                // click: function () {
                //     alert('woy');
                //     // console.log(row)
                //     // me.formdatadetail.editingIndexRow = row;
                // }
                click: this.dataSave
            },
            // 'purchaseletterrewardprosesformdatadetail button[action=save]': {
            //     click: this.formdatadetail.save
            // },
            // 'purchaseletterrewardprosesgriddetail gridcolumn': {
            //     click: function (view, cell, row, col, e) {
            //         // console.log(row)
            //         me.formdatadetail.editingIndexRow = row;
            //     }
            // },
            'purchaseletterrewardprosesformsearch [name=unit_unit_number]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardprosesformsearch [name=purchaseletter_no]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardprosesformsearch [name=customer_name]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardprosesformsearch [name=unit_virtualaccount_bca]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardprosesformsearch [name=unit_virtualaccount_mandiri]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },


        });
    },
    panelAfterRender: function () {
        var me = this;

    },
    // addreward: function () {
    //     var me = this;
    //     me.detailTool = new Erems.library.DetailtoolAll();
    //     me.detailTool.setConfig({
    //         viewPanel: 'FormDataDetail',
    //         parentFDWindowId: me.getFormdata().up('window').id,
    //         controllerName: me.controllerName
    //     });
    //     me.detailTool.parentGridAlias = 'purchaseletterrewardgriddetail';

    //     me.detailTool.form().show('create', 500, 'Add Reward');

    // },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        // grid.down('#btnDelete').setDisabled(row.length < 1);
    },

    fdar: function (el) {
        var me = this;
        var x = {
            init: function () {
                // me.detailTool2 = new Erems.library.DetailtoolAll();
                // me.detailTool2.setConfig({
                //     viewPanel: 'BankAkadFormDataDetail',
                //     parentFDWindowId: me.getFormdata().up('window').id,
                //     controllerName: me.controllerName
                // });
                // me.detailTool2.parentGridAlias = 'buktipemilikbankgridakad';
            },
            create: function () {

            },
            update: function () {
                var grid = me.getGrid();
                var store = grid.getStore();
                var rec = grid.getSelectedRecord();
                // var rows = grid.getSelectionModel().getSelection();
                var fd = me.getFormdata();
                // var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                fd.loadRecord(rec);
                // el.loadRecord(rec);

                // console.log(record);
                // console.log(rec);
                Ext.Ajax.request({
                    url: 'erems/purchaseletterreward/read',
                    params: {
                        mode_read: 'pl_detail',
                        purchaseletter_id: rec.get("purchaseletter_id")
                    },
                    success: function (response) {
                        res = Ext.JSON.decode(response.responseText);
                        console.log(res.data[0])
                        fd.down('[name=pt_name]').setValue(res.data[0]['pt_name']);
                        fd.down('[name=salesman_employee_name]').setValue(res.data[0]['salesman_employee_name']);
                        fd.down('[name=cluster_code]').setValue(res.data[0]['cluster_code']);
                        fd.down('[name=block_code]').setValue(res.data[0]['block_code']);
                        fd.down('[name=block_block]').setValue(res.data[0]['block_block']);
                        fd.down('[name=productcategory_productcategory]').setValue(res.data[0]['productcategory_productcategory']);
                        fd.down('[name=unit_land_size]').setValue(res.data[0]['unit_land_size']);
                        fd.down('[name=unit_long]').setValue(res.data[0]['unit_long']);
                        fd.down('[name=unit_building_size]').setValue(res.data[0]['unit_building_size']);
                        fd.down('[name=unit_width]').setValue(res.data[0]['unit_width']);
                        fd.down('[name=unit_kelebihan]').setValue(res.data[0]['unit_kelebihan']);
                        fd.down('[name=unit_floor]').setValue(res.data[0]['unit_floor']);
                        fd.down('[name=unit_progress]').setValue(res.data[0]['unit_progress']);
                        fd.down('[name=unitstatus_status]').setValue(res.data[0]['unitstatus_status']);
                        fd.down('[name=customer_code]').setValue(res.data[0]['customer_no']);
                        fd.down('[name=customer_zipcode]').setValue(res.data[0]['customer_zipcode']);
                        fd.down('[name=customer_mobile_phone]').setValue(res.data[0]['customer_mobile_phone']);
                        fd.down('[name=customer_home_phone]').setValue(res.data[0]['customer_home_phone']);
                        fd.down('[name=customer_office_phone]').setValue(res.data[0]['customer_office_phone']);
                        fd.down('[name=customer_fax]').setValue(res.data[0]['customer_fax']);
                        fd.down('[name=customer_KTP_number]').setValue(res.data[0]['customer_KTP_number']);
                        fd.down('[name=customer_KTP_address]').setValue(res.data[0]['customer_KTP_address']);
                        fd.down('[name=customer_NPWP]').setValue(res.data[0]['customer_NPWP']);
                        fd.down('[name=customer_NPWP_address]').setValue(res.data[0]['customer_NPWP_address']);
                        fd.down('[name=customer_email]').setValue(res.data[0]['customer_email']);
                        fd.down('[name=unit_electricity]').setValue(res.data[0]['unit_electricity']);
                        fd.down('[name=customer_NPWP_name]').setValue(res.data[0]['customer_npwp_name']);
                        fd.down('[name=firstpurchase_date]').setValue(res.data[0]['firstpurchase_date']);
                        fd.down('[name=city_city_name]').setValue(res.data[0]['city_city_name']);
                        fd.down('[name=customer_address]').setValue(res.data[0]['customer_address']);
                    }
                });

                me.getDetailgrid().body.mask('Loading Detail, please wait ...');
                var purchaseletterrewarddetailStore = me.getPurchaseletterrewardprosesdetailStore();
                purchaseletterrewarddetailStore.removeAll();
                purchaseletterrewarddetailStore.load({
                    params: {
                        purchaseletter_id: rec.get("purchaseletter_id"),
                        mode_read: 'detail_grid'
                    },
                    callback: function (pencairanrec) {
                        me.getDetailgrid().body.unmask();
                    }
                });

            }
        };
        return x;
    },

    // formdatadetail: {
    //     that: this,
    //     editingIndexRow: 0,
    //     save: function () {
    //         var me = this;
    //         //            alert('wowowowow');
    //         var form = me.getFormdatadetail();
    //         var formVal = form.getForm().getValues();

    //         var purchaseletterId = me.getFormdata().down('[name=purchaseletter_id]').getValue();

    //         // var msg = '';
    //         // var win = me.getFormdatadetail().up('window');

    //         if (form.getForm().isValid()) {
    //             var dStore = null;
    //             var win = form.up('window');

    //             dStore = me.getDetailgrid().getStore();
    //             console.log(form.down('[name=group_id]').rawValue)
    //             var val = {
    //                 purchaseletter_reward_id: formVal.purchaseletter_reward_id,
    //                 purchaseletter_id: purchaseletterId,
    //                 group_id: formVal.group_id,
    //                 group_name: form.down('[name=group_id]').rawValue,
    //                 amount: formVal.amount,
    //                 reward: formVal.reward,
    //             };

    //             if (win.state == 'create') {
    //                 dStore.add(val);

    //             } else {

    //                 var rec = dStore.getAt(me.formdatadetail.editingIndexRow);
    //                 rec.beginEdit();
    //                 rec.set(val);
    //                 rec.endEdit();
    //             }


    //             win.close();
    //         }
    //     }
    // },
    // formdatadetailactionEdit: function () {
    //     var me = this;
    //     var gr = me.getDetailgrid();
    //     // var rows = gr.getSelectionModel().getSelection();
    //     var rec = gr.getSelectedRecord();
    //     // var record = gr.getStore().getAt(gr.getStore().indexOf(gr.getSelectionModel().getSelection()[0]));
    //     // console.log(rec.data)
    //     var row = gr.getSelectionModel().getSelection();
    //     if (row.length > 0) {
    //         me.detailTool = new Erems.library.DetailtoolAll();
    //         me.detailTool.setConfig({
    //             viewPanel: 'FormDataDetail',
    //             parentFDWindowId: me.getFormdata().up('window').id,
    //             controllerName: me.controllerName
    //         });
    //         me.detailTool.parentGridAlias = 'purchaseletterrewardgriddetail';

    //         me.detailTool.form().show('update', 500, 'Edit Reward');
    //         // me.formdatadetail.editingIndexRow = view[1];
    //         me.getFormdatadetail().getForm().setValues({
    //             purchaseletter_reward_id: rec.data.purchaseletter_reward_id,
    //             purchaseletter_id: rec.data.purchaseletter_id,
    //             group_id: rec.data.group_id,
    //             amount: rec.data.amount,
    //             reward: rec.data.reward
    //         });
    //     } else {
    //         Ext.Msg.alert("Alert", "Please select data");
    //     }
    // },
    // formdatadetailactionDelete: function () {
    //     var me = this;
    //     var gr = me.getDetailgrid();

    //     Ext.Msg.confirm('Delete Data', 'Delete record?', function (btn) {
    //         if (btn == 'yes') {
    //             var row = gr.getSelectionModel().getSelection();
    //             if (row.length > 0) {
    //                 var record = gr.getStore().getAt(me.formdatadetail.editingIndexRow);
    //                 record.set("deleted", true);
    //                 gr.getStore().filterBy(function (recod) {
    //                     return recod.data.deleted == false;
    //                 });
    //             } else {
    //                 Ext.Msg.alert("Alert", "Please select data");
    //             }
    //         }
    //     });
    // },

    dataSave: function () {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }


        if (form.isValid()) {

            resetTimer();

            var rewardStore = me.getDetailgrid().getStore();
            rewardStore.clearFilter(true);
            var data_reward = [];
            for (var i = 0; i < rewardStore.getCount(); i++) {
                rewardStore.each(function (record, idx) {
                    if (i == idx) {
                        data_reward[i] = record.data
                    }
                });
            }
            console.log(data_reward);

            var fields = me.getFormdata().getValues();

            var myObj = {
                data_detail: data_reward
            }

            me.getFormdata().up('window').body.mask('Saving, please wait ...');

            Ext.Ajax.request({
                url: 'erems/purchaseletterrewardproses/create',
                //params:'data='+Ext.encode(data),
                params: {
                    data: Ext.encode(myObj)
                },
                success: function (response) {
                    me.getFormdata().up('window').body.unmask();
                    if (Ext.decode(response.responseText).success == true) {
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully.',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function () {
                                me.getFormdata().up('window').close();
                                // var gridDepan = me.getGrid();
                                // var storeDepan = gridDepan.getStore();
                                // storeDepan.reload();
                            }
                        });
                    } else {
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: Unable to save data.',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                },
            });

        }

    },

    // dataDestroy: function () {
    //     var me = this;
    //     var rows = me.getGrid().getSelectionModel().getSelection();
    //     var rec = me.getGrid().getSelectedRecord();
    //     var store = me.getGrid().getStore();
    //     var confirmmsg, successmsg, failmsg;
    //     if (rows.length == 1) {
    //         var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('cluster') + ']';
    //         confirmmsg = 'Delete ' + selectedRecord + ' ?';
    //         failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
    //     } else {
    //         confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
    //         failmsg = 'Error: Unable to delete data.';
    //     }
    //     Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
    //         if (btn == 'yes') {
    //             resetTimer();
    //             var msg = function () {
    //                 me.getGrid().up('window').mask('Deleting data, please wait ...');
    //             };
    //             for (var i = 0; i < rows.length; i++) {
    //                 store.remove(rows[i]);
    //             }
    //             store.on('beforesync', msg);
    //             store.sync({
    //                 success: function (s) {
    //                     me.getGrid().up('window').unmask();
    //                     var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
    //                     var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
    //                     store.un('beforesync', msg);
    //                     store.reload();
    //                     if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
    //                         Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 25 } });
    //                     }

    //                     me.getDetailgrid().body.mask('Loading Detail, please wait ...');
    //                     var klaimkomisinewdetailStore = me.getKlaimkomisinewdetailStore();
    //                     klaimkomisinewdetailStore.removeAll();
    //                     klaimkomisinewdetailStore.load({
    //                         // params: { purchaseletter_id: rec.get("purchaseletter_id") },
    //                         callback: function (pencairanrec) {
    //                             me.getDetailgrid().body.unmask();
    //                         }
    //                     });

    //                     Ext.Msg.show({
    //                         title: 'Success',
    //                         msg: successmsg,
    //                         icon: Ext.Msg.INFO,
    //                         buttons: Ext.Msg.OK
    //                     });
    //                 },
    //                 failure: function () {
    //                     me.getGrid().up('window').unmask();
    //                     store.un('beforesync', msg);
    //                     store.reload();
    //                     Ext.Msg.show({
    //                         title: 'Failure',
    //                         msg: failmsg + ' The data may have been used.',
    //                         icon: Ext.Msg.ERROR,
    //                         buttons: Ext.Msg.OK
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // },

    getFinalData: function (formGetValues) {
        var finalData = formGetValues;
        return finalData;
    },
    validationProcess: function () {
        return true;
    },


    ///////////////////////////////// batas////////////////////////////




});