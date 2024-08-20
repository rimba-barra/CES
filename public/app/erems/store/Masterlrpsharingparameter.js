Ext.define('Erems.store.Masterlrpsharingparameter', {
    extend: 'Ext.data.Store',
    alias: 'store.masterlrpsharingparameterstore',
    requires: [
        'Erems.model.Masterlrpsharingparameter'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterlrpsharingparameterStore',
                model: 'Erems.model.Masterlrpsharingparameter',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterlrpsharingparameter/read',
                        create: 'erems/masterlrpsharingparameter/create',
                        update: 'erems/masterlrpsharingparameter/update',
                        destroy: 'erems/masterlrpsharingparameter/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'lrp_sharingparameter_id',
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