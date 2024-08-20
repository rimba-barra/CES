Ext.define('Erems.store.Mastercomplainttype', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercomplainttypestore',
    requires: [
        'Erems.model.Mastercomplainttype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercomplainttypeStore',
                model: 'Erems.model.Mastercomplainttype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercomplainttype/read',
                        create: 'erems/mastercomplainttype/create',
                        update: 'erems/mastercomplainttype/update',
                        destroy: 'erems/mastercomplainttype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'complainttype_id',
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