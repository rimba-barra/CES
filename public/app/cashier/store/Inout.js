    Ext.define('Cashier.store.Inout', {
    extend: 'Ext.data.Store',
    alias: 'store.inoutstore',
    fields: [
        {name: 'inout_id', type: 'int'},
        {name: 'in_out', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'InoutStore',
                data: [
                    {"inout_id": 1,"in_out": "I", "description": "IN"},
                    {"status_id": 2,"in_out": "O", "description": "OUT"},
                ],
            }, cfg)]);
    }
});