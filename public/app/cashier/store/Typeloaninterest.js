Ext.define('Cashier.store.Typeloaninterest', {
    extend: 'Ext.data.Store',
    alias: 'store.typeloanintereststore',
    requires: [
        'Cashier.model.Typeloaninterest'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TypeloaninterestStore',
                model: 'Cashier.model.Typeloaninterest',
                proxy: {
                    type: 'ajax',
                     timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/typeloan/typeloaninterestread',
                        create: 'cashier/typeloan/typeloaninterestcreate',
                        update: 'cashier/typeloan/typeloaninterestupdate',
                        destroy: 'cashier/typeloan/typeloaninterestdelete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'typeloaninterest_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});