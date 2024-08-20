Ext.define('Erems.store.Masterpurposebuy', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpurposebuystore',
    requires: [
        'Erems.model.Masterpurposebuy'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpurposebuyStore',
                model: 'Erems.model.Masterpurposebuy',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pengalihanhak/read',
                        create: 'erems/masterpurposebuy/create',
                        update: 'erems/masterpurposebuy/update',
                        destroy: 'erems/masterpurposebuy/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purposebuy_id',
                        root: 'data'
                    },
                    extraParams: {
                        read_type_mode : 'purposebuy'
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