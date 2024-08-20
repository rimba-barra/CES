Ext.define('Erems.store.Mastertypeattribute', {
    extend: 'Ext.data.Store',
    alias: 'store.mastertypeattributestore',
    requires: [
        'Erems.model.Mastertypeattribute'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastertypeattributeStore',
                model: 'Erems.model.Mastertypeattribute',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastertype/readdetail',
                        create: 'erems/mastertype/createdetail',
                        update: 'erems/mastertype/updatedetail',
                        destroy: 'erems/mastertype/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'typeattribute_id',
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