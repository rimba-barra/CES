Ext.define('Cashier.store.Ptbydefaultproject', {
    extend: 'Ext.data.Store',
    alias: 'store.ptstore',
    requires: [
        'Cashier.model.Projectpt'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtbydefaultprojectStore',
                model: 'Cashier.model.Projectpt',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'pt_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'ptbydefaultproject',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});