Ext.define('Cashier.library.StoredElement', {
    el: null,
    controllerName: null,
    storeConfig: null,
    constructor: function (config) {
        if (typeof config.el !== "undefined") {
            this.el = config.el;
            this.storeConfig = this.el.storeConfig;
        }
    },
    /*@ make sure this element have a store */
    init: function () {
        var me = this;
        if (!me.el) {
            console.log("[Stored Element]No Element Binded");
            return;
        }
        me.controllerName = me.el.bindPrefixName.toLowerCase();
        //console.log(me.storeConfig);
        var storeExist = me.storeExist();
        if (!storeExist) {
            me.createStore(me.storeConfig.id, me.storeConfig.idProperty, me.storeConfig.extraParams, me.storeConfig.fieldgrouping);
            me.refreshPagingToolbar();
        }
    },
    refreshPagingToolbar: function () {
        var me = this;
        if (me.el.isXType('grid')) {
            var pt = me.el.down("pagingtoolbar"); /// pagingtoolbar
            if (pt !== null) {
                pt.bindStore(me.el.getStore());
            }
        }
    },
    attachModel: function (data) {
        var me = this;

        if (me.el.getStore().modelExist) {
            return;
        }

        try {

            data = Ext.JSON.decode(data.response.responseText);
            if (data.model) {
                me.el.getStore().model.setFields(data.model);
                // me.el.reconfigure(me.el.getStore());

                me.el.bindStore(me.el.getStore());
                if (data.data.length > 0) {

                    me.el.getStore().loadRawData(data.data, false);

                    // var pt = me.el.down("pagingtoolbar"); /// pagingtoolbar

                }

                me.el.getStore().modelExist = true;
            }
        }
        catch (err) {
            console.log(err.message);
        }

    },
    load: function () {

    },
    /*@return boolean*/
    storeExist: function () {
        var me = this;
        var store = me.el.getStore();
        if (store.storeId === "ext-empty-store") {
            return false;
        }
        return true;
    },
    /*@added 22 Jan 2014 copied from Controllernomodel*/
    instantStore: function (data) {
        var me = this;
        var model = data.id + 'model';

        var usedUrl = typeof data.url === 'undefined' ? me.controllerName : data.url;
        var idProperty = typeof data.idProperty === 'undefined' ? 'unit_id' : data.idProperty;
        var fieldgrouping = typeof data.fieldgrouping === 'undefined' ? '' : data.fieldgrouping;

        var dE = {
            mode_read: 'all',
            module: me.controllerName, ////added by semy 19 feb 2018
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
            groupField: data.fieldgrouping,
            modelExist: false,
            url: usedUrl,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                timeout: 120000, //30 detik
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
                //added bby semy 19 feb 2018
                listeners: {
                    exception: function (proxy, response, operation, eOpts) {

                        if (response.status === 0) {
                            console.log('Request Timeout');
                            Ext.Msg.show({
                                title: 'Warning',
                                msg: 'Request Data Timeout, Please try again later.',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        } else {
                            //console.log('Request Error');
                            Ext.Msg.show({
                                title: 'Error',
                                msg: 'Request Data Failed, #101.',
                                icon: Ext.Msg.INFO,
                                buttons: Ext.Msg.OK
                            });
                        }
                        console.log('Status request error : ' + response.statusText + ' \n Error info : ' + response.responseText);
                    }
                },
                //
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: dE
            },
        });
       
        return myStore;
    },
    createStore: function (id, idProperty, extraParams, fieldgrouping) {
        var me = this;
        var idP = typeof idProperty === "undefined" ? "kosong_id" : idProperty;
        var eP = typeof extraParams === "undefined" ? null : extraParams;
        var gP = typeof fieldgrouping === "undefined" ? null : fieldgrouping;

        var x = null;
        if (eP !== null) {
            x = me.instantStore({
                id: id,
                idProperty: idP,
                extraParams: eP,
                fieldgrouping: gP
            });
        } else {
            x = me.instantStore({
                id: id,
                idProperty: idP,
                fieldgrouping: gP
            });
        }
        //me.store = x;
        // me.el.reconfigure(x);
        me.el.bindStore(x);
        // console.log('response');
        //console.log(response.status);
    }
});