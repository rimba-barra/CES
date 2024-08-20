Ext.define('Cashier.library.template.controller.Controllernomodel', {
    extend: 'Cashier.library.template.controller.Controller0',
    nomModels: false,
    /* model yang dipake ketika pertama kali load Main panel
     * dan merupakan anggota dari nomModels
     */
    activeForm: null,
    nomMaster: '',
    formxWinId: 'win-holidayformdata',
    _tempnomGetRangeOfFields: false,
    getNomModels: function () {
        return this.nomModels;
    },
    setNomModels: function (nomModels) {
        this.nomModels = nomModels;
    },
    nomAcquireModels: function (callback) {
        var me = this;


        Ext.Ajax.request({
            url: 'cashier/' + me.controllerName + '/read',
            params: {
                mode_read: "request_models"
            },
            success: function (response) {
                var text = Ext.JSON.decode(response.responseText);

                me.nomModels = text.data;

                if (typeof callback === 'function') {
                    callback();
                }
                // process server response here
            }
        });


    },
    /* added 5 Dec 2013*/
    instantStore: function (data) {
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
                    read: 'cashier/' + usedUrl + '/read',
                    create: 'cashier/' + usedUrl + '/create',
                    update: 'cashier/' + usedUrl + '/update',
                    destroy: 'cashier/' + usedUrl + '/delete'
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
    /* added 6 Dec 2013*/
    nomBindingModel: function (name, store) {
        var me = this;

        me.nomGetRangeOfFields(name, store);
        store.model.setFields(me._tempnomGetRangeOfFields);

    },
    setReadOnlyColor: function (name, mode, readOnlyMode) {
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
    /* override loadPage() */
    loadPage: function (store) {
        //store.loadPage(1);
        var me = this;

        // var nomRange = me.nomGetRangeOfFields(me.nomMaster);
        if (me.nomModels) {
            me._loadPage(store);
        } else {
            me.nomAcquireModels(function () {
                me._loadPage(store);
            });
        }

    },
    _loadPage: function (store) {
        var me = this;
        me.nomGetRangeOfFields(me.nomMaster, store);
        if (me._tempnomGetRangeOfFields) {
            store.model.setFields(me._tempnomGetRangeOfFields);

            store.load({
                params: {mode_read: 'all', page: 1, limit: 25},
                callback: function (record, operation, success) {



                }
            });
        } else {
            console.log("[Error:Controllernomodel] No Field");
        }

    },
    nomGetRangeOfFields: function (nomModelsName, store) {
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
    nomGetInangModel: function () {
        var x;
        /* example
         x = this.getExpenserequestModel();
         **/
        return $x;
    },
    setActiveForm: function (form) {
        this.activeForm = form;
    },
    getActiveForm: function () {
        return this.activeForm;
    },
    /*@override SETTER GETTER form value*/
    getv: function (name) {
        var el = this.getActiveForm().down('[name=' + name + ']');
        if (el !== null) {
            return el.getValue();
        }
        console.log("[ERROR] NO element found '" + name + "' in form ");
        return null;

    },
    setv: function (name, hasil) {
        this.getActiveForm().down('[name=' + name + ']').setValue(hasil);
    },
    sete: function (name, value) {
        var me = this;
        value = typeof value === 'undefined' ? me.getv(name) : value;
        var st = {
            toMoney: function () {
                me.setv(name, me.myConvert().fmb(value));
            },
            toDate: function (f) {
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
    gete: function (name) {
        var me = this;
        var gt = {
            /* get element */
            gt: function () {
                return me.getActiveForm().down('[name=' + name + ']');
            },
            /* get value from element */
            gv: function () {
                return this.gt().getValue();
            },
            /* get pure integer from field */
            getInt: function () {
                var y = this.gv();
                var x = isNaN(parseInt(y)) ? 0 : y;
                return x;
            },
            getDate: function () {
                return this.gt().getSubmitValue();
            }

        };
        return gt;

    },
    /*@override gridSelectionChange()
     * 
     */
    gridSelectionChange: function () {
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
    dataSave: function () {
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

                Ext.MessageBox.alert('Alert', vp.msg, function () {
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


            var msg = function () {
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
                success: function () {
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
                        fn: function () {

                            f.up('window').close();
                        }
                    });
                },
                failure: function (batch, op) {
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

                            Ext.Msg.show({
                                title: 'Success',
                                msg: successmsg,
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        },
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        },
                        error: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Error',
                                msg: failmsg + ' Delete request error.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    iwField: {
        title: 'My X Window'
    },
    getFormProperties: function (action) {
        var me = this;
        var p = {
            state: 'kosong',
            formtitle: me.iwField.title,
            formicon: 'icon-form-add'
        };
        if (typeof action !== 'undefined') {
            p.state = action.replace(me.bindPrefixName, "").toLowerCase();

            var grid = me.getGrid();
            var founded = false;
            if (grid) {
                var actionColItems = grid.down('actioncolumn').items;

                for (var i in actionColItems) {
                    if (actionColItems[i].bindAction === action) {
                        p.formtitle = actionColItems[i].text;
                        p.formicon = actionColItems[i].iconCls;
                        founded = true;
                    }

                }
            }


            if (!founded) {
                p.formtitle = p.state;
            }
        }

        return p;
    },
    /*@override formDataShow 5 Dec 2013*/
    formDataShow: function (el, act, action) {
        var me = this;
        var formtitle, formicon;

        //  var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
        var gfp = me.getFormProperties(action);
        var state = gfp.state;
        formtitle = gfp.formtitle;
        formicon = gfp.formicon;
        /*switch (state) {
         case 'create':
         formtitle = 'Add New';
         formicon = 'icon-form-add';
         break;
         case 'update':
         formtitle = 'Edit';
         formicon = 'icon-form-edit';
         break;
         }*/


        var winId = me.formxWinId;
        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
                maximizable: true,
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
                onEsc: function() {
                    var me = this;
                    Ext.Msg.confirm(
                        'Confirmation',
                        'Are you sure you wish to close this window before saving your changes?',
                        function(btn) {
                            if (btn === 'yes')
                                me.destroy();
                        }
                     );
                },
                listeners: {
                    boxready: function () {
                        // win.setHeight(200);

                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create('Cashier.view.' + me.controllerName + '.FormData'));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);

                    }
                }

            });
        }
        win.show();

    }
})
