Ext.define('Erems.store.Facilitiestype', {
    extend: 'Ext.data.Store',
    alias: 'store.facilitiestypestore',
    requires: [
        'Erems.model.Facilitiestype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FacilitiestypeStore',
                model: 'Erems.model.Facilitiestype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/facilitiestype/read',
                        create: 'erems/facilitiestype/create',
                        update: 'erems/facilitiestype/update',
                        destroy: 'erems/facilitiestype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'facilitiestype_id',
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