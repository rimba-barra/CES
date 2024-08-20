Ext.define('Erems.store.Suratperingatansprdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.suratperingatansprdetailstore',
    requires: [
        'Erems.model.Suratperingatansprdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'SuratperingatansprdetailStore',
            model: 'Erems.model.Suratperingatansprdetail',
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
                    idProperty: 'suratperingatan_detail_id',
                    root: 'data'

                },
                //                    extraParams: {
                //			mode_read: 'load_spr'			
                //                    },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});