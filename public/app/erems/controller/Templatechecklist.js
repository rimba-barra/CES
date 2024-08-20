Ext.define('Erems.controller.Templatechecklist', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Templatechecklist',
    views: ['templatechecklist.Panel', 'templatechecklist.Grid', 'templatechecklist.FormSearch', 'templatechecklist.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'templatechecklistgrid'
        },
        {
            ref: 'formsearch',
            selector: 'templatechecklistformsearch'
        },
        {
            ref: 'formdata',
            selector: 'templatechecklistformdata'
        }
    ],
    controllerName: 'templatechecklist',
    fieldName: 'type',
    bindPrefixName:'Templatechecklist',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-posisiwinId',
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
            'templatechecklistpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'templatechecklistgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'templatechecklistgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'templatechecklistgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'templatechecklistgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'templatechecklistgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'templatechecklistgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'templatechecklistformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'templatechecklistformsearch button[action=search]': {
                click: this.dataSearch
            },
            'templatechecklistformsearch button[action=reset]': {
                click: this.dataReset
            },
            'templatechecklistformsearch [name=description]': {
                'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                            me.dataSearch();
                        }
                    });
                }
            },
            'templatechecklistformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'templatechecklistformdata button[action=save]': {
                click: this.saveDocument
            },
            'templatechecklistformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'templatechecklistformdata #fd_file': {
                change: function(fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'templatechecklistgrid actioncolumn': {
                downloadaction: me.actionColumnDownload
            },

        });
    },
    formDataAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
        var grid = me.getGrid();
        var store = grid.getStore();
        var form = me.getFormdata();
        
        if(state == 'create'){
            me.getFormdata().up('window').body.mask('Loading data, please wait ...');

            me.tools.ajax({
                params: {},
                success: function (data, model) {
                    me.fillFormComponents(data, model);

                    grid.getStore().loadPage(1);
                }
            }).read('detail');
        }else if(state == 'update'){
            form.up('window').body.mask('Loading data, please wait ...');

            form.editedRow = me.getGrid().getSelectedRow();
            var rec = me.getGrid().getSelectedRecord();

            me.refreshDocumentImageInfo(rec.data.filename);

            // me.tools.ajax({
            //     params: {},
            //     success: function (data, model) {
            //         me.fillFormComponents(data, model);

            //         grid.getStore().loadPage(1);
            //     }
            // }).read('detail');

            form.loadRecord(rec);
            form.editedRow = me.getGrid().getSelectedRow();
        }

    },
    fdar: function() {
        return this.tools.fdar(this);
       
    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
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
                            var res = Ext.decode(s.operations[0].response.responseText).total == undefined ? 1 : 0;

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
                        failure: function(batch, options) {
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
    fillFormComponents: function (data, f) {
        var me = this;
        var form = this.getFormdata();

        me.tools.wesea(data.type, form.down("[name=type_id]")).comboBox(true);
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
        me.mt = new Erems.library.ModuleTools();

        var form = me.getFormdata();
        form.down("[name=filename]").setValue(imageName);
        me.mt.customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/templatechecklist/','360px 170px');
    },

    saveDocument: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var vs = f.getValues();

        if (!vs.filename) {
            me.tools.alert.warning("Pilih file terlebih dahulu.");
            return;
        }

        f.setLoading("Sedang menyimpan...");
        me.tools.ajax({
            params: {
                data: Ext.encode(vs)
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
    uploadFile: function(params) {
        var me = this;
        var form = params.form;
        var callback = params.callback;

        var filesize = 0;
        var filedoc = document.getElementsByName("file_browse")[0];
        if(filedoc != null){
            filesize = filedoc.files[0].size;
        }

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

    //added by rico 20122021
    actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row) {
        // ceslive
        // var url = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/app/erems/uploads/templatechecklist/'+view[5].data.filename;

        // cestest
        // var url = window.location.protocol+"//"+window.location.host+'/rico/Ciputra/public/app/erems/uploads/templatechecklist/'+view[5].data.filename;
        
        // local
        var url = window.location.protocol+"//"+window.location.host+'/webapps/public/app/erems/uploads/templatechecklist/'+view[5].data.filename;
           
        var a = document.createElement('A');
        a.href = url;
        a.download = url.substr(url.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    dataReset: function() {
        var me = this;

        me.getFormsearch().getForm().reset();
        me.getFormsearch().down('[name=type_id]').setValue('');

        me.dataSearch();
    },
});