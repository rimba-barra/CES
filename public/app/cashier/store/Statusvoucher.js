Ext.define('Cashier.store.Statusvoucher', {
    extend: 'Ext.data.Store',
    alias: 'store.statusvoucherstore',
    fields: [
        {name: 'status', type: 'int'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatusvoucherStore',
                data: [
                    {"status": 1, "description": "OPEN"},
                    {"status": 2, "description": "APPROVE"},
                    {"status": 3, "description": "PAID"},
                    {"status": 4, "description": "PAID (REALIZED)"}
                ],
            }, cfg)]);
    }
});