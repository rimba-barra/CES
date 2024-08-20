Ext.define('Erems.store.Warningjatuhtempo', {
    extend: 'Ext.data.Store',
    alias: 'store.warningjatuhtempostore',
    requires: [
        'Erems.model.Warningjatuhtempo'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WarningjatuhtempoStore',
                model: 'Erems.model.Warningjatuhtempo',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/warningjatuhtempo/read',
                        create: 'erems/warningjatuhtempo/create',
                        update: 'erems/warningjatuhtempo/create',
                        destroy: 'erems/warningjatuhtempo/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'schedule_id',
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