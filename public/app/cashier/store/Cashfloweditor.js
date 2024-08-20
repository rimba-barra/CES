Ext.define('Cashier.store.Cashfloweditor', {
    extend: 'Ext.data.Store',
    alias: 'store.cashfloweditorstore',
    requires: [
        'Cashier.model.Cashfloweditor'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CashfloweditorStore',
            model: 'Cashier.model.Cashfloweditor',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/cashfloweditor/read',
                    create: 'cashier/cashfloweditor/create',
                    update: 'cashier/cashfloweditor/update',
                    destroy: 'cashier/cashfloweditor/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'journaldetail_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams: {
                    'hideparam': 'default'
                }
            }
        }, cfg)]);
    }
});