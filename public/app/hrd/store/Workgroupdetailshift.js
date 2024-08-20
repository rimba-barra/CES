Ext.define('Hrd.store.Workgroupdetailshift', {
    extend: 'Ext.data.Store',
    alias: 'store.workgroupdetailshiftstore',
    requires: [
        'Hrd.model.Workgroupdetailshift'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WorkgroupdetailshiftStore',
                model: 'Hrd.model.Workgroupdetailshift',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/workgroupemployee/readdetailshift',
                        create: 'hrd/workgroupemployee/createdetailshift',
                        update: 'hrd/workgroupemployee/updatedetailshift',
                        destroy: 'hrd/workgroupemployee/deletedetailshift'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'workgroupdetailshift_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'default'
                    }
                }
            }, cfg)]);
    }
});