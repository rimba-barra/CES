Ext.define('Cashier.store.Tipevendorvoucher', {
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
                storeId: 'Tipevendorvoucher',
                data: [
                    {"type_vendor": "internal", "description": "Internal Data"},
                    {"type_vendor": "external", "description": "External Data"},
                    {"type_vendor": "customer", "description": "Customer"},
                    {"type_vendor": "tenant", "description": "Tenant"},
                    {"type_vendor": "all", "description": "All Data"},
                ],
            }, cfg)]);
    }
});