Ext.define('Hrd.store.Checked', {
    extend: 'Ext.data.Store',
    alias: 'store.checked',
    fields: [
        {name: 'hrd_checked', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CheckedStore',
                data: [
                    {"hrd_checked": 'YES'},
                    {"hrd_checked": 'NO'},
                ],
            }, cfg)]);
    }
});