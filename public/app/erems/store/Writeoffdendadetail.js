Ext.define('Erems.store.Writeoffdendadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.writeoffdendadetailstore',
    requires: [
        'Erems.model.Writeoffdendadetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WriteoffdendadetailStore',
                model: 'Erems.model.Writeoffdendadetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/writeoffdenda/readdetail',
                        create: 'erems/writeoffdenda/createdetail',
                        update: 'erems/writeoffdenda/updatedetail',
                        destroy: 'erems/writeoffdenda/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'writeoffdetail_id',
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