Ext.define('Cashier.store.Masterbanktype', {
    extend: 'Ext.data.Store',
    alias: 'store.masterbanktypestore',
    requires: [
        'Cashier.model.Masterbanktype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MasterbanktypeStore',
            model: 'Cashier.model.Masterbanktype',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/masterbanktype/read',
                    create: 'cashier/masterbanktype/create',
                    update: 'cashier/masterbanktype/update',
                    destroy: 'cashier/masterbanktype/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'banktype_id',
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