Ext.define('Erems.controller.Masterberkas', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masterberkas',
    views: [
        'masterberkas.Panel', 
        'masterberkas.Grid', 
        'masterberkas.FormSearch', 
        'masterberkas.FormData', 
        'masterberkas.GridDocument', 
        'masterberkas.FormDataDocument'
    ],
    stores: ['Masterberkas','Masterberkasdocument'],
    models: [
        'Masterberkas',
        'Masterberkasdocument'
    ],
    requires:[
        'Erems.library.box.Config', 
        'Erems.library.box.tools.Tools', 
        'Erems.library.ModuleTools'
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'masterberkasgrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterberkasformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterberkasformdata'
        },
        {
            ref: 'formdatadocument',
            selector: 'masterberkasformdatadocument'
        },
        {
            ref: 'detailgrid',
            selector: 'masterberkasgriddetail'
        },
        {
            ref: 'griddocument',
            selector: 'masterberkasgriddocument'
        },
    ],
    controllerName: 'masterberkas',
    fieldName: 'berkas',
    bindPrefixName:'Masterberkas',
//    formWidth: 800,
    nomorValue: 1,
    checkedStatus: 0,
    constructor : function (configs) {
        this.callParent(arguments);
        
        var me = this;

        me.myConfig = new Erems.library.box.Config({ _controllerName : me.controllerName });
        me.tools    = new Erems.library.box.tools.Tools({config: me.myConfig});
        me.mt       = new Erems.library.ModuleTools();
    },
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({ config: me.myConfig });

        this.control({
            'masterberkaspanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'masterberkasgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterberkasgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterberkasgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterberkasgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterberkasgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterberkasgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterberkasformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterberkasformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterberkasformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterberkasformdata button[action=save]': {
                click: this.dataSave
            },
            'masterberkasformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterberkasgrid button[action=documents]': {
                click: function () {
                    me.showDocuments();
                }
            },
            'masterberkasgriddocument button[action=create]': {
                click: function () {
                    me.griddocumentButtonClick('create');
                }
            },
            'masterberkasgriddocument button[action=update]': {
                click: function () {
                    me.griddocumentButtonClick('update');
                }
            },
            'masterberkasgriddocument button[action=destroy]': {
                click: function () {
                    me.griddocumentButtonClick('destroy');
                }
            },
            'masterberkasformdatadocument #fd_file': {
                change: function (fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'masterberkasformdatadocument button[action=save]': {
                click: function (fld, a) {
                    me.saveDocument();
                }
            },
            //addby anas 18012021
            'masterberkasgriddocument actioncolumn': {
                downloadaction: me.actionColumnDownload
            },
        });
    },
    saveDocument: function () {
        var me = this;
        var f = me.getFormdatadocument();
        var g = me.getGriddocument();
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
            success: function (data, model) {
                f.setLoading(false);

                // if (!data.others[0][0]['HASIL']) {
                //     me.tools.alert.warning(data.others[0][0]['MSG']);
                //     return;
                // }

                g.getStore().loadPage(1);
                f.up("window").close();

            }
        }).read('savedocument');
    },
    refreshDocumentImageInfo: function (imageName) {
        var me = this;
        var form = me.getFormdatadocument();

        form.down("[name=filename]").setValue(imageName.imageName);
        me.mt.customerPhoto(form.down("#file_image"), imageName.imageName, 'app/erems/uploads/berkasdocuments/', '360px 170px');
    },
    formDataUploadFileDoc: function (fld, a, mode) {
        var me = this;
        var form = fld.up("form");

        // update by anas 18012021
        me.uploadFile({
            form: form,
            params: {},
            callback: {
                success: function(imageName) {
                    me.refreshDocumentImageInfo(imageName);
                },
                failure: function() {}
            }
        });
    },
    griddocumentButtonClick: function (action) {
        var me      = this;
        var g       = me.getGriddocument();
        var grid    = me.getGrid();
        var fm      = grid.getSelectionModel().getSelection();
        var cId     = fm[0].get('berkas_id');
        var berkas  = fm[0].get('berkas');

        if (action === "create") {
            var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myBerkasDocumentFormWindow');
            var f = me.getFormdatadocument();

            f.editedRow = -1;
            f.down("[name=berkas_berkas_id]").setValue(cId);
            f.down("[name=documentname]").setValue(berkas);
        } else if (action === "update") {
            var row = g.getSelectedRow();
            if (row >= 0) {
                var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myBerkasDocumentFormWindow');
                var f = me.getFormdatadocument();

                f.editedRow = row;
                f.loadRecord(g.getStore().getAt(row));
                f.down("[name=berkas_berkas_id]").setValue(cId);
                f.down("[name=documentname]").setValue(berkas);
                // me.refreshDocumentImageInfo(g.getStore().getAt(row).get('filename'));
                me.mt.customerPhoto(f.down("#file_image"), g.getStore().getAt(row).get('filename'), 'app/erems/uploads/berkasdocuments/', '360px 170px');
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
                    fn: function (clicked) {
                        if (clicked === "yes") {
                            g.up("window").setLoading("Sedang menghapus...");
                            me.tools.ajax({
                                params: {
                                    berkasdocument_id: g.getStore().getAt(row).get("berkasdocument_id")
                                },
                                success: function (data, model) {
                                    // me.getGrid().getStore().loadPage(1);
                                    // if (!data.others[0][0]['HASIL']) {
                                    //     me.tools.alert.warning(data.others[0][0]['MSG']);
                                    //     return;
                                    // }

                                    g.up("window").setLoading(false);
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
    showDocuments: function () {
        var me = this;
        var grid = me.getGrid();
        var fm = grid.getSelectionModel().getSelection();

        var cId = fm[0].get('berkas_id');
        // var tempId = '';
        // if (cId <= 0) {
        //     var date = new Date();
        //     tempId = moment(date).format('YYYYMMDD') + apps.uid;
        // }

        var w = me.instantWindow('GridDocument', 650, 'Documents', 'actiondo', 'myBerkasDocumentWindow');
        var g = me.getGriddocument();

        g.doInit();
        g.getStore().currentPage = 1;
        g.getSelectionModel().setSelectionMode('SINGLE');
        g.getStore().getProxy().setExtraParam("berkas_id", cId);
        // g.getStore().getProxy().setExtraParam("temp_id", tempId);
        g.getStore().load({
            callback: function (rec, op) {
                g.attachModel(op);
            }
        });
    },
    gridAfterRender: function(el) {
        var me = this;
        var grid = me.getGrid();

        me.dataReset();

        Ext.Ajax.request({ // added by rico 27122022
            url: 'erems/masterberkas/read',
            params: {mode_read: 'config'},
            success: function (response) {
                response = Ext.decode(response.responseText);

                if(response.UseBerkasFile){
                    grid.down('#btnDocuments').show();
                }
            }
        });

        if(me.references.includes('formsearch')){
            var form = me.getFormsearch();
            me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
            
            for (var i=0;i<me.textfield.length;i++) {
                Ext.applyIf(me.textfield[i], {enableKeyEvents: true});
                
                me.textfield[i].on('keypress', function(e, el){
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                });
            }
        }
    },
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

        if (grid.down('#btnEdit') != null) { /// add by erwin.st 09112021 (pengecekan ada tombol edit atau tidak)
            grid.down('#btnEdit').setDisabled(row.length != 1);
        }

        if (grid.down('#btnDelete') != null) { /// add by erwin.st 09112021 (pengecekan ada tombol delete atau tidak)
            grid.down('#btnDelete').setDisabled(row.length < 1);
        }

        //add by RH 20220125
        if (grid.down('#btnView') !== null) {
            grid.down('#btnView').setDisabled(row.length != 1);
        }

        //add by RH 20220125
        if (grid.down('#btnDocuments') !== null) {
            grid.down('#btnDocuments').setDisabled(row.length != 1);
        }
    },
    uploadFile: function (params) {
        var me          = this;
        var form        = me.getFormdatadocument().getForm();
        var callback    = params.callback;
        var filesize    = 0;
        var filedoc     = document.getElementsByName("file_browse")[0];

        if (filedoc != null){
            filesize = filedoc.files[0].size;
        }

        if (filesize > 0 && filesize <= 5242880){
            form.submit({
                clientValidation: false,
                url: 'erems/' + me.controllerName + '/upload',
                params: {},
                waitMsg: 'Uploading file...',
                success: function (f, a) {
                    var icon = Ext.Msg.INFO;
                    var msg = 'File Uploaded';

                    if (!a.result.success) {
                        icon = Ext.Msg.ERROR;
                        msg = a.result.msg;
                    } else {
                        callback.success(a.result);
                    }

                    Ext.Msg.show({
                        title: 'Info',
                        msg: msg,
                        icon: icon,
                        buttons: Ext.Msg.OK
                    });
                },
                failure: function (f, a) {
                    callback.failure();

                    var msg = "...";
                    if (typeof a.result !== "undefined") {
                        msg = a.result.msg;
                    } else {
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
    dataDestroy: function() {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
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
                            var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
                            if(res == 0){
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: failmsg + ' <br/>The data may have been used.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
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
                            }
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' <br/>The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
	
    //addby anas 18012021
    actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row){
        //ceslive - updated by anas 01022021
        var url = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/berkasdocuments/' + view[5].data.filename;

        //cestest
        // var url = window.location.protocol+"//"+window.location.host+'/rico/Ciputra/public/app/erems/uploads/berkasdocuments/'+view[5].data.filename;

        //local
        // var url = window.location.protocol+"//"+window.location.host+'/webapps/public/app/erems/uploads/berkasdocuments/'+view[5].data.filename;

        var a = document.createElement('A');
        a.href = url;
        a.download = url.substr(url.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
});