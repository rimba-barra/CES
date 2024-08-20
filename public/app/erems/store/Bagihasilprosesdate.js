Ext.define('Erems.store.Bagihasilprosesdate', {
    extend: 'Ext.data.Store',
    alias: 'store.bagihasilprosesdatestore',
    requires: [
        'Erems.model.Bagihasilprosesdate'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BagihasilprosesdateStore',
                model: 'Erems.model.Bagihasilprosesdate',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/bagihasilproses/read',
                        create: 'erems/bagihasilproses/create',
                        update: 'erems/bagihasilproses/update',
                        destroy: 'erems/bagihasilproses/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'lrp_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'th_lrp'
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