Ext.define('Erems.store.Formundanganajbdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.FormundanganajbdetailStore',
//    requires: [
//        'Erems.model.Formundanganajbdetail'
//    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FormundanganajbdetailStore',
                model: 'Erems.model.Formundanganajbdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/formundanganajb/read',
                        create: 'erems/formundanganajb/create',
                        update: 'erems/formundanganajb/update',
                        destroy: 'erems/formundanganajb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'hgbajb_undangan_id',
                        root: 'data'
                    },
                    extraParams: {
                        read_type_mode: 'detail'
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