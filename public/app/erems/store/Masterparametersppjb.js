Ext.define('Erems.store.Masterparametersppjb', {
    extend: 'Ext.data.Store',
    alias: 'store.masterparametersppjbstore',
    requires: [
        'Erems.model.Masterparametersppjb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterparametersppjbStore',
                model: 'Erems.model.Masterparametersppjb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterparametersppjb/read',
                        create: 'erems/masterparametersppjb/create',
                        update: 'erems/masterparametersppjb/update',
                        destroy: 'erems/masterparametersppjb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'parametersppjb_id',
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