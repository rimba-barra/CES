Ext.define('Gl.store.Groupsubaccount', {
    extend: 'Ext.data.Store',
    alias: 'store.groupsubaccountstore',
    requires: [
        'Gl.model.Groupsubaccount'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GroupsubaccountStore',
                model: 'Gl.model.Groupsubaccount',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/groupsubaccount/read',
                        create: 'gl/groupsubaccount/create',
                        update: 'gl/groupsubaccount/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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