Ext.define('Erems.controller.Formundanganajb', {
    //    extend: 'Erems.library.template.controller.Controlleralt',
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Formundanganajb',
    requires:[
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Blockcombobox'
    ],
    views: ['formundanganajb.Panel', 'formundanganajb.Grid', 'formundanganajb.FormSearch', 'formundanganajb.FormData', 'formundanganajb.GridDetail'],
    stores: ['Formundanganajb', 'Formundanganajbdetail', 'Responundanganajb', 'Masterparameterglobal','Mastercluster','Masterblock'],
    models: ['Formundanganajb', 'Formundanganajbdetail', 'Responundanganajb','Mastercluster','Masterblock'],
    refs: [
        {
            ref: 'grid',
            selector: 'formundanganajbgrid'
        },
        {
            ref: 'formsearch',
            selector: 'formundanganajbformsearch'
        },
        {
            ref: 'formdata',
            selector: 'formundanganajbformdata'
        },
        {
            ref: 'detailgrid',
            selector: 'formundanganajbgriddetail'
        },
    ],
    comboBoxIdEl: ['fs_cluster_id', 'fs_block_id'],
    controllerName: 'formundanganajb',
    fieldName: 'hgbajb_id',
    bindPrefixName: 'Formundanganajb',
    formWidth: 800,
    nomorValue: 1,
    checkedStatus: 0,
    init: function (application) {
        var me = this;
        this.control({
            'formundanganajbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'formundanganajbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'formundanganajbgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'formundanganajbgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'formundanganajbgrid button[action=ExporttoExcel]': {
                click: this.processExporttoExcel
            },
            'formundanganajbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'formundanganajbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'formundanganajbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'formundanganajbformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'formundanganajbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'formundanganajbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'formundanganajbformdata': {
                afterrender: this.formDataAfterRender
            },
            'formundanganajbformdata button[action=save]': {
                click: me.dataSave
            },
            'formundanganajbformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'formundanganajbformdata button[action=save_detail]': {
                //                click: function() {
                //                    me.detailData.save_data('create');
                //                }
                click: me.detailData.save_data
            },
            'formundanganajbformdata button[action=update_detail]': {
                //                click: function() {
                //                    this.detailData.save_data('update');
                //                }
                click: me.detailData.save_data
            },
            'formundanganajbformdata button[action=cancel_detail]': {
                click: me.detailData.cancel
            },
            'formundanganajbgriddetail actioncolumn': {
                deleteaction: me.detailData.DeleteColumnClick,
                editaction: me.detailData.EditColumnClick
            },
            'formundanganajbformdata [name=wastatus1]': {
                change: function () {
                    me.getFormdata().down("[name=wa_1_keterangan]").setReadOnly(false);
                }
            },
            'formundanganajbformdata [name=wastatus2]': {
                change: function () {
                    me.getFormdata().down("[name=wa_2_keterangan]").setReadOnly(false);
                }
            },
            'formundanganajbformdata [name=wastatus3]': {
                change: function () {
                    me.getFormdata().down("[name=wa_3_keterangan]").setReadOnly(false);
                }
            },
            'formundanganajbformdata [name=wastatus4]': {
                change: function () {
                    me.getFormdata().down("[name=wa_4_keterangan]").setReadOnly(false);
                }
            },
            /* BROWSE CONTROL */
            /*'formundanganajbbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'formundanganajbbrowsepanel button[action=select]':{
                click:me.browsegridSelection
            },
            'formundanganajbbrowsegrid':{
                afterrender:me.browsegridAfterRender
            },
            'formundanganajbbrowseformsearch button[action=search]': {
                click: me.browsedataSearch
            },
            'formundanganajbbrowseformsearch button[action=reset]': {
                click: me.browsedataReset
            }*/
            /* END BROWSE CONTROL */

            //added by anas 27052021
            'formundanganajbgrid toolbar button[action=print_doc]': {
                click: this.docPrint
            },
        });
    },


    formDataAfterRender: function (el) {
        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            //            var formundanganajbdetailStore = me.getFormundanganajbdetailStore();
            //		formundanganajbdetailStore.removeAll();

        } else if (state == 'update') {
            var grid = me.getGrid();
            var store = grid.getStore();
            var form = me.getFormdata();

            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            el.loadRecord(record);
            //            console.log(record);
            form.down("[name=jam_janjian_ajb]").setValue(0)
            form.down("[name=jam_janjian_ajb_menit]").setValue(0);

            el.body.mask('Loading Detail, please wait ...');
            var formundanganajbdetailStore = me.getFormundanganajbdetailStore();
            formundanganajbdetailStore.removeAll();
            formundanganajbdetailStore.load({
                params: { hgbajb_id: record.data.hgbajb_id },
                callback: function (pencairanrec) {
                    el.body.unmask();
                }
            });
        }
    },

    detailData: {
        that: this,
        editingIndexRow: 0,
        save_data: function () {
            //                    console.log(flag);
            var me = this;
            var form = this.getFormdata().getForm();
            var formVal = me.getFormdata().getForm().getValues();
            var fields = me.getFormdata().getValues();

            if (formVal.undangan_date == '') {
                Ext.Msg.show({
                    title: 'Information',
                    msg: 'Tanggal Undangan tidak boleh kosong',
                    icon: Ext.Msg.WARNING,
                    buttons: Ext.Msg.OK
                });

                return false;
            }

            if (form.isValid()) {
                var undangan_id = fields.hgbajb_undangan_id;
                var link_url = '';
                var msg_success = '';
                var msg_error = '';
                var jam_janjian_ajb = '';
                if (fields.jam_janjian_ajb !== '') {
                    if (fields.jam_janjian_ajb_menit == '') {
                        jam_janjian_ajb = fields.jam_janjian_ajb + ':' + '0';
                    } else {
                        jam_janjian_ajb = fields.jam_janjian_ajb + ':' + fields.jam_janjian_ajb_menit;
                    }
                }
                var myObj = {
                    hgbajb_undangan_id: undangan_id,
                    hgbajb_id: fields.hgbajb_id,
                    unit_id: fields.unit_id,
                    buktipemilik_id: fields.buktipemilik_id,
                    undangan_date: fields.undangan_date,
                    janjian_ajb_date: fields.janjian_ajb_date,
                    email_1_date: fields.email_1_date,
                    email_2_date: fields.email_2_date,
                    email_3_date: fields.email_3_date,
                    email_4_date: fields.email_4_date,
                    surat_1_date: fields.surat_1_date,
                    surat_2_date: fields.surat_2_date,
                    surat_3_date: fields.surat_3_date,
                    surat_4_date: fields.surat_4_date,
                    wa_1_date: fields.wa_1_date,
                    wa_2_date: fields.wa_2_date,
                    wa_3_date: fields.wa_3_date,
                    wa_4_date: fields.wa_4_date,
                    email_1_status: fields.emailstatus1,
                    email_2_status: fields.emailstatus2,
                    email_3_status: fields.emailstatus3,
                    email_4_status: fields.emailstatus4,
                    surat_1_status: fields.suratstatus1,
                    surat_2_status: fields.suratstatus2,
                    surat_3_status: fields.suratstatus3,
                    surat_4_status: fields.suratstatus4,
                    wa_1_status: fields.wastatus1,
                    wa_2_status: fields.wastatus2,
                    wa_3_status: fields.wastatus3,
                    wa_4_status: fields.wastatus4,
                    wa_1_keterangan: fields.wa_1_keterangan,
                    wa_2_keterangan: fields.wa_2_keterangan,
                    wa_3_keterangan: fields.wa_3_keterangan,
                    wa_4_keterangan: fields.wa_4_keterangan,
                    description_undangan: fields.description_undangan,
                    respon_undanganajb_id: fields.respon_undanganajb_id,
                    is_got_email: fields.is_got_email,
                    jam_janjian_ajb: jam_janjian_ajb
                }

                //                            console.log(myObj);
                resetTimer();
                if (undangan_id == '') {
                    link_url = 'erems/formundanganajb/create';
                    msg_success = 'Data saved successfully.';
                    msg_error = 'Error: Unable to save data.';
                } else {
                    link_url = 'erems/formundanganajb/update';
                    msg_success = 'Data update successfully.';
                    msg_error = 'Error: Unable to update data.';
                }
                me.getFormdata().up('window').body.mask('Saving, please wait ...');
                Ext.Ajax.request({
                    url: link_url,
                    params: {
                        data: Ext.encode(myObj)
                    },
                    success: function (response) {
                        me.getFormdata().up('window').body.unmask();
                        if (Ext.decode(response.responseText).success == true) {
                            Ext.Msg.show({
                                title: 'Success',
                                msg: msg_success,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK,
                                fn: function () {
                                    //                                                console.log(me.getDetailgrid.getStore());
                                    //                                                me.getFormdata().up('window').close();
                                    var gridDepan = me.getGrid();
                                    var storeDepan = gridDepan.getStore();
                                    var f = me.getFormdata();
                                    storeDepan.reload();
                                    me.getDetailgrid().getStore().reload();
                                    f.down("[name=hgbajb_undangan_id]").setValue('');
                                    f.down("[name=undangan_date]").setValue('');
                                    f.down("[name=janjian_ajb_date]").setValue('');
                                    f.down("[name=email_1_date]").setValue('');
                                    f.down("[name=email_2_date]").setValue('');
                                    f.down("[name=email_3_date]").setValue('');
                                    f.down("[name=email_4_date]").setValue('');
                                    f.down("[name=surat_1_date]").setValue('');
                                    f.down("[name=surat_2_date]").setValue('');
                                    f.down("[name=surat_3_date]").setValue('');
                                    f.down("[name=surat_4_date]").setValue('');
                                    f.down("[name=wa_1_date]").setValue('');
                                    f.down("[name=wa_2_date]").setValue('');
                                    f.down("[name=wa_3_date]").setValue('');
                                    f.down("[name=wa_4_date]").setValue('');
                                    f.down("#emailstatus1_1").setValue(false);
                                    f.down("#emailstatus1_2").setValue(false);
                                    f.down("#emailstatus2_1").setValue(false);
                                    f.down("#emailstatus2_2").setValue(false);
                                    f.down("#emailstatus3_1").setValue(false);
                                    f.down("#emailstatus3_2").setValue(false);
                                    f.down("#emailstatus4_1").setValue(false);
                                    f.down("#emailstatus4_2").setValue(false);
                                    f.down("#suratstatus1_1").setValue(false);
                                    f.down("#suratstatus1_2").setValue(false);
                                    f.down("#suratstatus2_1").setValue(false);
                                    f.down("#suratstatus2_2").setValue(false);
                                    f.down("#suratstatus3_1").setValue(false);
                                    f.down("#suratstatus3_2").setValue(false);
                                    f.down("#suratstatus4_1").setValue(false);
                                    f.down("#suratstatus4_2").setValue(false);
                                    f.down("#wastatus1_1").setValue(false);
                                    f.down("#wastatus1_2").setValue(false);
                                    f.down("#wastatus1_3").setValue(false);
                                    f.down("#wastatus2_1").setValue(false);
                                    f.down("#wastatus2_2").setValue(false);
                                    f.down("#wastatus2_3").setValue(false);
                                    f.down("#wastatus3_1").setValue(false);
                                    f.down("#wastatus3_2").setValue(false);
                                    f.down("#wastatus3_3").setValue(false);
                                    f.down("#wastatus4_1").setValue(false);
                                    f.down("#wastatus4_2").setValue(false);
                                    f.down("#wastatus4_3").setValue(false);
                                    f.down("[name=wa_1_keterangan]").setValue('');
                                    f.down("[name=wa_2_keterangan]").setValue('');
                                    f.down("[name=wa_3_keterangan]").setValue('');
                                    f.down("[name=wa_4_keterangan]").setValue('');
                                    f.down("[name=description_undangan]").setValue('');
                                    f.down("[name=btn_save]").setVisible(true);
                                    f.down("[name=btn_update]").setVisible(false);
                                    f.down("[name=btn_cancel]").setVisible(false);
                                    f.down("[name=respon_undanganajb_id]").setValue('');
                                    f.down("[name=is_got_email]").setValue('');
                                    f.down("[name=jam_janjian_ajb]").setValue(0);
                                    f.down("[name=jam_janjian_ajb_menit]").setValue(0);
                                }
                            });
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: msg_error,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    },
                });
            }

        },
        DeleteColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
            var me = this;
            var gr = me.getDetailgrid();


            //                        console.log(view[5].get("hgbajb_undangan_id"));
            var id_data = view[5].get("hgbajb_undangan_id");
            var data_delete = {
                hgbajb_undangan_id: id_data,
            };

            Ext.Msg.confirm('Delete Data', 'Delete Undangan', function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: 'erems/formundanganajb/delete',
                        params: {
                            data: Ext.encode(data_delete)
                        },
                        success: function (response) {
                            me.getFormdata().up('window').body.unmask();
                            if (Ext.decode(response.responseText).success == true) {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Data deleted successfully.',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        me.getDetailgrid().getStore().reload();
                                    }
                                });
                            }
                            else {
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: 'Error: Unable to deleted data.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                    });
                }
            });

        },
        EditColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
            var me = this;
            var gr = me.getDetailgrid();
            var f = me.getFormdata();

            f.down("[name=btn_save]").setVisible(false);
            f.down("[name=btn_update]").setVisible(true);
            f.down("[name=btn_cancel]").setVisible(true);
            console.log(view);
            var undangan_id = view[5].get("hgbajb_undangan_id");
            var undangan_date = view[5].get("undangan_date");
            var janjian_ajb_date = view[5].get("janjian_ajb_date");
            var email_1_date = view[5].get("email_1_date");
            var email_2_date = view[5].get("email_2_date");
            var email_3_date = view[5].get("email_3_date");
            var email_4_date = view[5].get("email_4_date");
            var surat_1_date = view[5].get("surat_1_date");
            var surat_2_date = view[5].get("surat_2_date");
            var surat_3_date = view[5].get("surat_3_date");
            var surat_4_date = view[5].get("surat_4_date");
            var wa_1_date = view[5].get("wa_1_date");
            var wa_2_date = view[5].get("wa_2_date");
            var wa_3_date = view[5].get("wa_3_date");
            var wa_4_date = view[5].get("wa_4_date");
            var email_1_status = view[5].get("email_1_status");
            var email_2_status = view[5].get("email_2_status");
            var email_3_status = view[5].get("email_3_status");
            var email_4_status = view[5].get("email_4_status");
            var surat_1_status = view[5].get("surat_1_status");
            var surat_2_status = view[5].get("surat_2_status");
            var surat_3_status = view[5].get("surat_3_status");
            var surat_4_status = view[5].get("surat_4_status");
            var wa_1_status = view[5].get("wa_1_status");
            var wa_2_status = view[5].get("wa_2_status");
            var wa_3_status = view[5].get("wa_3_status");
            var wa_4_status = view[5].get("wa_4_status");
            var wa_1_keterangan = view[5].get("wa_1_keterangan");
            var wa_2_keterangan = view[5].get("wa_2_keterangan");
            var wa_3_keterangan = view[5].get("wa_3_keterangan");
            var wa_4_keterangan = view[5].get("wa_4_keterangan");
            var undangan_desc = view[5].get("description_undangan");
            var respon = view[5].get("respon_undanganajb_id");
            var is_got_email = view[5].get("is_got_email");
            var jam_janjian_ajb = view[5].get("jam_janjian_ajb");
            console.log(jam_janjian_ajb);
            if (jam_janjian_ajb === '') {
                var jam_janjian_1 = 0
                var jam_janjian_2 = 0
            } else {
                var jam_janjian = jam_janjian_ajb.split(':')
                var jam_janjian_1 = jam_janjian[0]
                var jam_janjian_2 = jam_janjian[1]
            }

            f.down("[name=hgbajb_undangan_id]").setValue(undangan_id);
            f.down("[name=undangan_date]").setValue(undangan_date);
            f.down("[name=janjian_ajb_date]").setValue(janjian_ajb_date);
            f.down("[name=email_1_date]").setValue(email_1_date);
            f.down("[name=email_2_date]").setValue(email_2_date);
            f.down("[name=email_3_date]").setValue(email_3_date);
            f.down("[name=email_4_date]").setValue(email_4_date);
            f.down("[name=surat_1_date]").setValue(surat_1_date);
            f.down("[name=surat_2_date]").setValue(surat_2_date);
            f.down("[name=surat_3_date]").setValue(surat_3_date);
            f.down("[name=surat_4_date]").setValue(surat_4_date);
            f.down("[name=wa_1_date]").setValue(wa_1_date);
            f.down("[name=wa_2_date]").setValue(wa_2_date);
            f.down("[name=wa_3_date]").setValue(wa_3_date);
            f.down("[name=wa_4_date]").setValue(wa_4_date);
            f.down("[name=wa_1_keterangan]").setValue(wa_1_keterangan);
            f.down("[name=wa_2_keterangan]").setValue(wa_2_keterangan);
            f.down("[name=wa_3_keterangan]").setValue(wa_3_keterangan);
            f.down("[name=wa_4_keterangan]").setValue(wa_4_keterangan);
            f.down("[name=description_undangan]").setValue(undangan_desc);
            f.down("[name=respon_undanganajb_id]").setValue(respon);
            f.down("[name=is_got_email]").setValue(is_got_email);
            f.down("[name=jam_janjian_ajb]").setValue(jam_janjian_1);
            f.down("[name=jam_janjian_ajb_menit]").setValue(jam_janjian_2);


            f.down("#emailstatus1_1").setValue(false);
            f.down("#emailstatus1_2").setValue(false);
            f.down("#emailstatus2_1").setValue(false);
            f.down("#emailstatus2_2").setValue(false);
            f.down("#emailstatus3_1").setValue(false);
            f.down("#emailstatus3_2").setValue(false);
            f.down("#emailstatus4_1").setValue(false);
            f.down("#emailstatus4_2").setValue(false);
            f.down("#suratstatus1_1").setValue(false);
            f.down("#suratstatus1_2").setValue(false);
            f.down("#suratstatus2_1").setValue(false);
            f.down("#suratstatus2_2").setValue(false);
            f.down("#suratstatus3_1").setValue(false);
            f.down("#suratstatus3_2").setValue(false);
            f.down("#suratstatus4_1").setValue(false);
            f.down("#suratstatus4_2").setValue(false);
            f.down("#wastatus1_1").setValue(false);
            f.down("#wastatus1_2").setValue(false);
            f.down("#wastatus1_3").setValue(false);
            f.down("#wastatus2_1").setValue(false);
            f.down("#wastatus2_2").setValue(false);
            f.down("#wastatus2_3").setValue(false);
            f.down("#wastatus3_1").setValue(false);
            f.down("#wastatus3_2").setValue(false);
            f.down("#wastatus3_3").setValue(false);
            f.down("#wastatus4_1").setValue(false);
            f.down("#wastatus4_2").setValue(false);
            f.down("#wastatus4_3").setValue(false);

            if (email_1_status == 1) {
                f.down("#emailstatus1_1").setValue(true);
            } else if (email_1_status == 2) {
                f.down("#emailstatus1_2").setValue(true);
            }

            if (email_2_status == 1) {
                f.down("#emailstatus2_1").setValue(true);
            } else if (email_2_status == 2) {
                f.down("#emailstatus2_2").setValue(true);
            }

            if (email_3_status == 1) {
                f.down("#emailstatus3_1").setValue(true);
            } else if (email_3_status == 2) {
                f.down("#emailstatus3_2").setValue(true);
            }

            if (email_4_status == 1) {
                f.down("#emailstatus4_1").setValue(true);
            } else if (email_4_status == 2) {
                f.down("#emailstatus4_2").setValue(true);
            }

            if (surat_1_status == 1) {
                f.down("#suratstatus1_1").setValue(true);
            } else if (surat_1_status == 2) {
                f.down("#suratstatus1_2").setValue(true);
            }

            if (surat_2_status == 1) {
                f.down("#suratstatus2_1").setValue(true);
            } else if (surat_2_status == 2) {
                f.down("#suratstatus2_2").setValue(true);
            }

            if (surat_3_status == 1) {
                f.down("#suratstatus3_1").setValue(true);
            } else if (surat_3_status == 2) {
                f.down("#suratstatus3_2").setValue(true);
            }

            if (surat_4_status == 1) {
                f.down("#suratstatus4_1").setValue(true);
            } else if (surat_4_status == 2) {
                f.down("#suratstatus4_2").setValue(true);
            }

            ///////
            if (wa_1_status == 1) {
                f.down("#wastatus1_1").setValue(true);
            } else if (wa_1_status == 2) {
                f.down("#wastatus1_2").setValue(true);
            } else if (wa_1_status == 3) {
                f.down("#wastatus1_3").setValue(true);
            }

            if (wa_2_status == 1) {
                f.down("#wastatus2_1").setValue(true);
            } else if (wa_2_status == 2) {
                f.down("#wastatus2_2").setValue(true);
            } else if (wa_2_status == 3) {
                f.down("#wastatus2_3").setValue(true);
            }

            if (wa_3_status == 1) {
                f.down("#wastatus3_1").setValue(true);
            } else if (wa_3_status == 2) {
                f.down("#wastatus3_2").setValue(true);
            } else if (wa_3_status == 3) {
                f.down("#wastatus3_3").setValue(true);
            }

            if (wa_4_status == 1) {
                f.down("#wastatus4_1").setValue(true);
            } else if (wa_4_status == 2) {
                f.down("#wastatus4_2").setValue(true);
            } else if (wa_4_status == 3) {
                f.down("#wastatus4_3").setValue(true);
            }

            console.log(undangan_id);

        },
        cancel: function () {
            var me = this;
            var f = me.getFormdata();
            f.down("[name=hgbajb_undangan_id]").setValue('');
            f.down("[name=undangan_date]").setValue('');
            f.down("[name=janjian_ajb_date]").setValue('');
            f.down("[name=email_1_date]").setValue('');
            f.down("[name=email_2_date]").setValue('');
            f.down("[name=email_3_date]").setValue('');
            f.down("[name=email_4_date]").setValue('');
            f.down("[name=surat_1_date]").setValue('');
            f.down("[name=surat_2_date]").setValue('');
            f.down("[name=surat_3_date]").setValue('');
            f.down("[name=surat_4_date]").setValue('');
            f.down("[name=wa_1_date]").setValue('');
            f.down("[name=wa_2_date]").setValue('');
            f.down("[name=wa_3_date]").setValue('');
            f.down("[name=wa_4_date]").setValue('');
            f.down("[name=wa_1_keterangan]").setValue('');
            f.down("[name=wa_2_keterangan]").setValue('');
            f.down("[name=wa_3_keterangan]").setValue('');
            f.down("[name=wa_4_keterangan]").setValue('');
            f.down("#emailstatus1_1").setValue(false);
            f.down("#emailstatus1_2").setValue(false);
            f.down("#emailstatus2_1").setValue(false);
            f.down("#emailstatus2_2").setValue(false);
            f.down("#emailstatus3_1").setValue(false);
            f.down("#emailstatus3_2").setValue(false);
            f.down("#emailstatus4_1").setValue(false);
            f.down("#emailstatus4_2").setValue(false);
            f.down("#suratstatus1_1").setValue(false);
            f.down("#suratstatus1_2").setValue(false);
            f.down("#suratstatus2_1").setValue(false);
            f.down("#suratstatus2_2").setValue(false);
            f.down("#suratstatus3_1").setValue(false);
            f.down("#suratstatus3_2").setValue(false);
            f.down("#suratstatus4_1").setValue(false);
            f.down("#suratstatus4_2").setValue(false);
            f.down("#wastatus1_1").setValue(false);
            f.down("#wastatus1_2").setValue(false);
            f.down("#wastatus1_3").setValue(false);
            f.down("#wastatus2_1").setValue(false);
            f.down("#wastatus2_2").setValue(false);
            f.down("#wastatus2_3").setValue(false);
            f.down("#wastatus3_1").setValue(false);
            f.down("#wastatus3_2").setValue(false);
            f.down("#wastatus3_3").setValue(false);
            f.down("#wastatus4_1").setValue(false);
            f.down("#wastatus4_2").setValue(false);
            f.down("#wastatus4_3").setValue(false);
            f.down("[name=description_undangan]").setValue('');
            f.down("[name=respon_undanganajb_id]").setValue('');
            f.down("[name=is_got_email]").setValue('');
            f.down("[name=jam_janjian_ajb]").setValue(0);
            f.down("[name=jam_janjian_ajb_menit]").setValue(0);
            f.down("[name=btn_save]").setVisible(true);
            f.down("[name=btn_update]").setVisible(false);
            f.down("[name=btn_cancel]").setVisible(false);
        }
    },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        //        grid.down('#btnDelete').setDisabled(row.length < 1);

        //added by anas 27052021
        grid.down('#btnPrint').setDisabled(true);
        if (row.length == 1) {
            grid.down('#btnPrint').setDisabled(false);
        }
        //end added by anas
    },

    processExporttoExcel: function () {
        var me = this;
        me.getGrid().up('window').body.mask('Creating Excel File, Please Wait...');

        Ext.Ajax.timeout = 60000 * 30;

        Ext.Ajax.request({
            url: 'erems/formundanganajb/read/?action=schema',
            params: {
                read_type_mode: "ExporttoExcel"
            },
            success: function (response) {
                try {
                    var resp = response.responseText;

                    if (resp) {
                        var info = Ext.JSON.decode(resp);

                        if (info.success == true) {
                            me.getGrid().up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Info',
                                msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
                                icon: Ext.Msg.INFO,
                                //buttons: [], //jika ingin tidak ada buttons
                                buttons: Ext.Msg.CANCEL,
                                buttonText:
                                {
                                    cancel: 'Close',
                                }
                            });
                        } else {
                            me.getGrid().up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Error: Create Report Undangan AJB Failed. 1',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                } catch (e) {
                    //console.error(e);
                    me.getGrid().up('window').body.unmask();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Create Report Undangan AJB Failed. 2',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function (e) {
                //console.error(e);
                me.getGrid().up('window').body.unmask();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Create Report Undangan AJB Failed. 3',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

    //added by anas 27052021
    //printout
    docPrint: function () {
        var me = this;

        var globalparameterStore = me.getMasterparameterglobalStore();
        globalparameterStore.removeAll();
        globalparameterStore.load({ params: { parametername: 'PRINTOUT_UNDANGAN_AJB_DOC' } });

        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

        var id = record.data.unit_id;
        console.log(id);
        me.documentPrintout(id, 'erems/formundanganajb/read');

        var combo = Ext.getCmp('cbPrintoutID');
        combo.bindStore(globalparameterStore);
    },
});