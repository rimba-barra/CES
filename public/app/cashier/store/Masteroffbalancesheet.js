Ext.define('Cashier.store.Masteroffbalancesheet', {
    extend: 'Ext.data.Store',
    alias: 'store.masteroffbalancesheet',
    requires: [
        'Cashier.model.Masteroffbalancesheet'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasteroffbalancesheetStore',
                model: 'Cashier.model.Masteroffbalancesheet',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masteroffbalancesheet/read',
                        create: 'cashier/masteroffbalancesheet/create',
                        update: 'cashier/masteroffbalancesheet/update',
                        destroy: 'cashier/masteroffbalancesheet/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'off_balancesheet_id',
                        root: 'data'
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