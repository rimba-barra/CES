Ext.define('Cashier.store.Statusall', {
    extend: 'Ext.data.Store',
    alias: 'store.statusallstore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatusallStore',
                data: [
                    {"status_id": 1,"status": "ALL", "description": "ALL"},
                    {"status_id": 2,"status": "OPEN", "description": "OPEN"},
                    {"status_id": 3,"status": "APPROVE", "description": "APPROVE"},
                    {"status_id": 4,"status": "CLOSE", "description": "CLOSE"},
                ],
            }, cfg)]);
    }
});