Ext.define('Cashier.store.Statuskasbankforreport', {
    extend: 'Ext.data.Store',
    alias: 'store.statuskasbankforreportstore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'statusdata', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Statuskasbankforreport',
                data: [
                    {"status_id": 1, "statusdata": "ALL", "description": "ALL DATA"},
                    {"status_id": 2, "statusdata": "KAS", "description": "CASH"},
                    {"status_id": 3, "statusdata": "BANK", "description": "BANK"},
                ],
            }, cfg)]);
    }
});