Ext.define('Erems.store.Admincollectionschedule', {
    extend: 'Ext.data.Store',
    alias: 'store.admincollectionschedulestore',
    requires: [
        'Erems.model.Admincollectionschedule'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AdmincollectionscheduleStore',
                model: 'Erems.model.Admincollectionschedule',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaselettertb/read',
                        /*create: 'erems/pencairankpr/create',
                        update: 'erems/pencairankpr/update',
                        destroy: 'erems/pencairankpr/delete'*/
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'schedule_id',
                        root: 'data'
                    },
					extraParams: {
						mode_read: 'schedule'
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