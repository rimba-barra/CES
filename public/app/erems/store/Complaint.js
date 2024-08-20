Ext.define('Erems.store.Complaint', {
    extend: 'Ext.data.Store',
    alias: 'store.complaintstore',
    requires: [
        'Erems.model.Complaint'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplaintStore',
                model: 'Erems.model.Complaint',
                proxy: {
                    type: 'ajax',
					timeout:4500000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/complaint/read',
                        create: 'erems/complaint/create',
                        update: 'erems/complaint/update',
                        destroy: 'erems/complaint/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'marketstock_id',
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