Ext.define('Erems.controller.Mastercustomer10012017', {
    extend: 'Erems.library.template.controller.Controllerwb',
    alias: 'controller.Mastercustomer10012017',
    views: ['mastercustomer.Panel', 'mastercustomer.Grid', 'mastercustomer.FormSearch', 'mastercustomer.FormData'],
    //  stores: ['Mastercustomer'],
    //models: ['Mastercustomer'],
    requires: ['Erems.library.ComboLoader', 'Erems.library.ModuleTools'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastercustomergrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastercustomerformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastercustomerformdata'
        },
        {
            ref: 'griddocument',
            selector: 'mastercustomergriddocument'
        },
        {
            ref: 'formdatadocument',
            selector: 'mastercustomerformdatadocument'
        },
        {
            ref: 'gridaddress',
            selector: 'mastercustomergridaddress'
        },
        {
            ref: 'formdataaddress',
            selector: 'mastercustomerformdataaddress'
        }
    ],
    controllerName: 'mastercustomer',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: ['fd_cb_purpose', 'fd_cb_religion'],
    bindPrefixName: 'Mastercustomer',
    localStore: {
        detail: null
    },
    validationItems: [{name: 'name', msg: 'Name is empty'}

    ],
    comboLoader: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-customerwinId',
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    daftarDocumentType: null,
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'mastercustomerpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mastercustomergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastercustomergrid toolbar button[action=create]': {
                click: function(el) {
                    //   this.formDataShow(el,'create','create');
                }
            },
            'mastercustomergrid toolbar button[action=update]': {
                click: function(el) {
                    //  this.formDataShow(el,'update','update');
                }
            },
            'mastercustomergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastercustomergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastercustomergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.insActionColumnClick
            },
            'mastercustomerformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastercustomerformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastercustomerformdata': {
                afterrender: this.formDataAfterRender
            },
            'mastercustomerformdata button[action=save]': {
                click: this.mainDataSave
            },
            'mastercustomerformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'mastercustomerformdata #fd_photo': {
                change: function(fld, a) {
                    me.formDataUploadImage(fld, a, 'mode');
                }
            },
            'mastercustomerformdata #fd_name': {
                keyup: me.createUsername
            },
            'mastercustomerformdata #fd_birthdate': {
                select: me.createUsername
            },
            'mastercustomerformdata [name=name]': {
                blur: me.nameAddressOnBlur
            },
            'mastercustomerformdata [name=address]': {
                blur: me.nameAddressOnBlur
            },
            /* BROWSE CONTROL */
            'mastercustomerbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'mastercustomerbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'mastercustomerbrowsegrid': {
                afterrender: me.browsegridAfterRender
            },
            'mastercustomerformdata button[action=documents]': {
                click: function() {
                    me.showDocuments();
                }
            },
            'mastercustomergriddocument button[action=create]': {
                click: function() {
                    me.griddocumentButtonClick('create');
                }
            },
            'mastercustomergriddocument button[action=update]': {
                click: function() {
                    me.griddocumentButtonClick('update');
                }
            },
            'mastercustomergriddocument button[action=destroy]': {
                click: function() {
                    me.griddocumentButtonClick('destroy');
                }
            },
            'mastercustomerformdatadocument #fd_file': {
                change: function(fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'mastercustomerformdatadocument button[action=save]': {
                click: function(fld, a) {
                    me.saveDocument();
                }
            },
            
            /// MULTI ADDRESS
            'mastercustomerformdata button[action=multi_address]': {
                click: function() {
                    me.showAddress();
                }
            },
            'mastercustomergridaddress button[action=create]': {
                click: function() {
                    me.gridaddressButtonClick('create');
                }
            },
            'mastercustomergridaddress button[action=update]': {
                click: function() {
                    me.gridaddressButtonClick('update');
                }
            },
            'mastercustomergridaddress button[action=destroy]': {
                click: function() {
                    me.gridaddressButtonClick('destroy');
                }
            },
           
            'mastercustomerformdataaddress button[action=save]': {
                click: function(fld, a) {
                    me.saveAddress();
                }
            },
            /* END BROWSE CONTROL */



        });
    },
    saveDocument: function() {
        var me = this;
        var f = me.getFormdatadocument();
        var g = me.getGriddocument();
        var vs = f.getValues();

      

        var hasil = vs;
        if (!hasil.documenttype_documenttype_id) {
            me.tools.alert.warning("Tipe dokumen tidak valid.");
            return;
        }

        if (f.editedRow >= 0) { // update

            var rec = g.getStore().getAt(f.editedRow);
            rec.beginEdit();
            rec.set(hasil);
            rec.endEdit();
        } else { // create
            g.getStore().add(hasil);

        }

        f.setLoading("Sedang menyimpan...");
        me.tools.ajax({
            params: {
                data: Ext.encode(hasil)
            },
            success: function(data, model) {

                //me.getGrid().getStore().loadPage(1);
                f.setLoading(false);
                if (!data.others[0][0]['HASIL']) {
                    me.tools.alert.warning(data.others[0][0]['MSG']);
                    return;
                }

                g.getStore().loadPage(1);
                f.up("window").close();

            }
        }).read('savedocument');


    },
    refreshDocumentImageInfo: function(imageName) {
        var me = this;
         var form = me.getFormdatadocument();
        form.down("[name=filename]").setValue(imageName);
        me.mt.customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/customerdocuments/','360px 170px');
    },
    formDataUploadFileDoc: function(fld, a, mode) {

        var me = this;
        var form = fld.up("form");
        me.uploadImage({
            form: form,
            params: {tipe: 'document'},
            callback: {
                success: function(imageName) {
                   
                        me.refreshDocumentImageInfo(imageName);
                },
                failure: function() {

                }
            }
        });


    },
    griddocumentButtonClick: function(action) {
        var me = this;
        var g = me.getGriddocument();
        var fm = me.getFormdata();
        var cId = fm.down("[name=customer_id]").getValue();
        if (action === "create") {
            var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myCustomerDocumentFormWindow');
            var f = me.getFormdatadocument();
            f.editedRow = -1;
            me.tools.wesea(me.daftarDocumentType, f.down("[name=documenttype_documenttype_id]")).comboBox();
            f.down("[name=customer_customer_id]").setValue(cId);
        } else if (action === "update") {

            var row = g.getSelectedRow();
            if (row >= 0) {
                var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myCustomerDocumentFormWindow');

                var f = me.getFormdatadocument();
                f.editedRow = row;
                me.tools.wesea(me.daftarDocumentType, f.down("[name=documenttype_documenttype_id]")).comboBox();
                f.loadRecord(g.getStore().getAt(row));
                me.refreshDocumentImageInfo(g.getStore().getAt(row).get('filename'));
// f.down("[name=documenttype_documenttype_id]").setValue(g.getStore().getAt(row).get("documenttype_documenttype_id"));
                //f.down("[name=customer_customer_id]").setValue(cId);
            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }


            // me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
        } else if (action === "destroy") {
            var row = g.getSelectedRow();
            if (row >= 0) {

                Ext.Msg.show({
                    title: 'Konfirmasi',
                    msg: 'Are you sure to delete this document?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {

                        if (clicked === "yes") {
                            g.up("window").setLoading("Sedang menghapus...");
                            me.tools.ajax({
                                params: {
                                    customerdocument_id: g.getStore().getAt(row).get("customerdocument_id")
                                },
                                success: function(data, model) {

                                    //me.getGrid().getStore().loadPage(1);
                                    g.up("window").setLoading(false);
                                    if (!data.others[0][0]['HASIL']) {
                                        me.tools.alert.warning(data.others[0][0]['MSG']);
                                        return;
                                    }

                                    g.getStore().loadPage(1);


                                }
                            }).read('deletedocument');
                        }
                    }
                });



            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }
        }



    },
    showDocuments: function() {
        var me = this;
        var fm = me.getFormdata();
        var cId = fm.down("[name=customer_id]").getValue();
        if (cId <= 0) {
            me.tools.alert.warning("Invalid customer.");
            return;
        }

        var w = me.instantWindow('GridDocument', 400, 'Documents', 'actiondo', 'myCustomerDocumentWindow');
        var g = me.getGriddocument();
        g.doInit();
        g.getSelectionModel().setSelectionMode('SINGLE');
        g.getStore().getProxy().setExtraParam("customer_id", cId);
        g.getStore().load({
            callback: function(rec, op) {
                g.attachModel(op);
            }
        });

    },
    
    saveAddress: function() {
        var me = this;
        var fm = me.getFormdata();
        var f = me.getFormdataaddress();
        var g = me.getGridaddress();
        var vs = f.getValues();

      

        var hasil = vs;
       

        if (f.editedRow >= 0) { // update

            var rec = g.getStore().getAt(f.editedRow);
            rec.beginEdit();
            rec.set(hasil);
            rec.endEdit();
        } else { // create
            g.getStore().add(hasil);

        }

        f.setLoading("Sedang menyimpan...");
        me.tools.ajax({
            params: {
                data: Ext.encode(hasil)
            },
            success: function(data, model) {

                //me.getGrid().getStore().loadPage(1);
                f.setLoading(false);
                if (!data.others[0][0]['HASIL']) {
                    me.tools.alert.warning(data.others[0][0]['MSG']);
                    return;
                }
                
                /// update customer address jika dijadikan default address
                if(me.tools.intval(vs.is_default)==1){
                    fm.down("[name=address]").setValue(vs.address);
                }

                g.getStore().loadPage(1);
                f.up("window").close();

            }
        }).read('saveaddress');


    },
    
    gridaddressButtonClick: function(action) {
        var me = this;
        var g = me.getGridaddress();
        var fm = me.getFormdata();
        var cId = fm.down("[name=customer_id]").getValue();
        if (action === "create") {
            var w = me.instantWindow('FormDataAddress', 400, 'Address', 'address', 'myCustomerAddressFormWindow');
            var f = me.getFormdataaddress();
            f.editedRow = -1;
            
            f.down("[name=customer_customer_id]").setValue(cId);
        } else if (action === "update") {

            var row = g.getSelectedRow();
            if (row >= 0) {
                var w = me.instantWindow('FormDataAddress', 400, 'Address', 'address', 'myCustomerAddressFormWindow');
                var f = me.getFormdataaddress();
                f.editedRow = row;
                f.loadRecord(g.getStore().getAt(row));
           

            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }


            // me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
        } else if (action === "destroy") {
            var row = g.getSelectedRow();
            if (row >= 0) {

                Ext.Msg.show({
                    title: 'Konfirmasi',
                    msg: 'Are you sure to delete this address?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {

                        if (clicked === "yes") {
                            g.up("window").setLoading("Sedang menghapus...");
                            me.tools.ajax({
                                params: {
                                    customeraddress_id: g.getStore().getAt(row).get("customeraddress_id")
                                },
                                success: function(data, model) {

                                    //me.getGrid().getStore().loadPage(1);
                                    g.up("window").setLoading(false);
                                    if (!data.others[0][0]['HASIL']) {
                                        me.tools.alert.warning(data.others[0][0]['MSG']);
                                        return;
                                    }

                                    g.getStore().loadPage(1);


                                }
                            }).read('deleteaddress');
                        }
                    }
                });



            } else {
                me.tools.alert.warning("Tidak ada address yang terpilih.");
            }
        }



    },
    showAddress: function() {
        var me = this;
        var fm = me.getFormdata();
        var cId = fm.down("[name=customer_id]").getValue();
        if (cId <= 0) {
            me.tools.alert.warning("Invalid customer.");
            return;
        }

        var w = me.instantWindow('GridAddress', 400, 'Address', 'actiondoa', 'myCustomerAddressWindow');
        var g = me.getGridaddress();
        g.doInit();
        g.getSelectionModel().setSelectionMode('SINGLE');
        g.getStore().getProxy().setExtraParam("customer_id", cId);
        g.getStore().load({
            callback: function(rec, op) {
                g.attachModel(op);
            }
        });

    },
    nameAddressOnBlur: function() {
        var me = this;
        var f = me.getFormdata();

        if (f.down("[name=is_change_ktpaddress]").checked) {
            f.down("[name=KTP_name]").setValue(f.down("[name=name]").getValue());
            f.down("[name=KTP_address]").setValue(f.down("[name=address]").getValue());
        }

    },
    createUsername: function(ele) {
        var me = this;
        var form = me.getFormdata();

        var cName = form.down('#fd_name').getValue();
        var birthd = form.down('#fd_birthdate').getValue();
        var mbirth, dbirth;
        var newCName = '';
        var cNameArr = '';
        if (cName.length >= 8 && birthd != null) {
            cNameArr = cName.replace(/ /g, "");
            if (cNameArr.length > 8) {
                birthd = Ext.Date.format(birthd, "d m y").split(" ");
                mbirth = birthd[1];
                dbirth = birthd[0];
                newCName = cNameArr.substr(0, 8) + '' + dbirth + '' + mbirth;
                form.down('#fd_username').setValue(newCName);
                form.down('[name=password]').setValue('pass12345');
            }
        }



    },
    formDataUploadImage: function(fld, a, mode) {

        var me = this;
        var form = fld.up("form");
        me.uploadImage({
            form: form,
            callback: {
                success: function(imageName) {
                    me.refreshPhotoInfo(imageName);
                },
                failure: function() {

                }
            }
        });


    },
    mainDataSave: function() {
        var me = this;
        me.tools.iNeedYou(me).save();
        /*   me.insSave({
         form: me.getFormdata(),
         grid: me.getGrid(),
         store: me.localStore.detail,
         finalData: function(data) {
         return data;
         },
         sync: true,
         callback: {
         create: function(store, form, grid) {
         // me.getGriddetail();
         
         }
         }
         });*/
    },
    refreshPhotoInfo: function(imageName) {
        var me = this;
        var form = me.getFormdata();
        form.down("[name=photo]").setValue(imageName);
        me.mt.customerPhoto(form.down("#photo_image"), imageName, me.myConfig.IMG_FOLDER);
    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        me.mt = new Erems.library.ModuleTools();
        var x = {
            init: function() {
                me.setActiveForm(f);

                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'PLDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'customer_id'
                });





            },
            create: function() {

                /* request model from zend */



                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function(data, model) {

                        me.fillFormComponents(data, f);


                        me.daftarDocumentType = data.documenttype;


                        me.localStore.detail.load({
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail);

                            }
                        });

                        f.setLoading(false);
                    }
                }).read('detail');
            },
            update: function() {
                //var rec = me.getGrid().getSelectedRecord();
                var rec = me.getGrid().getSelectedRecord();
                var idCustomer = typeof rec === "undefined" ? 0 : rec.get("customer_id");

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {

                        me.fillFormComponents(data, f);

                        me.daftarDocumentType = data.documenttype;


                        me.localStore.detail.load({
                            params: {
                                customer_id: idCustomer
                            },
                            callback: function(rec, op) {

                                me.attachModel(op, me.localStore.detail);
                                var rec = me.localStore.detail.getAt(0);

                                me.getFormdata().loadRecord(rec);
                                me.refreshPhotoInfo(rec.get("photo"));
                                me.getFormdata().editedRow = me.getGrid().getSelectedRow();
                            }
                        });

                        f.setLoading(false);
                    }
                }).read('detail');







                // me.getFormdata().loadRecord(rec);


            }
        };
        return x;
    },
    fillFormComponents: function(data, form) {
        var me = this;
        me.tools.wesea(data.purpose, form.down("[name=purpose_" + me.cbf.purpose.v + "]")).comboBox();
        me.tools.wesea(data.religion, form.down("[name=religion_" + me.cbf.religion.v + "]")).comboBox();
        me.tools.wesea(data.education, form.down("[name=education_" + me.cbf.education.v + "]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
        me.tools.wesea(data.city, form.down("[name=company_" + me.cbf.city.v + "]")).comboBox();
        //citraclub_id

    }

});