Ext.define('Erems.library.box.StoredElement', {
    el: null,
    controllerName: null,
    storeConfig: null,
    requires:['Erems.library.box.Config'],
    constructor: function(config) {
        if (typeof config.el !== "undefined") {
            this.el = config.el;
            this.storeConfig = this.el.storeConfig;
        }
    },
    /*@ make sure this element have a store */
    init: function() {
        var me = this;
        if (!me.el) {
            console.log("[Stored Element]No Element Binded");
            return;
        }
        me.controllerName = me.el.bindPrefixName.toLowerCase();

        var storeExist = me.storeExist();
        if (!storeExist) {
            me.createStore(me.storeConfig.id, me.storeConfig.idProperty, me.storeConfig.extraParams);
            me.refreshPagingToolbar();
        }
    },
    refreshPagingToolbar: function() {
        var me = this;
        if (me.el.isXType('grid')) {
            var pt = me.el.down("pagingtoolbar"); /// pagingtoolbar
            if (pt !== null) {
                pt.bindStore(me.el.getStore());
            }
        }
    },
    attachModel: function(data) {
        var me = this;

        if (me.el.getStore().modelExist) {
            return;
        }
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


    },
    load: function() {

    },
    /*@return boolean*/
    storeExist: function() {
        var me = this;
        var store = me.el.getStore();
        if (store.storeId === "ext-empty-store") {
            return false;
        }
        return true;
    },
    /*@added 22 Jan 2014 copied from Controllernomodel*/
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
        
        var config = new Erems.library.box.Config();

        var myStore = Ext.create('Ext.data.Store', {
            model: model,
            storeId: data.id,
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
                api: {
                    read: config.moduleName+'/' + usedUrl + '/read',
                    create: config.moduleName+'/' + usedUrl + '/create',
                    update: config.moduleName+'/' + usedUrl + '/update',
                    destroy: config.moduleName+'/' + usedUrl + '/delete'
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
    createStore: function(id, idProperty, extraParams) {
        var me = this;
        var idP = typeof idProperty === "undefined" ? "kosong_id" : idProperty;
        var eP = typeof extraParams === "undefined" ? null : extraParams;

        var x = null;
        if (eP !== null) {
            x = me.instantStore({
                id: id,
                idProperty: idP,
                extraParams: eP
            });
        } else {
            x = me.instantStore({
                id: id,
                idProperty: idP
            });
        }
        //me.store = x;
        // me.el.reconfigure(x);
        me.el.bindStore(x);
    }
});