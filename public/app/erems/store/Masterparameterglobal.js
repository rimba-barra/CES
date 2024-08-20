Ext.define('Erems.store.Masterparameterglobal', {
    extend: 'Ext.data.Store',
    alias: 'store.masterparameterglobalstore',
    requires: [
        'Erems.model.Masterparameterglobal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterparameterglobalStore',
                model: 'Erems.model.Masterparameterglobal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterparameterglobal/read',
                        create: 'erems/masterparameterglobal/create',
                        update: 'erems/masterparameterglobal/update',
                        destroy: 'erems/masterparameterglobal/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'parameter_id',
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