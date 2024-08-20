Ext.define('Cashier.store.Revenuesharing', {
    extend  : 'Ext.data.Store',
    alias   : 'store.revenuesharingstore',
    requires: [
        'Cashier.model.Revenuesharing'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'RevenuesharingStore',
            model  : 'Cashier.model.Revenuesharing',
            proxy  : {
                type         : 'ajax',
                actionMethods: {
                    read   : 'POST',
                    create : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                api: {
                    read   : 'cashier/revenuesharing/read',
                    create : 'cashier/revenuesharing/create',
                    update : 'cashier/revenuesharing/update',
                    destroy: 'cashier/revenuesharing/delete'
                },
                reader: {
                    type      : 'json',
                    idProperty: 'purchaseletter_id',
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