/*
 * 
 /*
 * Controller2
 * @note : No request models... model di handle masing2 komponen
 * 22 Januari 2014
 * 
 */

/* CONFIG*/

/* CONFIG*/

Ext.define('Hrd.library.box.controller.Controller', {
    extend: 'Ext.app.Controller',
    /* ORI*/
    requires: ['Hrd.library.box.Config', 'Hrd.library.box.tools.TextCombo'],
    rights: {
        create: false,
        update: false,
        destroy: false,
        print: false
    },
    models: [],
    stores: [],
    views: [],
    refs: [],
    textCombo: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Hrd.library.box.Config({
            _controllerName: me.controllerName
        });
        this.textCombo = new Hrd.library.box.tools.TextCombo();

    },
    init: function() {
        var me = this;

        for (var i in me.miniControllers) {
            //me.miniControllers[i].init(me);
            var x = me.miniControllers[i];
            if (x) {
                if (x.controllerName) {
                    this.control(x.getControl(me));

                } else {
                    /// if miniController registered via alternative method
                    for (var y in x) {


                        this.control(x[y].getControl(me));
                    }


                }

                /* destroy it */
                me.miniControllers[i] = null;
            }



        }
        for (var i = 0; i < me.miniControllers.length; i++) {
            console.log(me.miniControllers[i]);
        }
        if (me.textCombo) {
            for (var tc in me.textCombos) {
                this.control(me.textCombo.getControl(me.textCombos[tc]));
                //me.miniControllers[i].init(me);
                // this.control(me.textCombos[tc].getControl(me));
            }
        }

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
    myConfig: null,
    loadProgressCount: 0,
    miniControllers: {},
    textCombos: [],
    loadComboBoxStore: function(el) {

        var me = this;
        try {

            var itemForms = el.getForm().getFields().items;
            for (var x in itemForms) {
                /// make sure this component is combobox
                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
                        itemForms[x].getStore().load();
                    }
                }

            }
        } catch (err) {
            console.log(err);
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

    formSearchAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);

    },
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
    dataReset: function() {
        var me = this;
        var formSearch = me.getFormsearch();
        if (formSearch) {
            me.getFormsearch().getForm().reset();
            me.dataSearch();
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
    instantWindow: function(panel, width, title, state, id, folder, panelConfig) {
        var me = this;
        var formtitle, formicon;

        var pc = typeof panelConfig === 'undefined' ? {} : panelConfig;

        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;
        var fd = typeof folder === "undefined" ? me.controllerName : folder;

        console.log('Hrd.view.' + fd + '.' + panel);


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
                items: Ext.create('Hrd.view.' + fd + '.' + panel, pc),
                state: state
            });
        }
        win.show();
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
        value = typeof value === 'undefined' ? me.getv(name) : value;
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
    },
    /* ORI*/
    /* NOMODEL*/
    nomModels: false,
    /* model yang dipake ketika pertama kali load Main panel
     * dan merupakan anggota dari nomModels
     */
    activeForm: null,
    nomMaster: '',
    _tempnomGetRangeOfFields: false,
    getNomModels: function() {
        return this.nomModels;
    },
    setNomModels: function(nomModels) {
        this.nomModels = nomModels;
    },
    /* added 5 Dec 2013*/
    instantStore: function(data) {
        var me = this;
        var model = data.id + 'model';

        var usedUrl = typeof data.url === 'undefined' ? me.controllerName : data.url;
        var idProperty = typeof data.idProperty === 'undefined' ? 'unit_id' : data.idProperty;

        var dE = {
            mode_read: 'all',
            page: 1,
            limit: 25
        };

        if (typeof data.extraParams !== 'undefined') {
            for (var x in data.extraParams) {
                dE[x] = data.extraParams[x];
            }
        }

        Ext.define(model, {
            extend: 'Ext.data.Model',
            fields: [{name: 'example'}]
        });

        var myStore = Ext.create('Ext.data.Store', {
            model: model,
            storeId: data.id,
            url: usedUrl,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'hrd/' + usedUrl + '/read',
                    create: 'hrd/' + usedUrl + '/create',
                    update: 'hrd/' + usedUrl + '/update',
                    destroy: 'hrd/' + usedUrl + '/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: idProperty,
                    root: 'data',
                    totalProperty: 'totalRow'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: dE
            }
        });
        return myStore;
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
    _loadPage: function(store) {
        var me = this;
        me.nomGetRangeOfFields(me.nomMaster, store);
        if (me._tempnomGetRangeOfFields) {
            store.model.setFields(me._tempnomGetRangeOfFields);

            store.load({
                params: {mode_read: 'all', page: 1, limit: 25},
                callback: function(record, operation, success) {



                }
            });
        } else {
            console.log("[Error:Controllernomodel] No Field");
        }

    },
    nomGetRangeOfFields: function(nomModelsName, store) {
        var me = this;
        var x = null;

        if (typeof this.nomModels[nomModelsName] !== 'undefined') {
            var modEx = store.model;
            modEx.setFields(this.nomModels[nomModelsName]);
            me._tempnomGetRangeOfFields = modEx.prototype.fields.getRange();
        } else {
            console.log("[Err NomModel]: No model for " + nomModelsName);
        }




    },
    /*
     nomGetRangeOfFields: function(nomModelsName) {
     var me = this;
     var x = null;
     var modEx = this.nomGetInangModel();
     modEx.setFields(this.nomModels[nomModelsName]);
     
     me._tempnomGetRangeOfFields = modEx.prototype.fields.getRange();
     
     
     
     },
     */
    /* Ya!!... kita butuh inang untuk nomModels kita*/
    nomGetInangModel: function() {
        var x;
        /* example
         x = this.getExpenserequestModel();
         **/
        return $x;
    },
    setActiveForm: function(form) {
        this.activeForm = form;
    },
    getActiveForm: function() {
        return this.activeForm;
    },
    /*@override SETTER GETTER form value*/
    getv: function(name) {
        var el = this.getActiveForm().down('[name=' + name + ']');
        if (el !== null) {
            return el.getValue();
        }
        console.log("[ERROR] NO element found '" + name + "' in form ");
        return null;

    },
            setv: function(name, hasil) {
        this.getActiveForm().down('[name=' + name + ']').setValue(hasil);
    },
            sete: function(name, value) {
        var me = this;
        value = typeof value === 'undefined' ? me.getv(name) : value;
        var st = {
            toMoney: function() {
                me.setv(name, me.myConvert().fmb(value));
            },
            toDate: function(f) {
                var format = typeof f === 'undefined' ? 'd-m-Y' : f;

                var dt = new Date(value);

                if (dt instanceof Date && !isNaN(dt.valueOf())) {
                    var d = Ext.Date.format(dt, format);
                    me.setv(name, d);
                }





            }
        };
        return st;
    },
            gete: function(name) {
        var me = this;
        var gt = {
            /* get element */
            gt: function() {
                return me.getActiveForm().down('[name=' + name + ']');
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
            /*@override gridSelectionChange()
             * 
             */
            gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var deleteb = grid.down('#btnDelete');
        if (edit !== null) {
            edit.setDisabled(row.length != 1);
        }
        if (deleteb !== null) {
            deleteb.setDisabled(row.length < 1);
        }
    },
            /*@override dataSave()
             * integrate with ActiveForm
             */
            dataSave: function() {
        var me = this;
        var f = me.getActiveForm();
        var form = f.getForm();
        var addingRecord = false;

        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function() {
                    var x = f.down('[name=' + vp.field + ']');
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


            // resetTimer();
            //var store = me.getGrid().getStore();
            var store = null;
            store = me.getGrid().getStore();
            var fida = me.getFinalData(form.getValues());


            var msg = function() {
                f.up('window').body.mask('Saving data, please wait ...');
            };
            switch (f.up('window').state.toLowerCase()) {
                case 'create':

                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
                    var idProperty = store.getProxy().getReader().getIdProperty();

                    var valField = me.getv(idProperty);
                    if (valField === null) {
                        return;
                    }
                    var rec = me.getGrid().getRecordById(valField);
                    if (typeof rec === 'undefined') {
                        console.log("[ERROR] No data found in grid");
                        return;

                    }
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
                    f.up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();
                    /* edited 19 Dec 2013*/
                    /*if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                     Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                     }*/
                    me.getGrid().getStore().load();

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
                failure: function(batch, op) {
                    var erMsg = "Unable to save data.";
                    var jsD = batch.proxy.getReader().jsonData;
                    if (typeof jsD.msg !== "undefined") {
                        erMsg = jsD.msg;
                    }
                    f.up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: ' + erMsg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
            /*@override function dataDestroy*/
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
            getFormProperties: function(action) {
        var me = this;
        var p = {
            state: 'kosong',
            formtitle: 'My Window',
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
    /*@override formDataShow 5 Dec 2013*/
    formDataShow: function(el, act, action) {
        var me = this;
        var formtitle, formicon;

        //  var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
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
                            win.add(Ext.create('Hrd.view.' + me.controllerName + '.FormData'));
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
    /* END NOMODEL*/
    /* NOMODELFULL*/
    /*@added 19 Dec 2013*/
    nomIdProperty: 'unit_id',
    /*acquire model status*/
    acmoDone: false,
    /*List function yang akan dijalankan jika acquire model selesai dijalankan*/
    acmoArrayFuncs: [],
    /* jika pada proses Save data menggunakan store lain , maka params ini harus di isi*/
    pointedStore: null,
    /*@override 30 Dec 2013*/
    nomBindingModel: function(name, store) {
        var me = this;

        var z = function() {

            me.nomGetRangeOfFields(name, store);
            store.model.setFields(me._tempnomGetRangeOfFields);
        };
        if (!me.acmoDone) {

            me.acmoArrayFuncs.push(z());
        } else {
            z();
        }


    },
    /*@added 15 Jan 2014
     @return void 
     @note addition function in form search after render
     */
    nomFunctioninDataSearch: function() {
        /* code here*/
    },
    /*added 19 Dec 2013
     * @params xtype store 
     *@return boolean
     * */
    storeExist: function(getStore) {
        if (getStore.storeId === "ext-empty-store") {
            return false;
        }
        return true;
    },
    /* Added 22 Dec 2013**/
    insActionColumnClick: function(view, cell, row, col, e) {
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);

        this.insACC(view, m[1], row);
    },
    insACC: function(view, action, row) {

    },
    /*@override 27 Dec 2013*/
    nomAcquireModels: function(callback) {
        var me = this;
        var mainGrid = me.getGrid();
        if (mainGrid) {
            //  mainGrid.up("window").body.mask("Please wait... ");

        }
        Ext.Ajax.request({
            url: 'hrd/' + me.controllerName + '/read',
            params: {
                mode_read: "request_models"
            },
            success: function(response) {
                var text = Ext.JSON.decode(response.responseText);
                //mainGrid.up("window").body.unmask();
                me.nomModels = text.data;

                if (typeof callback === 'function') {
                    callback();
                }
                me.acmoDone = true;

                var aaf = me.acmoArrayFuncs;

                if (aaf.length > 0) {

                    for (var x in aaf) {

                        if (typeof aaf[x] === 'function') {
                            aaf[x]();
                        } else if (typeof aaf[x] === 'object') {
                            aaf[x].do();
                        }
                    }
                    me.acmoArrayFuncs = [];
                }
            }
        });


    },
    globalParamsData: {
        store: null,
        data: {}
    },
    globalParams: function() {
        var me = this;

        var gp = {
            init: function() {
                me.globalParamsData.store = me.instantStore({
                    id: me.controllerName + 'GlobalParams',
                    extraParams: {
                        mode_read: 'globalparams'
                    }
                });
                me.nomBindingModel('global_params', me.globalParamsData.store);
                me.globalParamsData.store.load({
                    callback: function(rec) {

                        for (var x in rec) {
                            me.globalParamsData.data[rec[x].raw.parameter.parametername] = rec[x].raw.parameter.value;
                        }
                    }
                });
            },
            getStore: function() {
                return me.globalParamsData.store;
            },
            get: function(name) {
                return me.globalParamsData.data[name];
            }
        };
        return gp;
    },
    /* @ instant Save :) */
    insSave: function(data) {
        var me = this;
        var afterFunc = typeof data.callback !== 'object' ? null : data.callback;
        var sync = typeof data.sync === 'undefined' ? null : data.sync;
        var otherStoreUsed = false;
        var form = data.form;
        var grid = data.grid;
        var store = null;
        /* bisa menggunakan store alternatif selain dari storenya grid */
        if (typeof data.store === 'undefined') {
            store = grid.getStore();
        } else {
            me.pointedStore = grid.getStore();
            store = data.store;
            store.loadData([], false);
            otherStoreUsed = true;
        }
        var w = form.up('window');
        var dataForm = form.getForm().getValues();
        if (typeof data.finalData === 'function') {
            dataForm = data.finalData(dataForm);
        }


        var msg = function() {
            if (typeof form.up("window") !== "undefined") {
                form.up('window').body.mask('Saving data, please wait ...');
            }

        };

        if (w.state == 'create') {
            store.add(dataForm);
            if (otherStoreUsed) {
                grid.getStore().add(dataForm);
            }
            /* sync active */
            if (sync != null) {

                store.on('beforesync', msg);
                store.sync(me.syncParams(form, store, msg, "create", otherStoreUsed));
            }
            if (afterFunc !== null) {
                afterFunc.create(store, form, grid);
            }
        } else {
            var gridStore = null;
            if (otherStoreUsed) {
                var dr = grid.getStore().getAt(form.editedRow).get("deletedRows");
                if (dr) {
                    dataForm['deletedRows'] = grid.getStore().getAt(form.editedRow).get("deletedRows");

                }

                store.add(dataForm);

                gridStore = grid.getStore();
            } else {
                gridStore = store;

            }
            if (me.pointedStore === null) {
                var rec = gridStore.getAt(form.editedRow);

                rec.beginEdit();
                rec.set(dataForm);
                rec.endEdit();
            }


            /* sync active */
            if (sync != null) {

                store.on('beforesync', msg);
                store.sync(me.syncParams(form, store, msg));
            }


            if (afterFunc != null) {
                if (typeof afterFunc.update === 'function') {
                    afterFunc.update();
                }

            }
        }

        if (sync === null) {
            w.close();
        }
    },
    syncParams: function(form, store, msg, mode, otherStoreUsed) {
        var osu = typeof otherStoreUsed === "undefined" ? false : otherStoreUsed;
        var mod = typeof mode === "undefined" ? "create" : mode;
        var me = this;
        var x = {
            success: function() {

                form.up('window').body.unmask();
                //   store.un('beforesync', msg);
                if (me.pointedStore != null) {
                    me.pointedStore.reload();
                } else {
                    store.reload();
                }

                Ext.Msg.show({
                    title: 'Success',
                    msg: mod === "create" ? 'Data saved successfully.' : "Data deleted successfully",
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function() {
                        if (mod == "create") {
                            form.up('window').close();
                        }

                    }
                });
            },
            failure: function(batch, op) {
                var state = me.getActiveForm().up("window").state;
                var erMsg = "Unable to process data.";
                var jsD = batch.proxy.getReader().jsonData;
                if (typeof jsD.msg !== "undefined") {
                    erMsg = jsD.msg;
                }
                form.up('window').body.unmask();
                if (me.pointedStore != null) {
                    me.pointedStore.un('beforesync', msg);
                }

                if (state === "create") {

                    var pos = 0;
                    if (store.getCount() >= 1) {
                        pos = store.getCount() - 1;
                    }
                    store.removeAt(pos);
                    if (osu) {
                        pos = me.pointedStore.getCount() - 1;
                        me.pointedStore.removeAt(pos);
                    }
                    store.reload();
                }


                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: ' + erMsg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                // form.up('window').close();
            }
        };
        return x;
    },
    deleteDetailInMaster: function(masterGrid, detailGrid, row, masterIdVal) {
        var me = this;
        var record = detailGrid.getStore().getAt(row);
        detailGrid.getStore().removeAt(row);
        var id = parseInt(record.get(detailGrid.getStore().getProxy().getReader().getIdProperty()));
        var masterStore = masterGrid.getStore();
        var idProperty = masterStore.getProxy().getReader().getIdProperty();
        var foundRow = -1;
        for (var row in masterStore.data.items) {

            if (masterStore.data.items[row].internalId === parseInt(masterIdVal)) {
                foundRow = row;
            }
        }
        if (foundRow >= 0) {
            var rec = masterStore.getAt(foundRow);
            rec.beginEdit();
            rec.set({
                deletedRows: "" + id + "," + rec.get("deletedRows")
            });
            rec.endEdit();
        } else {
            console.log("[Error] Row not found in master grid");
        }

    },
    uploadImage: function(params) {
        var me = this;
        var form = params.form;
        var callback = params.callback;
        form.submit({
            url: 'hrd/' + me.controllerName + '/upload',
            waitMsg: 'Uploading image...',
            success: function(f, a) {

                var icon = Ext.Msg.INFO;
                var msg = 'Image Uploaded';

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
                //  me.dataSave(me,dataForm);
                console.log(f);
                console.log(a);
                callback.failure();
                var msg = "...";
                if (typeof a.result !== "undefined") {
                    msg = a.result.msg;
                }
                Ext.Msg.show({
                    title: 'Fail',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    nomformsearchAfterRender: function() {

    },
    /* END NOMODELFULL*/
    /*@override 22 Jan 2014*/
    dataSearch: function() {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);

    },
            /*@override 22 Jan 2014*/
            loadPage: function(store) {
        store.loadPage(1, {
            callback: function(rec, operation, success) {
                if (!me.getGrid().getStore().modelExist) {

                    me.getGrid().attachModel(operation);
                }

            }
        });
        var me = this;
        // me.getGrid().xLoad();
    },
    /*@override 22 Jan 2014*/
    mainPanelBeforeRender: function(el) {

        var me = this;
        setupObject(el, me.execAction, me);
    },
    attachModel: function(operation, store, eraseOld) {
        var me = this;
        var data = Ext.JSON.decode(operation.response.responseText);

        store.model.setFields(data.model);
        store.loadData([], false);
        var eo = typeof eraseOld !== "boolean" ? false : eraseOld;
        store.loadRawData(data.data, eo);



        store.modelExist = true;


    },
    /* added 24 february 2014*/
    attachModel_b: function(operation, store, eraseOld) {
        var me = this;
        var data = Ext.JSON.decode(operation.response.responseText);

        store.model.setFields(data.model);
        store.loadData([], false);
        var eo = typeof eraseOld !== "boolean" ? false : eraseOld;



        var result = store.proxy.reader.read(data.data),
                records = result.records;
        for (var x in records) {

            store.add(records[x]);
        }


        /*
         if (result.success) {
         me.totalCount = result.total;
         me.loadRecords(records, append ? me.addRecordsOptions : undefined);
         me.fireEvent('load', me, records, true);
         }
         */
        //store.loadRawData(y,true);





        // store.loadData(data.data,eo);



        store.modelExist = true;


    },
    /* @return void
     * @param string fieldID 
     * @optional string fieldDefault default = "is_default"
     * 
     */
    setDefaultValue: function(el, fieldID, fieldDefault) {
        var idDefault = 0;
        var fd = typeof fieldDefault === "undefined" ? "is_default" : fieldDefault;
        el.getStore().each(function(rec) {

            if (rec !== null) {
                if (rec.get(fd) === true && idDefault === 0) {
                    idDefault = rec.get(fieldID);
                }
            }

        });
        if (idDefault > 0) {
            el.setValue(idDefault);
        }
    },
    /*@edited 13 Maret 2014*/
    formDataAfterRender: function(el) {

        var me = this;
        me.fdar().init();

        var state = el.up('window').state;

        /*added 30 april 2014*/
        el.up('window').getEl().mask("Loading...");

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update') {
            me.fdar().update();


        } else {
            console.log("[Error Form After Render]Invalid state of the Form");

        }
    },
    /*@added 19 Maret 2014*/
    xFormatDate: function(date) {
        if (date) {
            var d = date.getDate();
            var m = (date.getMonth() + 1);
            var y = date.getFullYear();
            return y + "-" + m + "-" + d;
        }
        return "";
    },
    xFormatFloat: function(val) {
        var x = 0;
        x = parseFloat(val);
        x = isNaN(x) ? 0 : x;
        return x;
    },
    /* added 25 Maret 2014 copas dari controllerReport **/
    getComboboxText: function(name, form) {
        var me = this;
        var f = typeof form == "undefined" ? me.getFormdata() : form;
        var text = f.down("[name=" + name + "]").getSelectedText();
        if (text) {
            return text;
        }
        return FALSE;

    },
    addProgress: function() {
        this.loadProgressCount++;
    },
    /*@params int progress*/
    unMask: function(progress) {
        var me = this;
        me.loadProgressCount = me.loadProgressCount - progress;
        if (me.loadProgressCount <= 0) {
            me.getFormdata().up('window').getEl().unmask();
        }

    },
    newActionColumnClick: function(el) {
        var me = this;
        me.formDataShow(el, 'update', me.bindPrefixName + 'Update');
    },
    comboboxLoad: function(comboboxList, callback, form) {
        var me = this;
        var cb = comboboxList;
        var f = null;
        if (form) {
            f = form;
        } else {
            f = me.getFormdata();
        }
        for (var c in cb) {
            var cmp = f.down("[name=" + cb[c] + "]");
            if (cmp) {
                f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                f.down("[name=" + cb[c] + "]").doInit(true, function() {
                    f.setLoading(false);
                    if (typeof callback === "function") {
                        callback();
                    } else {
                    }
                });
            }

        }
    },
    /* added 5 Juni 2014 -- register mini controller*/
    registerMiniCtrl: function(name, miniController) {
        var me = this;
        me.miniControllers[name] = miniController;

        for (var ref in me.miniControllers[name].refs) {
            me.refs.push(me.miniControllers[name].refs[ref]);
        }
    },
    /* added 18 Juni 2014 -- register mini controller alternatif*/
    registerMiniCtrlAlt: function(name, miniController) {
        var me = this;

        if (!me.miniControllers[me.controllerName]) {
            me.miniControllers[me.controllerName] = {};
        }
        me.miniControllers[me.controllerName][name] = miniController;
        for (var i in miniController.refs) {
            me.refs.push(miniController.refs[i]);
        }

    }

})
