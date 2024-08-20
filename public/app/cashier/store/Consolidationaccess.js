Ext.define('Cashier.store.Consolidationaccess', {
    extend: 'Ext.data.Store',
    alias: 'store.consolidationaccessstore',
    requires: [
        'Cashier.model.Consolidationaccess'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ConsolidationaccessStore',
            model: 'Cashier.model.Consolidationaccess',
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
                    read: 'cashier/consolidationaccess/read',
                    create: 'cashier/consolidationaccess/create',
                    update: 'cashier/consolidationaccess/update',
                    destroy: 'cashier/consolidationaccess/delete'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    idProperty: 'consolidation_access_id',
                    totalProperty: 'total'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },

            }
        }, cfg)]);
    }
});