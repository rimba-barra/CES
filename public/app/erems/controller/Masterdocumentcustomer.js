Ext.define('Erems.controller.Masterdocumentcustomer', {
    extend: 'Erems.library.template.controller.Controllerwb',
    alias: 'controller.Masterdocumentcustomer',
    views: [
        'masterdocumentcustomer.Panel', 
        'masterdocumentcustomer.Grid', 
        'masterdocumentcustomer.FormSearch', 
        'masterdocumentcustomer.FormData',
        'masterdocumentcustomer.GridDocumentHistory',
        'masterdocumentcustomer.GridDocumentPhone', // added by rico 13072022
        'masterdocumentcustomer.FormDataPhone', // added by rico 13072022
        'masterdocumentcustomer.GridDocumentKomunikasi', // added by rico 13072022
        'masterdocumentcustomer.FormDataKomunikasi', // added by rico 13072022
        ],
    requires: ['Erems.library.ComboLoader', 'Erems.library.ModuleTools','Erems.library.Browse'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterdocumentcustomergrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterdocumentcustomerformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterdocumentcustomerformdata'
        },
        {
            ref: 'griddocument',
            selector: 'masterdocumentcustomergriddocument'
        },
        {
            ref: 'formdatadocument',
            selector: 'masterdocumentcustomerformdatadocument'
        },
        {
            ref: 'customergrid',
            selector: 'masterdocumentcustomercustomergrid'
        },
        {
            ref: 'griddocumenthistory',
            selector: 'masterdocumentcustomergriddocumenthistory'
        },
        // added by rico 13072022
        {
            ref: 'griddocumentphone',
            selector: 'masterdocumentcustomergriddocumentphone'
        },
        {
            ref: 'formdataphone',
            selector: 'masterdocumentcustomerformdataphone'
        },
        // added by rico 20072022
        {
            ref: 'griddocumentkomunikasi',
            selector: 'masterdocumentcustomergriddocumentkomunikasi'
        },
        {
            ref: 'formdatakomunikasi',
            selector: 'masterdocumentcustomerformdatakomunikasi'
        },
    ],
    controllerName: 'masterdocumentcustomer',
    formWidth: 750,
    fieldName: 'name',
    bindPrefixName: 'Masterdocumentcustomer',
    imageFolder : 'app/erems/uploads/customerdocuments/',
    localStore: {
        detail: null
    },
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

    },
    daftarDocumentType: null,
    daftarDepartment: null,
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        if (typeof ApliJs === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

                console.log("[INFO] ApliJs loaded.");

            }, function () {
                // error load file
            });
        }
        this.control({
            'masterdocumentcustomerpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterdocumentcustomergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: function(el) {
                    this.gridSelectionChange();
                }
            },

            'masterdocumentcustomer toolbar button[action=create]': {
                click: function(el) {
                    //   this.formDataShow(el,'create','create');
                }
            },
            'masterdocumentcustomer toolbar button[action=update]': {
                click: function(el) {
                    //  this.formDataShow(el,'update','update');
                }
            },
            'masterdocumentcustomerformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterdocumentcustomerformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterdocumentcustomerformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterdocumentcustomerformdata button[action=save]': {
                click: this.mainDataSave
            },
            'masterdocumentcustomerformdata button[action=cancel]': {
                click: this.formDataClose
            },

            'masterdocumentcustomerbrowsepanel': {
                beforerender: me.browsepanelBeforeRender
            },
            'masterdocumentcustomerbrowsepanel button[action=select]': {
                click: me.browsegridSelection
            },
            'masterdocumentcustomerbrowsegrid': {
                afterrender: me.browsegridAfterRender
            },
            'masterdocumentcustomergriddocument button[action=create]': {
                click: function() {
                    me.griddocumentButtonClick('create');
                }
            },
            'masterdocumentcustomergriddocument button[action=update]': {
                click: function() {
                    me.griddocumentButtonClick('update');
                }
            },
            'masterdocumentcustomergriddocument button[action=destroy]': {
                click: function() {
                    me.griddocumentButtonClick('destroy');
                }
            },
            'masterdocumentcustomerformdatadocument #fd_file': {
                change: function(fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'masterdocumentcustomerformdatadocument button[action=save]': {
                click: function(fld, a) {
                    me.saveDocument();
                }
            },

            'masterdocumentcustomergriddocument actioncolumn': {
                downloadaction: me.actionColumnDownload
            },

            'masterdocumentcustomerformdata button[action=browse_customer]': {
                click: this.browseCustomer
            },
            'masterdocumentcustomercustomergrid button[action=select]': {
                click: this.customerSelect
            },

            // added by rico 13072022
            'masterdocumentcustomergriddocumentphone button[action=create]': {
                click: function() {
                    me.griddocumentPhoneButtonClick('create');
                }
            },
            'masterdocumentcustomergriddocumentphone button[action=update]': {
                click: function() {
                    me.griddocumentPhoneButtonClick('update');
                }
            },
            'masterdocumentcustomergriddocumentphone button[action=destroy]': {
                click: function() {
                    me.griddocumentPhoneButtonClick('destroy');
                }
            },
            'masterdocumentcustomerformdataphone button[action=save]': {
                click: function() {
                    me.saveCustomerPhone();
                }
            },
            // added by rico 20072022
            'masterdocumentcustomergriddocumentkomunikasi button[action=create]': {
                click: function() {
                    me.griddocumentKomunikasiButtonClick('create');
                }
            },
            'masterdocumentcustomergriddocumentkomunikasi button[action=update]': {
                click: function() {
                    me.griddocumentKomunikasiButtonClick('update');
                }
            },
            'masterdocumentcustomergriddocumentkomunikasi button[action=destroy]': {
                click: function() {
                    me.griddocumentKomunikasiButtonClick('destroy');
                }
            },
            'masterdocumentcustomerformdatakomunikasi button[action=save]': {
                click: function() {
                    me.saveCustomerKomunikasi();
                }
            },

        });
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
                        // added by rico 12112021
                        data.documenttype.data = jQuery.grep(data.documenttype.data, function(value) {
                            return value.documentcategory_id == 1;
                        });

                        me.department = data.department;
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
                var rec = me.getGrid().getSelectedRecord();
                var idCustomer = typeof rec === "undefined" ? 0 : rec.get("customer_id");
                f.down("button[action=browse_customer]").setDisabled(true);

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        // added by rico 12112021
                        data.documenttype.data = jQuery.grep(data.documenttype.data, function(value) {
                            return value.documentcategory_id == 1;
                        });

                        me.department = data.department;
                        me.daftarDocumentType = data.documenttype;
                        me.localStore.detail.load({
                            params: {
                                customer_id: idCustomer
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail);
                                var rec = me.localStore.detail.getAt(0);

                                me.getFormdata().loadRecord(rec);
                                me.getFormdata().editedRow = me.getGrid().getSelectedRow();
                            }
                        });

                        //get data for grid document customer
                        var g = me.getGriddocument();
                        g.doInit();
                        g.getSelectionModel().setSelectionMode('SINGLE');
                        g.getStore().getProxy().setExtraParam("customer_id", rec.get("customer_id"));
                        g.getStore().getProxy().setExtraParam("temp_id", '');
                        g.getStore().load({
                            callback: function(rec, op) {
                                g.attachModel(op);
                            }
                        });

                        f.setLoading(false);
                    }
                }).read('detail');

                //get data for grid document customer history
                var gh = me.getGriddocumenthistory();
                gh.doInit();
                gh.getSelectionModel().setSelectionMode('SINGLE');
                gh.getStore().getProxy().setExtraParam("customer_id", rec.get("customer_id"));
                gh.getStore().load({
                    callback: function(rec, op) {
                        gh.attachModel(op);
                    }
                });
                gh.getStore().sort('Addon', 'ASC');

                var gp = me.getGriddocumentphone();
                gp.doInit();
                gp.getSelectionModel().setSelectionMode('SINGLE');
                gp.getStore().getProxy().setExtraParam("customer_customer_id", rec.get("customer_id"));
                gp.getStore().load({
                    callback: function(rec, op) {
                        gp.attachModel(op);
                    }
                });
                gp.getStore().sort('Addon','DESC');

                var gk = me.getGriddocumentkomunikasi();
                gk.doInit();
                gk.getSelectionModel().setSelectionMode('SINGLE');
                gk.getStore().getProxy().setExtraParam("customer_customer_id", rec.get("customer_id"));
                gk.getStore().load({
                    callback: function(rec, op) {
                        gk.attachModel(op);
                    }
                });
                gk.getStore().sort('Addon','DESC');
            }
        };
        return x;
    },

    browseCustomer: function (el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'CustomerGrid',
            el: el,
            localStore: "customer",
            mode_read: "selectedcustomer",
            loadRecordPrefix: "customer",
            browseId: 'unitpl'
        });
        browse.showWindow();

        for (var i=0;i<browse.textfield.length;i++) {
            browse.textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.browsedataSearch(e);
                }
            });
        }
    },

    customerSelect: function (el) {
        var me = this;
        var plRec = me.getCustomergrid().getSelectedRecord();

        var row = me.getCustomergrid().getSelectionModel().getSelection();
        var win = desktop.getWindow('browseDataWindow');
        
        if (me.browseHandler) {
            me.browseHandler.selectItem(function (rec) {
                me.attachCustomerInfo(rec);
            });
        }
    },

    attachCustomerInfo: function (rec) {
        var me = this;

        for (var x in rec.data) {
            var field = me.getFormdata().down("[name=" + x + "]");
            if (field) {
                field.setValue(rec.data[x]);
            }
        }

        me.getFormdata().down("[name=city_city_name]").setValue(rec.get("city_city_name"));

        var g = me.getGriddocument();
        g.doInit();
        g.getSelectionModel().setSelectionMode('SINGLE');
        g.getStore().getProxy().setExtraParam("customer_id", rec.get("customer_id"));
        g.getStore().getProxy().setExtraParam("temp_id", '');
        g.getStore().load({
            callback: function(rec, op) {
                g.attachModel(op);
            }
        });

        var gh = me.getGriddocumenthistory();
        gh.doInit();
        gh.getSelectionModel().setSelectionMode('SINGLE');
        gh.getStore().getProxy().setExtraParam("customer_id", rec.get("customer_id"));
        gh.getStore().load({
            callback: function(rec, op) {
                gh.attachModel(op);
            }
        });

        var gp = me.getGriddocumentphone();
        gp.doInit();
        gp.getSelectionModel().setSelectionMode('SINGLE');
        gp.getStore().getProxy().setExtraParam("customer_customer_id", rec.get("customer_id"));
        gp.getStore().load({
            callback: function(rec, op) {
                gp.attachModel(op);
            }
        });

        var gk = me.getGriddocumentkomunikasi();
        gk.doInit();
        gk.getSelectionModel().setSelectionMode('SINGLE');
        gk.getStore().getProxy().setExtraParam("customer_customer_id", rec.get("customer_id"));
        gk.getStore().load({
            callback: function(rec, op) {
                gk.attachModel(op);
            }
        });

    },

    mainDataSave: function() {
        var me   = this;
        var form = me.getFormdata();
        var g = me.getGrid();

        Ext.Msg.show({
            title: 'Success',
            msg: 'Data saved successfully.',
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });

        form.up('window').close();
        g.getStore().loadPage(1);
    },

    griddocumentButtonClick: function(action) {
        var me = this;
        var g = me.getGriddocument();
        var fm = me.getFormdata();
        if(typeof fm == 'undefined'){
            var fm = me.getFormdatarevision();
        }
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
            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }
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
    
    formDataUploadFileDoc: function(fld, a, mode) {
        var me = this;
        var form = fld.up("form");

        me.uploadFile({
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

    refreshDocumentImageInfo: function(imageName) {
        var me = this;
         var form = me.getFormdatadocument();
        form.down("[name=filename]").setValue(imageName);
        me.mt.customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/customerdocuments/','360px 170px');
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
        if (!hasil.filename) {
            me.tools.alert.warning("Pilih file terlebih dahulu.");
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
    
    actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row) {
        var me   = this;
        var url  = document.URL + me.imageFolder + view[5].data.filename;

        Ext.create('Ext.window.Window', {
          
            title: 'Download',
            height: 210,
            width: 380,
            
            padding: '10px 10px 10px 10px',
            modal: true,
                    items: 
                [
                    {
                        xtype: 'textareafield',
                        height: 60,
                        itemId: 'alasan',
                        name: 'alasan',
                        fieldLabel: 'Alasan',
                        padding: '10px 0 0 10px',
                        enforceMaxLength: true,
                        maskRe: /[^\`\"\']/,
                        maxLength: 255
                    }
                ],
                dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        padding: 6,
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'button',
                        action: 'saveReason',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process',
                        handler: function() {
                            var reason = this.up('window').items.items[0].value;

                            if(!reason){
                                Ext.Msg.show({
                                    title: 'Alert',
                                    msg: 'Please Fill the alasan',
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.OK
                                });
                                return false;
                            }
                            this.up('window').body.mask('Processing, Please Wait...');

                            me.saveReason(
                                view[5].data.filename, 
                                view[5].data.documenttype_documenttype, 
                                view[5].data.description, 
                                view[5].data.customerdocument_id, 
                                view[5].data.customer_customer_id, 
                                reason, 
                                this.up('window')
                            );
                       }
                   },
                   {
                    xtype: 'button',
                    action: 'cancel',
                    itemId: 'btnCancel',
                    padding: 5,
                    width: 75,
                    iconCls: 'icon-cancel',
                    text: 'Cancel',
                    handler: function() {
                        this.up('window').close();
                    }
                }
                ]
            }
            ]
        }).show();

    },

    saveReason: function(filename, type, desc, document_id, customer_id, reason, win){
        var me = this;
        var url  = document.URL + me.imageFolder + filename;

        var d = [filename, type, desc, document_id, customer_id, reason];

        me.tools.ajax({
            params: {
                data : Ext.encode(d)
            },
            success: function(data, model) {
                win.body.unmask();

                var a = document.createElement('A');
                a.href = url;
                a.download = url.substr(url.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                //get data for grid document customer
                var gh = me.getGriddocumenthistory();
                gh.doInit();
                gh.getStore().getProxy().setExtraParam("customer_id", data.others[0][0].HASIL.customer_id);
                gh.getStore().load({
                    callback: function(rec, op) {
                        gh.attachModel(op);
                    }
                });    

                Ext.Msg.show({
                    title: 'Success', 
                    msg: 'Download successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function(){ 
                        win.close();
                    }
                });  

            }
        }).read('saveDownload');
    },

    uploadFile: function(params) {
        var me = this;
        var form = params.form;
        var callback = params.callback;

        var filesize = 0;
        var filedoc = document.getElementsByName("file_browse")[0];
        if(filedoc != null)
            filesize = filedoc.files[0].size;

        if(filesize > 0 && filesize <= 5242880){ //filesize max 5MB
            form.submit({
                clientValidation: false,
                url: 'erems/' + me.controllerName + '/upload',
                params:params.params,
                waitMsg: 'Uploading file...',
                success: function(f, a) {

                    var icon = Ext.Msg.INFO;
                    var msg = 'File Uploaded';

                    if (!a.result.success) {
                        icon = Ext.Msg.ERROR;
                        msg = a.result.msg;
                    } else {
                        callback.success(a.result.msg);
                    }

                    Ext.Msg.show({
                        title: 'Info',
                        msg: msg,
                        icon: icon,
                        buttons: Ext.Msg.OK
                    });
                },
                failure: function(f, a) {
                    callback.failure();
                    var msg = "...";
                    if(typeof a.result !=="undefined"){
                        msg= a.result.msg;
                    }else{
                        msg = "Please complete all the required field";
                    }
                    Ext.Msg.show({
                        title: 'Fail',
                        msg: msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        } else {
            var msg = "File upload maximum 5 MB";
            Ext.Msg.show({
                title: 'Fail',
                msg: msg,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },

    griddocumentPhoneButtonClick: function(action) {
        var me = this;
        var g = me.getGriddocumentphone();
        var fm = me.getFormdata();

        var cId = fm.down("[name=customer_id]").getValue();
        if (action === "create") {
            var w = me.instantWindow('FormDataPhone', 400, 'Phone', 'phone', 'myCustomerDocumentPhoneFormWindow');
            var f = me.getFormdataphone();
            f.editedRow = -1;

            me.tools.wesea(me.department, f.down("[name=department_id]")).comboBox();
            f.down("[name=customer_customer_id]").setValue(cId);
        } else if (action === "update") {
            var row = g.getSelectedRow();
            if (row >= 0) {
                var w = me.instantWindow('FormDataPhone', 400, 'Phone', 'phone', 'myCustomerDocumentPhoneFormWindow');
                var f = me.getFormdataphone();

                f.editedRow = row;
                f.down("[name=customer_customer_id]").setValue(cId);
                
                me.tools.wesea(me.department, f.down("[name=department_id]")).comboBox();
                console.log(me.department);
                f.loadRecord(g.getStore().getAt(row));
            } else {
                me.tools.alert.warning("Tidak ada phone yang terpilih.");
            }
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
                                    customerphone_id: g.getStore().getAt(row).get("customerphone_id")
                                },
                                success: function(data, model) {

                                    g.up("window").setLoading(false);
                                    if (!data.others[0][0]['HASIL']) {
                                        me.tools.alert.warning(data.others[0][0]['MSG']);
                                        return;
                                    }
                                    g.getStore().loadPage(1);
                                }
                            }).read('deletephone');
                        }
                    }
                });
            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }
        }
    },

    saveCustomerPhone: function() {
        var me = this;
        var f = me.getFormdataphone();
        var g = me.getGriddocumentphone();
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
                f.setLoading(false);

                if (!data.others[0][0]['HASIL']) {
                    me.tools.alert.warning(data.others[0][0]['MSG']);
                    return;
                }

                g.getStore().loadPage(1);
                f.up("window").close();
            }
        }).read('savecustomerphone');
    },

    // added by rico 20072022
    griddocumentKomunikasiButtonClick: function(action) {
        var me = this;
        var g = me.getGriddocumentkomunikasi();
        var fm = me.getFormdata();
        var rec = new Object();

        var cId = fm.down("[name=customer_id]").getValue();
        if (action === "create") {
            var w = me.instantWindow('FormDataKomunikasi', 400, 'Komunikasi', 'komunikasi', 'myCustomerDocumentKomunikasiFormWindow');
            var f = me.getFormdatakomunikasi();
            f.editedRow = -1;
            f.down("[name=customer_customer_id]").setValue(cId);

            rec = me.getCustomerPhones(cId);
            
            me.tools.wesea(rec, f.down("[name=dept_phone]")).comboBox();

            me.tools.ajax({
                params: {},
                success: function(data, model) {
                    var hasil = data.others[0][0]['HASIL'];
                    
                    f.down("[name=email]").setValue(hasil['user_email']);
                }
            }).read('getEmail');
        } else if (action === "update") {
            var row = g.getSelectedRow();
            if (row >= 0) {
                var w = me.instantWindow('FormDataKomunikasi', 400, 'Komunikasi', 'komunikasi', 'myCustomerDocumentKomunikasiFormWindow');
                var f = me.getFormdatakomunikasi();

                f.editedRow = row;
                f.down("[name=customer_customer_id]").setValue(cId);
                
                rec = me.getCustomerPhones(cId);
                
                me.tools.wesea(rec, f.down("[name=dept_phone]")).comboBox();
                f.loadRecord(g.getStore().getAt(row));
            } else {
                me.tools.alert.warning("Tidak ada log komunikasi yang terpilih.");
            }
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
                                    customer_komunikasi_id: g.getStore().getAt(row).get("customer_komunikasi_id")
                                },
                                success: function(data, model) {

                                    g.up("window").setLoading(false);
                                    if (!data.others[0][0]['HASIL']) {
                                        me.tools.alert.warning(data.others[0][0]['MSG']);
                                        return;
                                    }
                                    g.getStore().loadPage(1);
                                }
                            }).read('deletekomunikasi');
                        }
                    }
                });
            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }
        }
    },

    saveCustomerKomunikasi: function() {
        var me = this;
        var f = me.getFormdatakomunikasi();
        var g = me.getGriddocumentkomunikasi();
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
                f.setLoading(false);

                if (!data.others[0][0]['HASIL']) {
                    me.tools.alert.warning(data.others[0][0]['MSG']);
                    return;
                }

                g.getStore().loadPage(1);
                f.up("window").close();
            }
        }).read('savecustomerkomunikasi');
    },
    getCustomerPhones: function(cId){
        var me = this;
        var rec = new Object();

        me.tools.ajax({
            params: {
                customer_customer_id: Ext.encode(cId)
            },
            success: function(data, model) {
                var temp = [];

                $.each(data, function(key, value){
                    temp[key] = value.customerdocument;
                });

                rec['data'] = temp;
                rec['model'] = model;

            }
        }).read('documentsPhone');

        return rec;
    }
});