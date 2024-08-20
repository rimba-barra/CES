Ext.define('Erems.store.Complaintsurat', {
    extend: 'Ext.data.Store',
    alias: 'store.complaintsuratstore',
    requires: [
        'Erems.model.Complaintsurat'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplaintsuratStore',
                model: 'Erems.model.Complaintsurat',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/complaint/readsurat',
                        create: 'erems/complaint/createsurat',
                        update: 'erems/complaint/updatesurat',
                        destroy: 'erems/complaint/deletesurat'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'aftersales_surat_id',
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