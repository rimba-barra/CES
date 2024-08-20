Ext.define('Cashier.store.Revenuesharingprint', {
    extend  : 'Ext.data.Store',
    alias   : 'store.revenuesharingprintstore',
    requires: [
        'Cashier.model.Revenuesharingprint'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'RevenuesharingprintStore',
            model  : 'Cashier.model.Revenuesharingprint',
            proxy  : {
                type         : 'ajax',
                actionMethods: {
                    read   : 'POST',
                    create : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                api: {
                    read   : 'cashier/revenuesharingprint/read',
                    create : 'cashier/revenuesharingprint/create',
                    update : 'cashier/revenuesharingprint/update',
                    destroy: 'cashier/revenuesharingprint/delete'
                },
                reader: {
                    type      : 'json',
                    idProperty: 'revenuesharing_detail_id',
                    root      : 'data'
                },
                writer: {
                    type  : 'json',
                    encode: true,
                    root  : 'data'
                }
            }
        }, cfg)]);
    }
});