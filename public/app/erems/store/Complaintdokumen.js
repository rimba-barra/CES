Ext.define('Erems.store.Complaintdokumen', {
    extend: 'Ext.data.Store',
    alias: 'store.complaintdokumenstore',
    requires: [
        'Erems.model.Complaintdokumen'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplaintdokumenStore',
                model: 'Erems.model.Complaintdokumen',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/complaint/read',
                        create: 'erems/complaint/createdokumen',
                        update: 'erems/complaint/updatedokumen',
                        destroy: 'erems/complaint/deletedokumen'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'aftersales_dokumenupload',
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