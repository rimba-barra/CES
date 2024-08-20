Ext.define('Erems.store.Formundanganajb', {
    extend: 'Ext.data.Store',
    alias: 'store.formundanganajbstore',
    requires: [
        'Erems.model.Formundanganajb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FormundanganajbStore',
                model: 'Erems.model.Formundanganajb',
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
                        idProperty: 'hgbajb_id',
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