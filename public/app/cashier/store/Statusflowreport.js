Ext.define('Cashier.store.Statusflowreport', {
    extend: 'Ext.data.Store',
    alias: 'store.Statusflowreportstore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'statusdata', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Statusflowreport',
                data: [
                    {"status_id": 1, "statusdata": "ALL", "description": "ALL DATA"},
                    {"status_id": 2, "statusdata": "I", "description": "IN"},
                    {"status_id": 3, "statusdata": "O", "description": "OUT"},
                ],
            }, cfg)]);
    }
});