Ext.define('Cashier.store.Consolesupport', {
    extend: 'Ext.data.Store',
    alias: 'store.consolesupportstore',
    requires: [
        'Cashier.model.Consolesupport'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'consolesupportStore',
                model: 'Cashier.model.Consolesupport',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/consolesupport/read',
                        create: 'cashier/consolesupport/create',
                        update: 'cashier/consolesupport/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
                        root: 'data'
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