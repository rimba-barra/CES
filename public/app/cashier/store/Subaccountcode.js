Ext.define('Cashier.store.Subaccountcode', {
    extend: 'Ext.data.Store',
    alias: 'store.subaccountcodestore',   
    requires: [
        'Cashier.model.Subaccountcode'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubaccountcodeStore',
                model: 'Cashier.model.Subaccountcode',
                proxy: {
                    type: 'ajax',                   
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/subaccountcode/read',
                        create: 'cashier/subaccountcode/create',
                        update: 'cashier/subaccountcode/update',
                        destroy: 'cashier/subaccountcode/delete'
                    },
                    reader: {
                        type: 'json',
                       // idProperty: 'subcashier_id',
                       idProperty: 'subgl_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraparam :{
                          hideparam :'default'
                    }
                }
            }, cfg)]);
    }
});