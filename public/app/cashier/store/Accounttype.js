Ext.define('Cashier.store.Accounttype', {
    extend: 'Ext.data.Store',
    alias: 'store.accounttypestore',
    requires: [
        'Cashier.model.Accounttype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'AccounttypeStore',
            model: 'Cashier.model.Accounttype',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/common/read',
                },
                reader: {
                    type: 'json',
                    idProperty: 'account_type_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParam: {
                    hideparam: 'getaccounttype'
                }
            }
        }, cfg)]);
    }
});