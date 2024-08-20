Ext.define('Cashier.store.Revenuesharingpurchaseletterdetail', {
    extend  : 'Ext.data.Store',
    alias   : 'store.revenuesharingpurchaseletterdetailstore',
    requires: [
        'Cashier.model.Revenuesharingpurchaseletterdetail'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'RevenuesharingpurchaseletterdetailStore',
            model  : 'Cashier.model.Revenuesharingpurchaseletterdetail',
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
                extraParams: {
                    mode: 'purchaseletter_detail'
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
