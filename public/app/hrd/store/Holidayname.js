Ext.define('Hrd.store.Holidayname', {
    extend: 'Ext.data.Store',
    alias: 'store.holidaynamestore',
    requires: [
        'Hrd.model.Holidayname'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'HolidaynameStore',
                model: 'Hrd.model.Holidayname',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        // create: 'POST',
                        // update: 'POST',
                        // destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterharibesar/read',
                        // create: 'hrd/common/create',
                        // update: 'hrd/common/update',
                        // destroy: 'hrd/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'holiday_name_id',
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'holidayname'
                    }
                }
            }, cfg)]);
    }
});