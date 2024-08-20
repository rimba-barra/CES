Ext.define('Erems.store.Masterpurpose', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpurposestore',
    requires: [
        'Erems.model.Masterpurpose'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpurposeStore',
                model: 'Erems.model.Masterpurpose',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterpurpose/read',
                        create: 'erems/masterpurpose/create',
                        update: 'erems/masterpurpose/update',
                        destroy: 'erems/masterpurpose/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purpose_id',
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