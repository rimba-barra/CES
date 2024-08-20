Ext.define('Erems.store.Documentupload', {
    extend: 'Ext.data.Store',
    alias: 'store.documentuploadstore',
    requires: [
        'Erems.model.Documentupload'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DocumentuploadStore',
                model: 'Erems.model.Documentupload',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/documentupload/read',
                        create: 'erems/documentupload/create',
                        update: 'erems/documentupload/update',
                        destroy: 'erems/documentupload/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sppjb_doc_id',
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