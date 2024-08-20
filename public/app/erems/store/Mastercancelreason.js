Ext.define('Erems.store.Mastercancelreason', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercancelreasonstore',
    requires: [
        'Erems.model.Mastercancelreason'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercancelreasonStore',
                model: 'Erems.model.Mastercancelreason',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercancelreason/read',
                        create: 'erems/mastercancelreason/create',
                        update: 'erems/mastercancelreason/update',
                        destroy: 'erems/mastercancelreason/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'cancelreason_id',
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