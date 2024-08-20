    Ext.define('Cashier.store.Casbonstatus', {
    extend: 'Ext.data.Store',
    alias: 'store.casbonstatusstore',
    fields: [
        {name: 'cashbon_paid_id', type: 'int'},
        {name: 'cashbon_paid', type: 'int'},
        {name: 'cashbon_paid_desc', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CasbonstatusStore',
                data: [
                    {"cashbon_paid_id": 1,"cashbon_paid":1, "cashbon_paid_desc": "YES"},
                    {"cashbon_paid_id": 2,"cashbon_paid":2, "cashbon_paid_desc": "NO"},
                ],
            }, cfg)]);
    }
});