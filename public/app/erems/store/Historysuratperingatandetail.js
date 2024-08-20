Ext.define('Erems.store.Historysuratperingatandetail', {
    extend: 'Ext.data.Store',
    alias: 'store.historysuratperingatandetailstore',
    requires: [
        'Erems.model.Historysuratperingatandetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'HistorysuratperingatandetailStore',
            model: 'Erems.model.Historysuratperingatandetail',
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
                    idProperty: 'suratperingatan_detail_id',
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