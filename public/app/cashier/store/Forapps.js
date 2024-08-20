Ext.define('Cashier.store.Forapps', {
    extend: 'Ext.data.Store',
    alias: 'store.forappsstore',
    fields: [
        {name: 'for_apps_id', type: 'int'},
        {name: 'appscode', type: 'string'},
        {name: 'apps', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ForappsStore',
                data: [
                    {"for_apps_id": 1, "appscode": 'web', "apps": 'Web Based'},
                    {"for_apps_id": 2, "appscode": 'desktop', "apps": 'Desktop'},
                ],
            }, cfg)]);
    }
});