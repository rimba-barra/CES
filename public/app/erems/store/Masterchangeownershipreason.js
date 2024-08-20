Ext.define('Erems.store.Masterchangeownershipreason', {
    extend: 'Ext.data.Store',
    alias: 'store.masterchangeownershipreasonstore',
    requires: [
        'Erems.model.Masterchangeownershipreason'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterchangeownershipreasonStore',
                model: 'Erems.model.Masterchangeownershipreason',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterchangeownershipreason/read',
                        create: 'erems/masterchangeownershipreason/create',
                        update: 'erems/masterchangeownershipreason/update',
                        destroy: 'erems/masterchangeownershipreason/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changeownershipreason_id',
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