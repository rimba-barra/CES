Ext.define('Erems.store.Mastercontractor', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercontractorstore',
    requires: [
        'Erems.model.Mastercontractor'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercontractorStore',
                model: 'Erems.model.Mastercontractor',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercontractor/read',
                        create: 'erems/mastercontractor/create',
                        update: 'erems/mastercontractor/update',
                        destroy: 'erems/mastercontractor/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'contractor_id',
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