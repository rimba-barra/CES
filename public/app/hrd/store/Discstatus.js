Ext.define('Hrd.store.Discstatus', {
    extend: 'Ext.data.Store',
    alias: 'store.discstatusstore',
    requires: [
        'Hrd.model.Discstatus'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DiscstatusStore',
                model: 'Hrd.model.Discstatus',
                sorters: [
                    {property: 'name', direction: 'ASC'}
                ],
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/disckaryawan/read',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'discstatus_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data',
                    },
                    extraParams: {
                        mode_read: 'discstatus',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});