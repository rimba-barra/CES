Ext.define('Cashier.store.Statuscia', {
    extend: 'Ext.data.Store',
    alias: 'store.statusciastore',
    fields: [
        {name: 'status_id', type: 'int'},
        {name: 'statusdata', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Statuscia',
                data: [
                    {"status_id": 1, "statusdata": "UNPROCESS", "description": "UNPROCESS"},
                    {"status_id": 2, "statusdata": "BEINGPROCESSED", "description": "BEING PROCESSED"},
                ],
            }, cfg)]);
    }
});