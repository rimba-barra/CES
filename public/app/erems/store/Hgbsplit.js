Ext.define('Erems.store.Hgbsplit', {
    extend: 'Ext.data.Store',
    alias: 'store.hgbsplitstore',
    requires: [
        'Erems.model.Hgbsplit'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'HgbsplitStore',
                model: 'Erems.model.Hgbsplit',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/hgbsplit/read',
                        create: 'erems/hgbsplit/create',
                        update: 'erems/hgbsplit/update',
                        destroy: 'erems/hgbsplit/delete'
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