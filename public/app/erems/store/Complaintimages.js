Ext.define('Erems.store.Complaintimages', {
    extend: 'Ext.data.Store',
    alias: 'store.complaintimagesstore',
    requires: [
        'Erems.model.Complaintimages'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplaintimagesStore',
                model: 'Erems.model.Complaintimages',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/complaint/readimages',
                        create: 'erems/complaint/createimages',
                        update: 'erems/complaint/updateimages',
                        destroy: 'erems/complaint/deleteimages'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'aftersales_complaint_images_id',
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