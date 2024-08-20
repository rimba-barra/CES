Ext.define('Erems.store.Historysuratperingatan', {
    extend: 'Ext.data.Store',
    alias: 'store.historysuratperingatanstore',
    requires: [
        'Erems.model.Historysuratperingatan'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'HistorysuratperingatanStore',
            model: 'Erems.model.Historysuratperingatan',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/historysuratperingatan/read',
                    create: 'erems/historysuratperingatan/create',
                    update: 'erems/historysuratperingatan/update',
                    destroy: 'erems/historysuratperingatan/delete'
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