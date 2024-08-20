Ext.define('Erems.store.Customerschedulebll', {
    extend: 'Ext.data.Store',
    alias: 'store.customerschedulebllstore',
    requires: [
        'Erems.model.Schedulebiayalainlain'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CustomerschedulebllStore',
                model: 'Erems.model.Schedulebiayalainlain',
                proxy: {
                    timeout: 60000*5,
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        // create: 'POST',
                        // update: 'POST',
                        // destroy: 'POST'
                    },
                    api: {
                        read: 'erems/schedulebiayalainlain/read',
                        // create: 'erems/purchaseletter/create',
                        // update: 'erems/purchaseletter/update',
                        // destroy: 'erems/purchaseletter/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'customer_id',
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'customer_bll'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});