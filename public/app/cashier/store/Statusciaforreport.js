Ext.define('Cashier.store.Statusciaforreport', {
    extend: 'Ext.data.Store',
    alias: 'store.statusciaforreportstore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'statusdata', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Statusciaforreport',
                data: [
                    {"status_id": 1, "statusdata": "ALL", "description": "ALL DATA"},
                    {"status_id": 2, "statusdata": "PROCESSED", "description": "PROCESSED"},
                    {"status_id": 3, "statusdata": "BEINGPROCESSED", "description": "BEING PROCESSED"},
                    {"status_id": 4, "statusdata": "UNPROCESSED", "description": "UNPROCESSED"},
                ],
            }, cfg)]);
    }
});