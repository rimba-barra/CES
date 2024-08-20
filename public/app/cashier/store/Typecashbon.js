Ext.define('Cashier.store.Typecashbon', {
    extend: 'Ext.data.Store',
    alias: 'store.typecashbonstore',
    fields: [
        {name: 'type_id', type: 'int'},
        {name: 'kasbongiro', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TypecashbonStore',
                data: [
                    {"type_id": 1, "kasbongiro": "CASHBON", "description": "CASHBON CASH"},
                    {"type_id": 2, "kasbongiro": "GIRO", "description": "CASHBON BANK"}
                ],
            }, cfg)]);
    }
});