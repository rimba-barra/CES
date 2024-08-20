Ext.define('Cashier.store.Tipevendor', {
    extend: 'Ext.data.Store',
    alias: 'store.tipevendorstore',
    fields: [
        {name: 'type_vendor', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Tipevendor',
                data: [
                    {"type_vendor": "internal", "description": "Internal Data (recommended)"},
                    {"type_vendor": "external", "description": "External Data"},
                    {"type_vendor": "tenant", "description": "Tenant"}
                ],
            }, cfg)]);
    }
});