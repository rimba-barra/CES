Ext.define('Cashier.store.Revenuesharingprosesdetail', {
    extend  : 'Ext.data.Store',
    alias   : 'store.revenuesharingprosesdetailstore',
    requires: [
        'Cashier.model.Revenuesharingprosesdetail'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'RevenuesharingprosesdetailStore',
            model  : 'Cashier.model.Revenuesharingprosesdetail',
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
                    idProperty: 'revenuesharing_detail_id',
                    root      : 'data'
                },
                extraParams: {
                    read_type_mode: 'td_revenuesharing_detail'
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