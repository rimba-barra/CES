Ext.define('Cashier.store.Accounttipepajakcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.accounttipepajakcombostore',
    requires: [
        'Cashier.model.Accounttipepajakcombo'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'AccounttipepajakcomboStore',
            model: 'Cashier.model.Accounttipepajakcombo',
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
                    idProperty: 'coa_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParam: {
                    hideparam: 'accounttipepajak'
                }
            }
        }, cfg)]);
    }
});