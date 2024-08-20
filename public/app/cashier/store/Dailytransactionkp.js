Ext.define('Cashier.store.Dailytransactionkp', {
    extend: 'Ext.data.Store',
    alias: 'store.dailytransactionkpstore',
    requires: [
        'Cashier.model.Dailytransactionkp'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'DailytransactionkpStore',
            model: 'Cashier.model.Dailytransactionkp',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/dailytransactionkp/read',
                    create: 'cashier/dailytransactionkp/create',
                    update: 'cashier/dailytransactionkp/update',
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
                },
                extraParams: {
                    hideparam: 'getdatadailytransaction'
                }
            }
        }, cfg)]);
    }
});