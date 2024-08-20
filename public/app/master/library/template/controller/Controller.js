Ext.define('Master.library.template.controller.Controller', {
    extend: 'Ext.app.Controller',
    requires: ['Master.library.template.field.CurrencyField',
        'Master.library.template.field.MoneyField',
        'Master.library.template.field.Customepaging',
    ],
    rights: {
        create: false, update: false, destroy: false, print: false, import: false,generate: false,
        approve: false,unapprove: false,printvoucher:false,unpaid:false,
	postingselected:false     
    },
    models: [
    ],
    stores: [
    ],
    views: [
    ],
    refs: [
        {
            ref: 'grid'
        },
        {
            ref: 'formsearch'
        },
        {
            ref: 'formdata'
        }
    ],
    constructor: function (configs) {
        this.callParent(arguments);
        // LOAD ACCOUNTING OBJECT
        Ext.Loader.loadScript({
            //for function accounting in UI.
            url: document.URL + 'app/master/library/template/plugin/accounting.min.js',
            onLoad: function () {
                accounting.settings = {
                    currency: {
                        symbol: "", // default currency symbol is '$'
                        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                        decimal: ".", // decimal point separator
                        thousand: ",", // thousands separator
                        precision: 2   // decimal places
                    },
                    number: {
                        precision: 0, // default precision on numbers is 0
                        thousand: ",",
                        decimal: "."
                    }
                }
            }
            , onError: function () {
            }
        });
    },
    init: function () {
        this.control({
        });
    },
    controllerName: 'controllername',
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Controllername',
    formWidth: 500,
    instantCreateMode: false,
    validationItems: [],
    comboBoxsLoaded: false,
    storeProcess: false, // set this variable if you want use another store for saving and updating
    callerId: '', // Controller that call this browse panel

    //===================================================== start default function ====================================================

    mainPanelBeforeRender: function (el) {
        var me = this;
        setupObject(el, me.execAction, me);
    },
    panelAfterRender: function (el) {
        var me, store;
        me = this;
        me.loadComboBoxStore(el);

    },
    gridAfterRender: function () {
        var me = this;        
        me.dataReset();
    },
   gridSelectedrow:function(){
      var me,store,counter;
      me = this;
      store = me.getGrid().getStore();
      store.reload({
        callback: function (records, operation, success) {
            counter = store.getCount();
            if (counter > 0) {
                me.getGrid().getSelectionModel().select(0, true);
            }
        }
    });    
    },
    gridSelected: function () {
        var me, grid, store, counter, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
        }
    },
    griddetailAfterRender: function () {
        var me = this;
        me.datadetailReset();
    },
    setSumdetail: function () {
        var me = this;
    },
    setSumsubdetail: function () {
        var me = this;
    },
    formSearchAfterRender: function (el) {
        var me = this;
        me.loadComboBoxStore(el);
    },
    formSearchReady: function (el) {
        var me = this;
        me.loadComboBoxStore(el);
    },
    gridItemDblClick: function (el) {
        var me = this,
                btnEdit = el.up('panel').down('#btnEdit'),
                state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');

        me.execAction(el, state);
    },
    gridItemDblClickdetail: function (el) {
        var me = this,
                btnEdit = el.up('panel').down('#btnEdit'),
                state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');

        me.execAction(el, state);
    },
    gridItemContextMenu: function (el, record, item, index, e, eOpts) {
        e.stopEvent();
        var me = this;
        var menucount = 0;
        var cm = Ext.create('Ext.menu.Menu', {items: me.getGrid().contextMenu});
        var cmitem = cm.query('menuitem', '', 'simple');
        Ext.each(cmitem, function (item, index) {
            item.setVisible(me.rights[item.action]);
            if (!item.isHidden()) {
                item.handler = function () {
                    me.gridContextMenuClick(item);
                };
                menucount++;
            }
        });
        if (menucount) {
            cm.showAt(e.xy);
        }
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    gridSelectionChangedetail: function () {
        var me = this;
        var grid = me.getGriddetail(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    gridSelectionChangedesc: function () {
        var me = this;
        var grid = me.getGriddesc(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    gridSelectionChangesubdetail: function () {
        var me = this;
        var grid = me.getGridsubdetail(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
    },
    formDataShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;

        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: true,
                minimizable: false,
                maximizable: true,
                width: me.formWidth,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: state,
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Master.view.' + me.controllerName + '.FormData'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },
    formImportShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;

        var winId = 'win-holidayformdata';
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: me.formWidth,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: state,
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Master.view.' + me.controllerName + '.FormImport'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();
    },
    dataDestroy: function () {
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
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            var parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            var pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }

                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    dataDestroydescwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramdesc;
        dataconfirm = me.fieldconfirmdesc;

        rows = me.getGriddesc().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddesc().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddesc().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }
                }

            });
        }
    },
    dataDestroydetailwithflag: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;
        ph = me.paramheader;
        pd = me.paramdetail;
        dataconfirm = me.fieldconfirmdetail;

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter(me.idheaderfield, me.idheadervalue);
                        store.filter('deleted', false);
                    }
                    me.setSumdetail();
                }

            });

        }
    },
    
    dataDestroydetail: function () {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                recordcounttext, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm;

        me = this;
        dataconfirm = me.fieldconfirmdetail;

        rows = me.getGriddetail().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddetail().getStore();
            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        me.getGriddetail().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    // store.reload();
                    store.sync({
                        success: function (s) {
                            me.getGriddetail().up('window').unmask();
                            successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                            }
                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function (batch, options) {
                            // added on april 2016, ahmad riadi
                            parameter = (batch.proxy.getReader().jsonData.param ? batch.proxy.getReader().jsonData.param : 'no');
                            pesan = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');
                            if (parameter == 'used') {
                                failmsg = pesan;
                            } else {
                                failmsg = failmsg + ' The data may have been used.';
                            }
                            me.getGriddetail().up('window').unmask();
                            store.un('beforesync', msg);
                            // store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg,
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    dataPrint: function (el, url) {
        loadReport(el, url);
    },
    gridActionColumnAfterRender: function (el) {

    },
    gridActionColumnAfterRenderdetail: function (el) {

    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    gridActionColumnClickdetail: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGriddetail().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGriddetail().getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'update':
                    //me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroydetail();
                    break;
            }
        }
    },
    gridContextMenuClick: function (item) {
        var me = this;
        switch (item.action) {
            case 'update':
                me.formDataShow('update');
                break;
            case 'destroy':
                me.dataDestroy();
                break;
        }
    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        me.getFormsearch().down("[name=hideparam]").setValue('default');  // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    datadetailSearch: function () {
        resetTimer();
        var me = this;
        var store = me.getGriddetail().getStore();
            store.load();
            me.loaddetailPage(store);
    },
    dataReset: function () {
        var me = this;
        me.getFormsearch().getForm().reset();
        me.getFormsearch().down("[name=hideparam]").setValue('default');// added on april 2016, ahmad riadi
        me.dataSearch();
    },
    datadetailReset: function () {
        var me = this;
        me.datadetailSearch();
    },
    formDataAfterRender: function (el) {
        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        var state = el.up('window').state;

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();
        } else if (state == 'read') { //========= added on march 15th 2016 by Tirtha
            me.fdar().read();
        }
    },
    dataSave: function () {
        var me = this;
        me.getFormdata().down("[name=hideparam]").setValue('default'); // added on april 2016, ahmad riadi     

        var getform = me.getFormdata();
        var form = getform.getForm();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            resetTimer();
            me.unformatCurrencyFormdata(me, getform);
            var store = null;
            var fida = me.getFinalData(form.getValues());
            if (me.instantCreateMode) {
                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                    store = me.getGrid().getStore();
                    //console.log(store);
                } else {
                    store = me.storeProcess;
                }
            }

            var msg = function () {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            var state_submit = me.getFormdata().up('window').state.toLowerCase();

            switch (state_submit) {
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
                success: function (batch, options) {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();
                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: batch.proxy.getReader().jsonData.msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.formDataClose();

                        }
                    });

                },
                failure: function (batch, options) {
                    var errMsg = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');

                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: ' + errMsg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });


                }
            });


        }

    },
    formDataClose: function () {
        var me = this;
        me.getFormdata().up('window').close();
    },
    formDatadetailClose: function () {
        var me = this;
        me.getFormdatadetail().up('window').close();
    },
    //============================================== start sub function ================================================
    execAction: function (el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
        
       
        switch (action) {
            case me.bindPrefixName + 'Create':
            case me.bindPrefixName + 'Update':
            case me.bindPrefixName + 'Read':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
//            case me.bindPrefixName + 'Print':
//                //loadReport(el, 'tms/building/print');
//                break;
            case me.bindPrefixName + 'Import':
                break;
            case me.bindPrefixName + 'Generate':
                break;

        }
    },
    getFormProperties: function (action) {
        var me = this;
        var p = {
            state: 'read',
            formtitle: 'View',
            formicon: 'icon-form-add'
        };
        if (typeof action !== 'undefined') {
            p.state = action.replace(me.bindPrefixName, "").toLowerCase();

            var grid = me.getGrid();
            var actionColItems = grid.down('actioncolumn').items;
            var founded = false;
            for (var i in actionColItems) {
                if (actionColItems[i].bindAction === action) {
                    p.formtitle = actionColItems[i].text;
                    p.formicon = actionColItems[i].iconCls;
                    founded = true;
                }

            }
            if (!founded) {
                p.formtitle = p.state;
            }
        }

        return p;
    },
    loadComboBoxStoreX: function (el) {
        var me = this;
        try {
            var itemForms = el.getForm().getFields().items;
            for (var x in itemForms) {
                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
                        itemForms[x].getStore().load({params: {start: 0, limit: 0}});
                        //console.log(itemForms[x].getStore());
                    }
                }

            }
        } catch (err) {
            console.log(err);
        }
    },
    loadComboBoxStore: function (el) {
        var me, store, index, itemForms, result, widget, storedata, dynamicdata, xtypeform;
        me = this;

        try {
//            var itemForms = el.getForm().getFields().items;
//            for (var x in itemForms) {
//                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
//                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
//                        itemForms[x].getStore().load({params: {start: 0, limit: 0}});
//                        //console.log(itemForms[x].getStore());
//                    }
//                }
//
//            }        

            //console.log(el);
            // console.log('test aja');
            itemForms = el.getForm().getFields().items;
            for (var index in itemForms) {
                xtypeform = el.getForm().getFields().items[index].xtype;
                result = xtypeform.substr(xtypeform.length - 9);

                if (result.indexOf("combogrid") > -1) {
                    widget = Ext.widget(xtypeform);
                    store = widget.store.storeId;
                    dynamicdata = widget.dynamicdata;
                    // console.log(me.getStore(store).load());
                    //if(dynamicdata < 1){
                    me.getStore(store).load();
                    //}                   
                }

                if (result.indexOf("combobox") > -1) {
                    widget = Ext.widget(xtypeform);
                    store = widget.store.storeId;
                    dynamicdata = widget.dynamicdata;
                    //console.log(me.getStore(store).load());
                    //if(dynamicdata < 1){
                    me.getStore(store).load();
                    //}    
                }
            }
//                     
//            Ext.each(me.stores, function (item, index) {
//                if(index > 0){
//                     store = me.getStore(item);
//                     store.load();
//                }               
//            });
        } catch (err) {
            //console.log(err);
        }
    },
    loadPage: function (store) {
        store.loadPage(1);
    },
    loaddetailPage: function (store) {
        store.loadPage(1);
    },
    getFinalData: function (formGetValues) {
        var finalData = formGetValues;
        return finalData;
    },
    validationProcess: function () {
        return true;
    },
    instantCreate: function (callerId) {
        var me = this;
        me.instantCreateMode = true;
        me.callerId = callerId;
        me.formDataShow(null, null, me.bindPrefixName + 'Create');
    },
    finalValidation: function () {
        var me = this;

        if (me.validationItems.length == 0)
            return true;
        var erMsg = '[ER00] Unable to save data';

        erMsg = me.checkingValidationItem();
        if (erMsg == 'OK')
            return true;
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + erMsg + '.',
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });

        return false;
    },
    checkingValidationItem: function () {
        var me = this;
        var msg = 'OK';

        var vi = me.validationItems;
        var elField = null;
        for (var i = 0; i < vi.length; i++) {
            if (vi[i].name == undefined) {
                return '[VI01][' + i + '] Unable to save data';
            }
            if (vi[i].msg == undefined) {
                return '[VI02][' + i + '] Unable to save data';
            }
            elField = me.getFormdata().down('[name=' + vi[i].name + ']');
            if (elField == undefined) {
                return '[VI03][' + i + '] Unable to save data';
            }

            if (elField.getValue() == null) {
                return vi[i].msg;
                // return '[VI04][' + i + '] Unable to save data';
            } else if (elField.getValue().length == 0) {
                return vi[i].msg;
            }
            if (vi[i].f != undefined) {
                if (vi[i].f == 'number') {
                    if (toFloat(elField.getValue()) < 1) {
                        return vi[i].msg;
                    }
                }
            }
        }
        return msg;
    },
    createSpProcessObj: function (s) {
        var x = null;
        var me = this;
        //console.log(typeof s);
        if (typeof s === 'string') {
            if (s.length > 0) {
                var sp = 'me.get' + s + 'Store()';
                x = eval(sp);
            }
        }
        
       return x;
    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                /// init here

            },
            create: function () {
                /// create here  
                me.formatCurrencyFormdata(me, me.getFormdata());
            },
            update: function () {
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);

                //added by ahmad riadi 26-10-2016
                me.formatCurrencyFormdata(me, me.getFormdata());
                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.formatCurrencyFormdata(me, me.getFormdata());
                me.getFormdata().down('#btnSave').setDisabled(true);
            }
        };
        return x;
    },
    fmb: function (val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function (n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    },
    //============================================= end sub function =================================================

    //===================================================== end default function ====================================================

    //for mask currency on xtype = xmoneyfield 26-10-2016 ahmad riadi
    unformatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.unformat(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
    },
    //for unmask currency on xtype = xmoneyfield 26-10-2016 ahmad riadi
    formatCurrencyFormdata: function (controller, form) {
        var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue, paramform;
        me = controller;
        itemform = form.getForm().getFields().items;
        for (var index in itemform) {
            xtypeform = form.getForm().getFields().items[index].xtype;
            if (xtypeform == 'xmoneyfield') {
                itemname = form.getForm().getFields().items[index].name;
                oldvalue = form.down("[name=" + itemname + "]").getValue();
                newvalue = accounting.formatMoney(oldvalue);
                form.down("[name=" + itemname + "]").setValue(newvalue);
            }
        }
    },    
    GeneratorStore:function(storename){
      var mystore =  Ext.define('Master.library.template.controller.' + storename, {
       extend: 'Ext.data.Store',
       alias: 'store.'+storename,
       requires: [
            'Master.library.template.controller.'+storename
        ],  
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                totalProperty: 'tc',
                root: 'Result'
            }
        }       
        
    });
    }
});