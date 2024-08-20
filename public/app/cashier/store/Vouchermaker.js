Ext.define('Cashier.store.Vouchermaker', {
    extend  : 'Ext.data.Store',
    alias   : 'store.vouchermakerstore',
    requires: [
        'Cashier.model.Vouchermaker'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VouchermakerStore',
                model  : 'Cashier.model.Vouchermaker',
                proxy  : {
                    type         : 'ajax',
                    timeout      : 45000000,
                    actionMethods: {
                        read   : 'POST',
                        create : 'POST',
                        update : 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read   : 'cashier/common/read',
                        create : 'cashier/common/create',
                        update : 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type         : 'json',
                        root         : 'data',
                        idProperty   : 'addby',
                        totalProperty: 'total'
                    },
                    writer: {
                        type  : 'json',
                        encode: true,
                        root  : 'data'
                    },
                    extraParams: {
                        hideparam : 'getvouchermaker',
                        start     : 0,
                        limit     : 1000,
                    }
                }
            }, cfg)]);
    }
});