Ext.define('Cashier.library.template.controller.Controller0', {
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
    
    loadComboBoxStore_old: function(el) {
        console.log("load combo box");
        var me = this;
        try {

            var itemForms = el.getForm().getFields().items;
            for (var x in itemForms) {
                /// make sure this component is combobox
                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
						itemForms[x].getStore().proxy.extraParams = {start:0,limit:0};
                        itemForms[x].getStore().load();
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
    panelAfterRender: function(el) {

    },
    gridAfterRender: function() {
        var me = this;
    
        me.dataReset();
    },
    gridItemDblClick: function(el) {

        var me = this,
        btnEdit = el.up('panel').down('#btnEdit'),
        state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');

        me.execAction(el, state);
    },
    gridItemContextMenu: function(el, record, item, index, e, eOpts) {
        e.stopEvent();
        var me = this;
        var menucount = 0;
        var cm = Ext.create('Ext.menu.Menu', {items: me.getGrid().contextMenu});
        var cmitem = cm.query('menuitem', '', 'simple');
        Ext.each(cmitem, function(item, index) {
            item.setVisible(me.rights[item.action]);
            if (!item.isHidden()) {
                item.handler = function() {
                    me.gridContextMenuClick(item);
                };
                menucount++;
            }
        });
        if (menucount) {
            cm.showAt(e.xy);
        }
    },
    gridContextMenuClick: function(item) {
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
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
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
    gridActionColumnClick: function(view, cell, row, col, e) {
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
    formDataShow: function(el, act, action) {
        var me = this;
        var formtitle, formicon;

        var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
        switch (state) {
            case 'create':
                formtitle = 'Add New';
                formicon = 'icon-form-add';
                break;
            case 'update':
                formtitle = 'Edit';
                formicon = 'icon-form-edit';
                break;
        }
        
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
                //items: Ext.create('Cashier.view.' + me.controllerName + '.FormData'),
                state: state,
                listeners: {
                    boxready: function() {
                        // win.setHeight(200);

                        win.body.mask('Loading...');
                        var tm = setTimeout(function() {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormData'));
                            // console.log(win.down('panel').height);
                            //  console.log(win.down('panel').el.dom.clientHeight);
                            //win.setHeight(win.down('panel').height);
                            // win.doComponentLayout();
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
    /**NEW 21 JUNI 2013 execAction*/
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
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
        var me = this;
       
        var form = me.getFormsearch().getForm();
        var store = me.getGrid().getStore();

        var fields = me.getFormsearch().getValues();

        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    loadPage: function(store) {
        store.loadPage(1);
    },
    dataReset: function() {
        var me = this;

        me.getFormsearch().getForm().reset();
        me.dataSearch();
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
                    console.log(store);

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
                items: Ext.create('Cashier.view.' + me.controllerName + '.' + panel),
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
        console.log(typeof s);
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
        } else if (state == 'update') {
            me.fdar().update();


        }
    },
    fdar: function() {
        var me = this;
        var x = {
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
    }


});