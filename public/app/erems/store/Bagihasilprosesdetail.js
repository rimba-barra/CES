Ext.define('Erems.store.Bagihasilprosesdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.bagihasilprosesdetailstore',
    requires: [
        'Erems.model.Bagihasilprosesdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BagihasilprosesdetailStore',
                model: 'Erems.model.Bagihasilprosesdetail',
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
                        idProperty: 'lrp_detail_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'td_lrp_detail'
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