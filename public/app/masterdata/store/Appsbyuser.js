Ext.define('Masterdata.store.Appsbyuser', {
    extend: 'Ext.data.Store',
    alias: 'store.AppsbyuserStore',

    requires: [
        'Masterdata.model.Appsbyuser'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Appsbyuserstore',
            model: 'Masterdata.model.Appsbyuser',
            proxy: {
                type: 'ajax',
                timeout:4500000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/appsbyuser/read'
                },
                reader: {
                    type: 'json',
                    idProperty: 'apps_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});