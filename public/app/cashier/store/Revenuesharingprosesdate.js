Ext.define('Cashier.store.Revenuesharingprosesdate', {
    extend  : 'Ext.data.Store',
    alias   : 'store.revenuesharingprosesdatestore',
    requires: [
        'Cashier.model.Revenuesharingprosesdate'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'RevenuesharingprosesdateStore',
            model  : 'Cashier.model.Revenuesharingprosesdate',
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
                    idProperty: 'revenuesharing_id',
                    root      : 'data'
                },
                extraParams: {
                    read_type_mode: 'th_revenuesharing'
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