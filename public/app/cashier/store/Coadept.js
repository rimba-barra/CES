Ext.define('Cashier.store.Coadept', {
    extend: 'Ext.data.Store',
    alias: 'store.coadeptstore',
    requires: [
        'Cashier.model.Coadept'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoadeptStore',
                model: 'Cashier.model.Coadept',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/coadept/read',
                        create: 'cashier/coadept/create',
                        update: 'cashier/coadept/update',
                        destroy: 'cashier/coadept/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'coadept_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});