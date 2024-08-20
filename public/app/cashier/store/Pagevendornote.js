Ext.define('Cashier.store.Pagevendornote', {
    extend: 'Ext.data.Store',
    alias: 'store.pagevendornotestore',
    requires: [
        'Cashier.model.Vendornote'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PagevendornoteStore',
                model: 'Cashier.model.Vendornote',
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                    reader: {
                        rootProperty: 'data',
                        totalProperty: 'total'
                    },
                    pageSize: 10

                }
            }, cfg)]);
    }
});
