Ext.define('Erems.store.Mastertype', {
    extend: 'Ext.data.Store',
    alias: 'store.mastertypestore',
    requires: [
        'Erems.model.Mastertype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastertypeStore',
                model: 'Erems.model.Mastertype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastertype/read',
                        create: 'erems/mastertype/create',
                        update: 'erems/mastertype/update',
                        destroy: 'erems/mastertype/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'type_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
					extraParams: {
                        mode_read          : 'all',
                        productcategory_id : '',
                        cluster_id         : '',
                        name               : '',
                        bot_electricity    : 0,
                        top_electricity    : 0,
                        bot_land_size      : 0,
                        top_land_size      : 0,
                        bot_floor          : 0,
                        top_floor          : 0,
                        bot_building_size  : 0,
                        top_building_size  : 0,
                        bot_bedroom        : 0,
                        top_bedroom        : 0,
                        bot_floor_size     : 0,
                        top_floor_size     : 0,
                        bot_bathroom       : 0,
                        top_bathroom       : 0
					},
                }
            }, cfg)]);
    }
});