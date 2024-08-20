Ext.define('Cashier.store.Statusloan', {
    extend: 'Ext.data.Store',
    alias: 'store.statusloanstore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Statusloan',
                data: [
                    {"status_id": 1, "status": "O", "description": "Open"},
                    {"status_id": 2, "status": "C", "description": "Close"},
                ],
            }, cfg)]);
    }
});