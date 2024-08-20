Ext.define('Erems.store.Masterutilitytype', {
    extend: 'Ext.data.Store',
    alias: 'store.masterutilitytypestore',
    requires: [
        'Erems.model.Masterutilitytype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterutilitytypeStore',
                model: 'Erems.model.Masterutilitytype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterutilitytype/read',
                        create: 'erems/masterutilitytype/create',
                        update: 'erems/masterutilitytype/update',
                        destroy: 'erems/masterutilitytype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'utilitytype_id',
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