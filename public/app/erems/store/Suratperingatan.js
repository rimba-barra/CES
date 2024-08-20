Ext.define('Erems.store.Suratperingatan', {
    extend: 'Ext.data.Store',
    alias: 'store.suratperingatanstore',
    requires: [
        'Erems.model.Suratperingatan'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'SuratperingatanStore',
            model: 'Erems.model.Suratperingatan',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/suratperingatan/read',
                    create: 'erems/suratperingatan/create',
                    update: 'erems/suratperingatan/update',
                    destroy: 'erems/suratperingatan/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'suratperingatan_id',
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