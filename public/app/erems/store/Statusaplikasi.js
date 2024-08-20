Ext.define('Erems.store.Statusaplikasi', {
    extend: 'Ext.data.Store',
    alias: 'store.statusaplikasistore',
    fields: [
        {name: 'status_aplikasi', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatusaplikasiStore',
                data: [
                    {"status_aplikasi": "new", "description": "New"},
                    {"status_aplikasi": "update", "description": "Update"},
                    {"status_aplikasi": "cancel", "description": "Cancel"},
                ],
            }, cfg)]);
    }
});