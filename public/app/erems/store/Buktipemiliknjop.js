Ext.define('Erems.store.Buktipemiliknjop', {
    extend: 'Ext.data.Store',
    alias: 'store.buktipemiliknjopstore',
    requires: [
        'Erems.model.Buktipemiliknjop'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BuktipemiliknjopStore',
                model: 'Erems.model.Buktipemiliknjop',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/buktipemiliknjop/read',
                        create: 'erems/buktipemiliknjop/create',
                        update: 'erems/buktipemiliknjop/update',
                        destroy: 'erems/buktipemiliknjop/delete'
                    },
                    reader: {
                        type: 'json',
                        // idProperty: 'unit_id',
                        idProperty: 'njop_id',
                        root: 'data'
                    },
                    extraParams: {
                        unit_id: ''
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