/*
 * 
 /*
 * Controllernomodelfull
 * @note : Tidak ada store yang di define extjs dari awal module di load, 
 * semua di handle oleh permintaan extjs ke zend
 * 
 */
Ext.define('Erems.library.template.controller.Controllernomodelfull', {
    extend: 'Erems.library.template.controller.Controllernomodel',
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
    /*@override 17 Dec 2013*/
    dataSearch: function() {
        var me = this;

        var form = me.getFormsearch().getForm();
        if (!me.storeExist(me.getGrid().getStore())) {

            me.getGrid().createStore(me, me.controllerName + 'MainStore', me.nomIdProperty);
            var pt = me.getGrid().down("pagingtoolbar"); /// pagingtoolbar

            pt.bindStore(me.getGrid().getStore());



        }
        me.nomFunctioninDataSearch();
        var z = {
            do: function() {
                var store = me.getGrid().getStore();
                me.nomBindingModel(me.nomMaster, store);

                var fields = me.getFormsearch().getValues();

                for (var x in fields)
                {
                    store.getProxy().setExtraParam(x, fields[x]);
                }
                me.loadPage(store);

            }
        };


        if (me.acmoDone) {
            z.do();
        } else { /* jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc*/
            this.acmoArrayFuncs.push(z);
        }

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

        var act = '';
        if(m != null){
            act = m[1];
        }
       
        this.insACC(view, act, row);
    },
    insACC: function(view, action, row) {

    },
    /*@override 27 Dec 2013*/
    mainPanelBeforeRender: function(el) {

        var me = this;
        setupObject(el, me.execAction, me);
        me.nomAcquireModels(function() {
            console.log("main panel before render acquire models");
        });
    },
    /*@override 27 Dec 2013*/
    nomAcquireModels: function(callback) {
        var me = this;
        var mainGrid = me.getGrid();
        if (mainGrid) {
            //  mainGrid.up("window").body.mask("Please wait... ");

        }
        Ext.Ajax.request({
            url: 'erems/' + me.controllerName + '/read',
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
            store.loadData([],false);
            otherStoreUsed = true;
        }
        var w = form.up('window');
        var dataForm = form.getForm().getValues();
        if (typeof data.finalData === 'function') {
            dataForm = data.finalData(dataForm);
        }
     

        var msg = function() {
            if(typeof form.up("window") !=="undefined"){
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
                dataForm['deletedRows'] = grid.getStore().getAt(form.editedRow).get("deletedRows");
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
                }else{
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

                console.log(jsD);


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

                var msgJson = jsD.msg;
                if (!msgJson) {
                Ext.Msg.show({
                    title: 'Failure',
                        msg: 'Message : ' + erMsg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                } else {
                   Ext.Msg.show({
                        title: 'Warning',
                        msg: 'Message : ' + erMsg,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }

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
             clientValidation: false,
            url: 'erems/' + me.controllerName + '/upload',
            params:params.params,
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
    },
    nomformsearchAfterRender: function() {

    }

})
