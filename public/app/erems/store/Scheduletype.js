Ext.define('Erems.store.Scheduletype', {
    extend: 'Ext.data.Store',
    alias: 'store.scheduletypestore',
    requires: [
        'Erems.model.Scheduletype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ScheduletypeStore',
                model: 'Erems.model.Scheduletype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/scheduletype/read',
                        create: 'erems/scheduletype/create',
                        update: 'erems/scheduletype/update',
                        destroy: 'erems/scheduletype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'scheduletype_id',
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