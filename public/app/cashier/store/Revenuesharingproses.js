Ext.define('Cashier.store.Revenuesharingproses', {
    extend  : 'Ext.data.Store',
    alias   : 'store.revenuesharingprosesstore',
    requires: [
        'Cashier.model.Revenuesharingproses'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'RevenuesharingprosesStore',
            model  : 'Cashier.model.Revenuesharingproses',
            proxy  : {
                type         : 'ajax',
                actionMethods: {
                    read   : 'POST',
                    create : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                api: {
                    read   : 'cashier/revenuesharingproses/read',
                    create : 'cashier/revenuesharingproses/create',
                    update : 'cashier/revenuesharingproses/update',
                    destroy: 'cashier/revenuesharingproses/delete'
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