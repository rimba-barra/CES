Ext.define('Erems.store.Statuscombo', {
    extend: 'Ext.data.Store',
    alias: 'store.statuscombostore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'status', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatuscomboStore',
                data: [
                    {"status_id": 1,"status": "K", "description": "CASH"},
                    {"status_id": 2,"status": "B", "description": "BANK"},
                ],
            }, cfg)]);
    }
});