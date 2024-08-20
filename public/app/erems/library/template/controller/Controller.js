Ext.define('Erems.library.template.controller.Controller', {
    extend: 'Ext.app.Controller',
    //   alias: 'controller.Holiday',
    requires: [],
    rights: {
        create: false,
        update: false,
        destroy: false,
        print: false
    },
    models: [
        //  'Holiday'
    ],
    stores: [
        //   'Holiday'
    ],
    views: [
        //  'holiday.Panel',
        //  'holiday.FormSearch',
        //  'holiday.Grid',
        //  'holiday.FormData'
    ],
    refs: [
        {
            ref: 'grid'
            // selector: 'HolidayGrid'
        },
        {
            ref: 'formsearch'
            //  selector: 'HolidayFormSearch'
        },
        {
            ref: 'formdata'
            //  selector: 'HolidayFormData'
        }
    ],
    constructor: function(configs) {

        this.callParent(arguments);
        if (typeof accounting === 'undefined') {

            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/accounting.min.js', function () {
                /// loaded
                // Settings object that controls default parameters for library methods:
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

                EREMS_GLOBAL_PRECISION = 2;


            }, function () {
                /// error
            });
        }

        if(apps.appId == 'erems'){
            //// add by erwin.st 30032022
            window.onerror = function (e, url, line) {
               // alert("Perhatian !!!\nTerdapat error pada sistem, silakan refresh tekan F5, jika masih tidak bisa, silakan hubungi tim IT.");
               console.log("An error occurred. Onerror: " + e + " URL:" + url + " Line:" + line);
            }

//            Ext.apply(Ext.data.Connection.prototype, {
//                async   : false,
//                noCache : true,
//            });
        }
    },
    init: function() {
        this.control({
            /*
             'HolidayPanel': {
             afterrender: this.panelAfterRender
             beforerender: me.mainPanelBeforeRender,
             },

             'HolidayGrid': {
             afterrender: this.gridAfterRender,
             itemdblclick: this.gridItemDblClick,
             itemcontextmenu: this.gridItemContextMenu,
             selectionchange: this.gridSelectionChange
             },

             'HolidayGrid toolbar button[action=create]': {
             click: function(){ this.formDataShow('create'); }
             },

             'HolidayGrid toolbar button[action=update]': {
             click: function(){ this.formDataShow('update'); }
             },

             'HolidayGrid toolbar button[action=destroy]': {
             click: this.dataDestroy
             },

             'HolidayGrid toolbar button[action=print]': {
             click: this.dataPrint
             },

             'HolidayGrid actioncolumn': {
             afterrender: this.gridActionColumnAfterRender,
             click: this.gridActionColumnClick
             },

             'HolidayFormSearch button[action=search]': {
             click: this.dataSearch
             },

             'HolidayFormSearch button[action=reset]': {
             click: this.dataReset
             },

             'HolidayFormData': {
             afterrender: this.formDataAfterRender
             },

             'HolidayFormData button[action=save]': {
             click: this.dataSave
             },

             'HolidayFormData button[action=cancel]': {
             click: this.formDataClose
             }
             */
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
    textfield: '',

    loadComboBoxStore: function(el) {
        console.log("load combo box");
        var me = this;
        try {
            var itemForms = el.getForm().getFields().items;
            for (var x in itemForms) {
                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
                	var storeCB = itemForms[x].getStore();
                    if (storeCB.storeId != "ext-empty-store") {
                    	storeCB.removeAll();
                        storeCB.load({
							params   : {start : 0,limit : 0},
							callback : function (rec) {}
						});
                    }
                }

            }
        } catch (err) {
            console.log(err);
        }
    },
    panelAfterRender: function(el) {

    },
    gridAfterRender: function(el) {
        var me = this;

        me.dataReset();

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
    gridItemDblClick: function(el, record, item, index, e, eOpts) {
        // var grd     = el.up('grid');
        // var cellMod = grd.getSelectionModel();
        // var grdSlc  = cellMod.getSelection();
        // if(cellMod.selectionMode == 'MULTI'){
        //     if(grdSlc.length){
        //         for (var j = 0; j < grdSlc.length; j++) {
        //             cellMod.select(grdSlc[j].index, true);
        //         }
        //     }
        // }
        // cellMod.select(index, true);
        el.up('grid').getSelectionModel().select(index);

        var me      = this,
            btnEdit = el.up('panel').down('#btnEdit'),
            state   = (typeof btnEdit.isVisible !== "undefined" && btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');

        me.execAction(el, state);
    },
    gridItemContextMenu: function(el, record, item, index, e, eOpts) {
        // var menucount = 0;
        var me   = this;
        var grid = el.up('grid');

        grid.getSelectionModel().select(index);

        // var menuToolbar = grid.dockedItems.items.filter(function(i,e){
        //     return i.xtype == 'toolbar';
        // });

        var itemMenuctx = [];
        var btn = Ext.ComponentQuery.query('[ctxMenu='+true+'], [action=update], [action=destroy], [action=delete], [action=read], [action=view]', grid);
        if(btn.length){
            btn.filter(function(i,e){
                if( i.isVisible() && !i.isDisabled()){
                    itemMenuctx.push({
                        text       : i.text,
                        icon       : typeof i.icon != 'undefined' ? i.icon : '',
                        iconCls    : typeof i.iconCls != 'undefined' ? i.iconCls : 'icon-form',
                        action     : typeof i.action != 'undefined' ? i.action : '',
                        bindAction : typeof i.bindAction != 'undefined' ? i.bindAction : '',
                        itemId     : typeof i.itemId != 'undefined' ? i.itemId : '',
                        handler    : function() {
                            if(i.action == 'update' || i.action == 'read'){
                                me.formDataShow(i.action);
                            }
                            else if(i.action == 'destroy'){
                                me.dataDestroy();
                            }
                        }
                    });
                }
            });
        }

        // var rowHtml = me.getGrid().getView().getNode(me.getGrid().getSelectionModel().getSelection()[0].index);
        // var rowDom = Ext.fly(rowHtml);

        // var cm = Ext.create('Ext.menu.Menu', {items: me.getGrid().contextMenu});
        // var cmitem = cm.query('menuitem', '', 'simple');
        // var nodes = me.getGrid().getView().getNodes();
        // var cells = rowDom.query('x-grid-cell-actioncolumn')
        // actioncolumngrid = cells[cells.length - 1];
        // console.log(rowDom)
        // console.log(cmitem)

        // var ctrl = me.controllerName;
        // var cR  = ctrl[0].toUpperCase()+ctrl.substring(1);
        // var ccT = _myAppGlobal.getController(cR);
        // console.log('controller context menu')

        // console.log(grid.getSelectionModel().getSelection()[0].index);

        // var itemMenuctx = [];
        // if(typeof menuToolbar[0] != 'undefined'){
        //     menuToolbar[0].items.items.filter(function(i,e){
        //         if(
        //             i.isVisible() === true &&
        //             i.isDisabled() === false &&
        //             (i.ctxMenu == true || i.action == 'update' || i.action == 'destroy' || i.action == 'read' ||
        //                 i.action == 'view' || i.action == 'delete')
        //         ){
        //             itemMenuctx.push({
        //                 text       : i.text,
        //                 icon       : typeof i.icon != 'undefined' ? i.icon : '',
        //                 iconCls    : typeof i.iconCls != 'undefined' ? i.iconCls : 'icon-form',
        //                 action     : typeof i.action != 'undefined' ? i.action : '',
        //                 bindAction : typeof i.bindAction != 'undefined' ? i.bindAction : '',
        //                 itemId     : typeof i.itemId != 'undefined' ? i.itemId : '',
        //                 handler    : function() {
        //                     if(i.action == 'update' || i.action == 'read'){
        //                         me.formDataShow(i.action);
        //                     }
        //                     else if(i.action == 'destroy'){
        //                         me.dataDestroy();
        //                     }
        //                 }
        //             });
        //             // i.handler = function(){
        //             //     me.gridContextMenuClick(i);
        //             // }
        //         }
        //     });
        // }

        // console.log(itemMenuctx)

        var ctxM = Ext.create('Ext.menu.Menu', {itemId: grid.xtype + '_ctxMenu', items: itemMenuctx});
        e.stopEvent();
        ctxM.showAt(e.xy);
        grid.contextMenu = ctxM;

        // Ext.each(cmitem, function(item, index) {
        //     item.setVisible(me.rights[item.action]);
        //     if (!item.isHidden()) {
        //         item.handler = function() {
        //             me.gridContextMenuClick(item);
        //         };
        //         menucount++;
        //     }
        // });

        // if (menucount) {
        //     cm.showAt(e.xy);
        // }
    },
    gridContextMenuClick: function(item) {
        var me = this;
        // console.log(item)
        switch (item.action) {
            case 'update':
                me.formDataShow('update');
                break;
            case 'destroy':
                me.dataDestroy();
                break;
        }
    },
    gridSelectionChange: function () {
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
    },

    gridActionColumnAfterRender: function(el) {
        /* var me = this;
         var actitem = el.items;
         Ext.each(actitem, function(item, index) {
         item.getClass = function() {

         if (me.rights[item.action]) {
         return 'ux-actioncolumn ' + item.defaultIcon + ' act-' + item.action;
         } else {
         return 'x-hide-display';
         }
         };

         });*/


    },
    gridActionColumnClick: function(view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);

        if (m) {
            switch (m[1]) {
                case 'read':
                    me.formDataShow('read');
                    break;
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    formDataShow: function(el, act, action) {
        console.log('formDataShow CTRL MAIN')
        var me = this;
        var file = document.URL + 'app/erems/view/' + me.controllerName + '/FormData.js';

        if(me.checkFileExist(file)){
            var formtitle, formicon;

            // var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
            if(action == undefined){
                state = el;
            }
            else{
                if(action == me.bindPrefixName + 'Create'){
                    state = 'create';
                }
                else if(action == me.bindPrefixName + 'Update'){
                    state = 'update';
                }
                else if(action == me.bindPrefixName + 'Read'){
                    state = 'read';
                }
            }

            switch (state) {
                case 'create':
                    formtitle = 'Add New';
                    formicon = 'icon-form-add';
                    break;
                case 'update':
                    formtitle = 'Edit';
                    formicon = 'icon-form-edit';
                    break;
                case 'read':
                    formtitle = 'View';
                    formicon = 'icon-form';
                    break;
            }

            if(formtitle.indexOf('_') > 0){
                formtitle = formtitle.replace(/_/gi, " ");
            }
            formtitle = me.sentenceCase(formtitle);

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
                    // height:Ext.getBody().getViewSize().height * 0.9,
                    //height:200,
                    renderTo: Ext.getBody(),
                    constrain: true,
                    constrainHeader: false,
                    modal: true,
                    layout: 'fit',
                    shadow: 'frame',
                    shadowOffset: 10,
                    border: false,
                    //items: Ext.create('Erems.view.' + me.controllerName + '.FormData'),
                    state: state,
                    listeners: {
                        boxready: function() {
                            // win.setHeight(200);

                            win.body.mask('Loading...');
                            var tm = setTimeout(function() {
                                win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
                                // console.log(win.down('panel').height);
                                //  console.log(win.down('panel').el.dom.clientHeight);
                                //win.setHeight(win.down('panel').height);
                                // win.doComponentLayout();
                                win.center();
                                win.body.unmask();

                                if(!me.searchContains(state, ['create', 'update']) && win.down('#btnCancel') != null){
                                    var btnItem = win.down('#btnCancel').up('toolbar[dock="bottom"]').items.items;
                                    btnItem.forEach(function(x){
                                        var itm = x.itemId;
                                        if(itm != undefined && itm.includes('btnSave')){
                                            x.hide();
                                        }
                                    });
                                }

                                clearTimeout(tm);
                            }, 1000);

                        }
                    }

                });
            }

            win.show();
        }
    },
    /**NEW 21 JUNI 2013 execAction*/
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Read':
            case me.bindPrefixName + 'Create':
            case me.bindPrefixName + 'Update':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
    /**END NEW 21 JUNI 2013 execAction*/
    /**NEW 21 JUNI 2013 execAction mainPanelBeforeRender*/

    mainPanelBeforeRender: function(el) {
        var me = this;
        setupObject(el, me.execAction, me);

        /* added 25 Nobember 2013*/
    },

    formSearchAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);
    },
    /**END NEW 21 JUNI 2013 execAction mainPanelBeforeRender*/
//    formDataAfterRender: function(el) {
//
//        var me = this;
//        me.loadComboBoxStore(el);
//        var state = el.up('window').state;
//
//        if (state == 'create') {
//            // el.down('#active').setValue(1);
//        } else if (state == 'update') {
//
//            var grid = me.getGrid();
//            var store = grid.getStore();
//
//            var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
//            el.loadRecord(record);
//        }
//    },
    formDataClose: function() {
        var me = this;
        me.getFormdata().up('window').close();
    },
    dataSearch: function() {
        resetTimer();
        var me         = this;
        var store      = me.getGrid().getStore();
        var formsearch = typeof me.getFormsearchheader === 'function' ? me.getFormsearchheader() : (typeof me.getFormsearch === 'function' ? me.getFormsearch() : null);

        if(formsearch != null){
            var form   = formsearch.getForm();
            var fields = form.getValues();
            for (var x in fields){
                store.getProxy().setExtraParam(x, fields[x]);
            }
        }

        me.loadPage(store);
    },
    loadPage: function(store) {
        store.loadPage(1);
    },
    dataReset: function() {
        var me         = this;
        var formsearch = typeof me.getFormsearchheader === 'function' ? me.getFormsearchheader() : (typeof me.getFormsearch === 'function' ? me.getFormsearch() : null);

        if(formsearch != null){
            formsearch.getForm().reset();

            ///// add by erwin.st 27122021
            ///// utk mengantisipasi combobox di reset tidak ke reset
            var xfield = formsearch.items.items;
            if(xfield.length){
                for(var z in xfield){
                    var mainString = xfield[z].xtype;
                    var substr     = /combobox/;
                    var found      = substr.test(mainString)

                    if(found){
                        me.setComboboxOptionALL(xfield[z]);
                    }
                }
            }
        }

        me.dataSearch();
    },
    setComboboxOptionALL : function(xfield){ ///// add by erwin.st 27122021
        var xstore = xfield.getStore();
        if(xstore.getCount() > 0){
            var displayF = xfield.displayField;
            var valueF   = xfield.valueField;
            var xarray   = ["999", 999, "", null, "0", 0];

            if(xarray.includes(xstore.getAt(0).get(valueF)) == false){ /// tidak ada option all
                var obj = { [displayF] : "ALL", [valueF] : "0" };
                xstore.insert(0, [obj]);
            }
            xfield.setValue(xstore.getAt(0).get(valueF));
        }
    },

    /* GETFINALDATA */
    /* fungsi untuk memodifikasi data form sebelum di masukkan ke dalam store
     *  params => form.getValues()
     *  return => object => {}
     */
    getFinalData: function(formGetValues) {
        var finalData = formGetValues;
        return finalData;
    },
    validationProcess: function() {
        return true;
    },
    dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        // added 12 Nov 2013
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function() {
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
        // end added 12 Nov 2013

        if (form.isValid() && vps) {

            resetTimer();
            //var store = me.getGrid().getStore();
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
                    // console.log(store);

                } else {

                    store = me.storeProcess;

                }

            }





            var msg = function() {
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
                success: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            me.formDataClose();
                        }
                    });
                },
                failure: function() {
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
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    dataPrint: function(el) {
        loadReport(el, 'masterdata/holiday/print');
    },
    /* added 31 Mei 2013
     * Save Edit Button management
     */
    formbuttonControl: function(mode) {
        var myAction = {store: null, createProcess: null, updateProcess: null};
        switch (mode) {
            case 'tes':
                myAction.store = null /// set store here
                myAction.createProcess = function() {
                    alert('Create');
                };
                myAction.updateProcess = function() {
                    alert('Update');
                };
                break;
        }
        return myAction;
    },
    formbuttonAction: function(mode, f, a) {
        var me = this;
        var form = f.up('form').getForm();
        var fbc = this.formbuttonControl(mode); /// form button control

        var store = fbc.store;
        var msg = function() {
            f.up('window').body.mask('Saving data, please wait ...');
        };
        switch (f.up('window').state.toLowerCase()) {
            case 'create':
                store.add(form.getValues());
                fbc.createProcess();
                //  me.getFormdata().down('#edit_image_flag').setValue(1);
                f.up('window').close();
                break;
            case 'update':
                var idProperty = store.getProxy().getReader().getIdProperty();



                var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                rec.beginEdit();
                rec.set(form.getValues());
                rec.endEdit();
                if (parseInt(form.findField(idProperty).getValue()) == 0) {
                    f.up('window').close();
                    return;
                }
                store.on('beforesync', msg);
                store.sync({
                    success: function() {
                        f.up('window').body.unmask();
                        store.un('beforesync', msg);
                        fbc.updateProcess();
                        Ext.Msg.show({
                            title: 'Success',
                            msg: 'Data saved successfully.',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function() {
                                f.up('window').close();
                            }
                        });
                    },
                    failure: function() {
                        f.up('window').body.unmask();
                        store.un('beforesync', msg);
                        fbc.updateProcess();
                        Ext.Msg.show({
                            title: 'Failure',
                            msg: 'Error: Unable to save data.',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                });
                break;
        }
    },
    /*modified 13 february 2014*/
    /* added parameter for customer controller */
    instantWindow: function(panel, width, title, state, id) {
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
    //addby RH 04/02/2021
    instantWindowReport: function (panel, width, title, state, id, controller) {
        var me = this;
        var formtitle, formicon;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;



        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: true,
                minimizable: false,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Erems.view.' + controllerFolder + '.' + panel),
                state: state
            });
        }
        win.show();
    },
    formatMoneyNull: function(n, decPlaces, thouSeparator, decSeparator) {
        return n;
    },
    formatMoney: function(n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    },
    searchAndFill: function(mode, distEl, el, distField, val) {

        /*
         if (mode == 'cb') {
         el.up('form').down('[name=' + distEl + ']').setValue(val[0].data[distField]);
         } else if (mode == 'tf') {
         var cb = el.up('form').down('[name=' + distEl + ']');
         var s = cb.getStore();
         var idx = s.findExact(distField, el.getValue());
         if (idx > -1) {
         var id = s.getAt(s.findExact(distField, el.getValue())).get(val);
         cb.setValue(id);
         }

         }
         */

    },
    /* SEARCH AND FILL OTHER ELEMENT BASED THIS ELEMENT VALUE **/
    seFi: {
        cb: function(distEl, el, distField, val) {
            el.up('form').down('[name=' + distEl + ']').setValue(val[0].data[distField]);
        },
        tf: function(distEl, el, distField, val) {
            var cb = el.up('form').down('[name=' + distEl + ']');
            var s = cb.getStore();
            var elv = distField.tipe == 'int' ? parseInt(el.getValue()) : el.getValue();/// element value
            var idx = s.findExact(distField.name, elv);

            if (idx > -1) {
                var id = s.getAt(idx).get(val);
                cb.setValue(id);
            }
        }
    },
    /*  GET VALUE FROM STORE OF ELEMENT */
    getValFromElStore: function(el, val, idField, nameField) {
        var hsl = null;
        if (parseInt(idField) > 0) {
            var store = el.getStore();

            hsl = store.getAt(store.findExact(idField, val)).get(nameField);
        }

        return hsl;
    },
    instantCreate: function(callerId) {
        var me = this;
        me.instantCreateMode = true;
        me.callerId = callerId;
        me.formDataShow(null, null, me.bindPrefixName + 'Create');
    },
    finalValidation: function() {
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
    checkingValidationItem: function() {
        var me = this;
        var msg = 'OK';
        /* FORMAT ERROR = [ER_type_Error][field_no] message */
        /* [ER01] name undefined **/
        /* [ER02] message undefined **/
        /* [ER03] field form data not found **/

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
    /// added by tommy 26 Agustus 2013
    getv: function(name) {
        return this.getFormdata().down('[name=' + name + ']').getValue();
    },
    /* added 13 November 2013*/
    /* gete by tommy toban */
    /* Selector for your field in formdata*/
    gete: function(name) {
        var me = this;
        var gt = {
            /* get element */
            gt: function() {
                return me.getFormdata().down('[name=' + name + ']');
            },
            /* get value from element */
            gv: function() {
                return this.gt().getValue();
            },
            /* get pure integer from field */
            getInt: function() {
                var y = this.gv();
                var x = isNaN(parseInt(y)) ? 0 : y;
                return x;
            },
            getDate: function() {
                return this.gt().getSubmitValue();
            }

        };
        return gt;

    },
    sete: function(name, value) {
        var me = this;
        value = typeof value==='undefined'?me.getv(name):value;
        var st = {
            toMoney: function() {
                me.setv(name, me.myConvert().fmb(value));
            }
        };
        return st;
    },
    setv: function(name, hasil) {
        this.getFormdata().down('[name=' + name + ']').setValue(hasil);
    },
    setReadOnlyColor: function(name, mode, readOnlyMode) {
        var c = mode ? '#F2F2F2' : '#FFFFFF';
        var rom = typeof readOnlyMode == 'undefined' ? false : readOnlyMode;
        var el = this.getFormdata().down('[name=' + name + ']');
        if (rom) {
            el.setReadOnly(mode);
        }
        el.setFieldStyle('background-color:' + c + ';background-image: none;');

        // var c = mode ? '#F2F2F2':'#FFFFFF';
        // this.getFormdata().down('[name=' + name + ']').setFieldStyle('background-color:'+c+';background-image: none;');

    },
    /* added 15 November 2013*/
    createSpProcessObj: function(s) {
        var x = null;
        var me = this;
        // console.log(typeof s);
        if (typeof s === 'string') {
            if (s.length > 0) {
                var sp = 'me.get' + s + 'Store()';
                x = eval(sp);
            }
        }

        return x;
    },
    /* added 1 November 2013 */
    /* split formdataafterrender method to 3 function  .. :) and add storeProcess function */

    formDataAfterRender: function(el) {
        var me = this;
//        if (me.storeProcess.length > 0 && typeof me.storeProcess == 'string') {
//            var sp = 'me.get' + me.storeProcess + 'Store()';
//            me.storeProcess = eval(sp);
//        }
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();

        me.loadComboBoxStore(el);
        var state = el.up('window').state;
        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update' || state == 'read') {
            me.fdar().update();
        }
    },
    fdar: function() {
        var me    = this;
        var state = me.getFormdata().up('window').state;
        var x     = {
            init: function() {
                /// init here
            },
            create: function() {
                /// create here
            },
            update: function() {
                var grid = me.getGrid();
                var store = grid.getStore();

                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);
                /// update here

                if(state == 'read'){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.getFormdata().down('#btnSave').hide();
                    }
                }
            }
        };
        return x;
    },
    /* Added 12 November 2013*/
    myConvert: function() {
        var me = this;
        var x = {
            fmb: function(val) {
                return this.fm(val, 2, ',', '.');
            },
            fm: function(n, decPlaces, thouSeparator, decSeparator) {
                var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                        decSeparator = decSeparator == undefined ? "." : decSeparator,
                        thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                        sign = n < 0 ? "-" : "",
                        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                        j = (j = i.length) > 3 ? j % 3 : 0;
                return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
            }
        }
        return x;
    },

    //added by Tirtha on 13-02-2018
    documentPrintout: function(id, urlAdd){
        var me = this;

        var combo = Ext.create('Ext.form.field.ComboBox', {
            id: 'cbPrintoutID',
            editable: false,
            queryMode: 'local',
            valueField: 'value',
            displayField: 'value',
            width: '100%'
        });

        Ext.create('Ext.window.Window', {
            id: 'myCbDocWindow',
            title: 'Select Printout Document',
            height: 100,
            width: 400,
            layout: 'hbox',
            padding: '10px 10px 10px 10px',
            modal: true,
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: combo,
                name: 'printout_combobox'
            },
            dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {
                            //padding: 6,
                            type: 'hbox'
                        },
                        items: [
                        {
                            xtype: 'button',
                            action: 'processprintout',
                            padding: 5,
                            width: 75,
                            iconCls: 'icon-save',
                            text: 'Process',
                            handler: function() {
                                var me2 = this;

                                var printout_cb = this.up('window').items.items[0].value;
                                if(!printout_cb){
                                    Ext.Msg.show({
                                        title: 'Alert',
                                        msg: 'Please Select Printout Document First',
                                        icon: Ext.Msg.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                    return false;
                                }

                                me2.up('window').body.mask('Creating Document, Please Wait...');

                                Ext.Ajax.request({
                                    url: urlAdd,
                                    params: {
                                            id: id,
                                            document_name: printout_cb,
                                            read_type_mode: 'printout_document'
                                        },
                                    success: function(response) {
                                        try{
                                            var resp = response.responseText;

                                            if(resp) {
                                                var info = Ext.JSON.decode(resp);

                                                if(info.success == true){
                                                    me2.up('window').body.unmask();
                                                    Ext.Msg.show({
                                                        title: 'Info',
                                                        msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
                                                        icon: Ext.Msg.INFO,
                                                        //buttons: [], //jika ingin tidak ada buttons
                                                        buttons: Ext.Msg.CANCEL,
                                                        buttonText :
                                                        {
                                                            cancel : 'Close',
                                                        }
                                                    });
                                                } else {
                                                    me2.up('window').body.unmask();
                                                    Ext.Msg.show({
                                                        title: 'Failure',
                                                        msg: 'Error: Create Document Failed.',
                                                        icon: Ext.Msg.ERROR,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                }
                                            }
                                        }catch(e){
                                            //console.error(e);
                                            me2.up('window').body.unmask();
                                            Ext.Msg.show({
                                                title: 'Failure',
                                                msg: 'Error: Create Document Failed.',
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                        }
                                    },
                                    failure: function(e){
                                        //console.error(e);
                                        me2.up('window').body.unmask();
                                        Ext.Msg.show({
                                            title: 'Failure',
                                            msg: 'Error: Create Document Failed.',
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                });
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
    //end added by Tirtha on 13-02-2018

    ////// added by erwin om 08-02-2021
    limitedMaxchar : function(field, limited){
        if (field.value.length > limited) {
            var val = field.value.substring(0, limited);
            field.setValue(val);
            var tm = setTimeout(function() {
                Ext.Msg.alert('Info', 'Maximum input ' + limited + ' character.');
                clearTimeout(tm);
            }, 1000);
        }
    },

    ////// added by erwin om 30-03-2021
    validateDecimalPrecision : function(f, e, ln){
        var v = f.getValue();
        if (!Ext.isEmpty(v)) {

            v = parseFloat(String(v));
            v = isNaN(v) ? null : v;

            if(Ext.isNumber(v) == false){
                Ext.Msg.alert('Info', 'Harus input dengan angka.');
                f.setValue("");
                e.stopEvent();
            }

            var str = new RegExp("\\.\\d{"+ln+",}");
            if (str.test(v)) {
                e.stopEvent();
            }
        }
    },

    ////// added by erwin.st 09-04-2021
    validateEmail : function(f) {
        var email = f.getValue();
        var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var boolean = true;
        if (!filter.test(email)) {
            boolean = false;
            Ext.Msg.alert('Info', 'Format email salah.');
        }
        return boolean;
    },
    ////// added by erwin.st 14-04-2021
    cleanWordPaste : function(in_word_text) {
        var tmp       = document.createElement("DIV");
        tmp.innerHTML = in_word_text;
        var newString = tmp.textContent||tmp.innerText;
        // this next piece converts line breaks into break tags
        // and removes the seemingly endless crap code
        newString  = newString.replace(/\n\n/g, "<br />").replace(/.*<!--.*-->/g,"");
        // this next piece removes any break tags (up to 10) at beginning
        for ( i=0; i<10; i++ ) {
            if ( newString.substr(0,6)=="<br />" ) {
                newString = newString.replace("<br />", "");
            }
        }
        return newString;
    },
    ////// added by erwin.st 08-09-2021
    strSplice: function(specimen, start, end, replacement) {
        // string to modify, start index, end index, and what to replace that selection with
        var head = specimen.substring(0,start);
        var body = specimen.substring(start, end + 1); // +1 to include last character
        var tail = specimen.substring(end + 1, specimen.length);

        var result = head + replacement + tail;

        return result;
    },
    /////// added by erwin.st 16-11-2021
    padLeft : function(nr, n, str){
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    },
    /////// added by erwin.st 19-11-2021
    amountSchedule : function(obj){
        var value = (~~((obj.amount) / obj.termin / obj.round)) * obj.round;
        return value;
    },
    ////// added by erwin.st 04-03-2022
    setterReadonly : function(form, arr, boolean=false){
        var me = this;
        for(i = 0; i < arr.length; i++){
            var eLm = form.down('[name=' + arr[i] + ']');

            eLm.setReadOnly(boolean);
            if(!eLm.isXType('checkbox') && !eLm.isXType('radio')){
                if(boolean){
                    eLm.setFieldStyle('background-color:#F2F2F2;');
                }
                else{
                    eLm.setFieldStyle('background-color:#FFFFFF;');
                }
            }
        }
    },
    checkFormReadonly : function(form){
        var me = this;

        form.getForm().getFields().each(function(el){
            var eLm = form.down('[name=' + el.name + ']');

            if(!eLm.isXType('checkbox') && !eLm.isXType('radio')){
                if(typeof el.readOnly != 'undefined' && el.readOnly){
                    eLm.setFieldStyle('background-color:#F2F2F2;');
                }
                else{
                    eLm.setFieldStyle('background-color:#FFFFFF;');
                }
            }
        });
    },
    setAllformatmoney : function(f){
        var fields = f.getForm()._fields.items;
        for(var i = 0; i < fields.length; i++){
            if(fields[i].xtype == 'xmoneyfieldEST'){
                var precision = f.down("[name=" + fields[i].name + "]").getDecPrecision();
                f.down("[name=" + fields[i].name + "]").setValue(accounting.formatMoney(f.down("[name=" + fields[i].name + "]").getValue(), { precision : precision }));
            }
        }
    },
    empty : function(e){
        switch (e) {
        case "":
        // case 0:
        // case "0":
        case null:
        case false:
        case typeof(e) == "undefined":
          return true;
        default:
          return false;
      }
    },
    getMindate : function(arr){
        const minDate = new Date(
            Math.min(
                ...arr.map(element => {
                    return new Date(element);
                }),
            ),
        );
        return minDate;
    },
    getMaxdate : function(arr){
        const maxDate = new Date(
            Math.max(
                ...arr.map(element => {
                    return new Date(element.date);
                }),
            ),
        );
        return maxDate;
    },
    getDatediff : {
        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return Math.floor((t2-t1)/(24*3600*1000));
        },

        inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2-t1)/(24*3600*1000*7));
        },

        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },

        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear();
        }

    },
    calcDate : function(date1, date2) {
        /*
        * calcDate() : Calculates the difference between two dates
        * @date1 : "First Date in the format MM-DD-YYYY"
        * @date2 : "Second Date in the format MM-DD-YYYY"
        * return : Array
        */

        //new date instance
        const dt_date1 = new Date(date1);
        const dt_date2 = new Date(date2);

        //Get the Timestamp
        const date1_time_stamp = dt_date1.getTime();
        const date2_time_stamp = dt_date2.getTime();

        let calc;

        //Check which timestamp is greater
        if (date1_time_stamp > date2_time_stamp) {
            calc = new Date(date1_time_stamp - date2_time_stamp);
        } else {
            calc = new Date(date2_time_stamp - date1_time_stamp);
        }
        //Retrieve the date, month and year
        const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
        //Convert to an array and store
        const calcFormat = calcFormatTmp.split("-");
        //Subtract each member of our array from the default date
        const days_passed   = Number(Math.abs(calcFormat[0]) - 1);
        const months_passed = Number(Math.abs(calcFormat[1]) - 1);
        const years_passed  = Number(Math.abs(calcFormat[2]) - 1970);

        //Set up custom text
        const yrsTxt = ["year", "years"];
        const mnthsTxt = ["month", "months"];
        const daysTxt = ["day", "days"];

        //Convert to days and sum together
        const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;
        const total_secs = total_days * 24 * 60 * 60;
        const total_mins = total_days * 24 * 60;
        const total_hours = total_days * 24;
        const total_weeks = total_days / 7;

        //display result with custom text
        const result = ((years_passed == 1) ? years_passed + ' ' + yrsTxt[0] + ' ' : (years_passed > 1) ?
            years_passed + ' ' + yrsTxt[1] + ' ' : '') +
            ((months_passed == 1) ? months_passed + ' ' + mnthsTxt[0] : (months_passed > 1) ?
                months_passed + ' ' + mnthsTxt[1] + ' ' : '') +
            ((days_passed == 1) ? days_passed + ' ' + daysTxt[0] : (days_passed > 1) ?
                days_passed + ' ' + daysTxt[1] : '');

        var obj_raw = {
            day   : days_passed,
            month : months_passed,
            year  : years_passed,
        };

        var result_ind = '';
        if(years_passed >= 1){
            result_ind = years_passed + ' Tahun';
        }
        if(months_passed >= 1){
            if(result_ind != ''){
                result_ind = result_ind + ', ';
            }
            result_ind = result_ind + months_passed + ' Bulan';
        }
        if(days_passed >= 1){
            if(result_ind != ''){
                result_ind = result_ind + ', ';
            }
            result_ind = result_ind + days_passed + ' Hari';
        }

        //return the result
        return {
            "total_days"    : Math.round(total_days),
            "total_weeks"   : Math.round(total_weeks),
            "total_hours"   : Math.round(total_hours),
            "total_minutes" : Math.round(total_mins),
            "total_seconds" : Math.round(total_secs),
            "result"        : result.trim(),
            "data_raw"      : obj_raw,
            "result_ind"    : result_ind
        }

    },
    addDays : function(date, number) {
        const newDate = new Date(date);
        return new Date(newDate.setDate(date.getDate() + number));
    },
    addMonths : function(date, number) {
        const newDate = new Date(date);
        return new Date(newDate.setMonth(newDate.getMonth() + number));
    },
    nextDatemonths : function(date){
        const newDate = new Date(date);
        if (newDate.getMonth() == 11) {
            newDate.setFullYear(newDate.getFullYear() + 1);
            newDate.setMonth(0);
        }
        else{
            newDate.setMonth(newDate.getMonth() + 1);
        }
        return new Date(newDate);
    },
    checkProlibs : function(file){ ///// pengecekan prolibs erwin.st 10012023
        if (file) {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
                Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + file + '.js?_dc=' + Ext.Date.now(), function () {
                }, function () {
                    Ext.Msg.alert('Warning', "Error load " + file + ".js file.");
                });
            }, function () {
                Ext.Msg.alert('Warning', "Error load Prolibs.js file.");
            });
        }
        else {
            Ext.Msg.alert('Warning', "[JSERR01] File perhitungan tidak ditemukan.");
        }
    },
    checkFileExist : function (file){
        // console.log(file)
        var result=false;
        $.ajaxSetup({async:false});
        $.get(file)
            .done(function() {
               result=true;
            })
            .fail(function() {
               result=false;
            })
        $.ajaxSetup({async:true});
        return(result);
    },
    sentenceCase : function(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();

        return str.replace(/\w\S*/g,
        function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    searchContains : function(needle, haystack){
        if(Array.isArray(haystack)){
            for (var i in haystack) {
                if (needle.indexOf(haystack[i]) > -1) return true;
           }
        }
       return false;
    },
    setFieldAllowBlank : function(field, allowBlank){
        var me = this;

        field.allowBlank     = allowBlank;
        field.labelSeparator = field.allowBlank ? "" : "<span style='color:rgb(255,0,0);font-size:0.8em;'>*</span>";
        field.setFieldLabel(field.getFieldLabel());

        me.setterReadonly(field.up('form'), [field.name], field.allowBlank);
    },
    bindStoreComboboxNonModel : function(data, cb){
        var mField = [];
        if(data.length){
            Object.keys(data[0]).forEach(key => {
                mField.push(key);
            });
        }

        var store = Ext.create('Ext.data.Store', {
            fields : mField,
            data   : data
        });
        cb.bindStore(store);
    },
});
