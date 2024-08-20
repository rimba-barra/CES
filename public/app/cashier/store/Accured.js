    Ext.define('Cashier.store.Accured', {
    extend: 'Ext.data.Store',
    alias: 'store.accuredstore',
    fields: [
        {name: 'accured_id', type: 'int'},
        {name: 'chequegiro_accured', type: 'int'},
        {name: 'description', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AccuratedStore',
                data: [
                    {"accured_id": 1,"chequegiro_accured":1,"description": "Accured"},
                    {"accured_id": 2,"chequegiro_accured":2, "description":"Not Accured"},
                ],
            }, cfg)]);
    }
});