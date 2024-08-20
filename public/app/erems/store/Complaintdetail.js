Ext.define('Erems.store.Complaintdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.complaintdetailstore',
    requires: [
        'Erems.model.Complaintdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplaintdetailStore',
                model: 'Erems.model.Complaintdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/complaint/readdetail',
                        create: 'erems/complaint/createdetail',
                        update: 'erems/complaint/updatedetail',
                        destroy: 'erems/complaint/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'aftersales_complaint_id',
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