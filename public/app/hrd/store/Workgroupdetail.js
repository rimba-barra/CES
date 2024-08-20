Ext.define('Hrd.store.Workgroupdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.workgroupdetailstore',
    requires: [
        'Hrd.model.Workgroupdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WorkgroupdetailStore',
                model: 'Hrd.model.Workgroupdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/workgroupemployee/readdetail',
                        create: 'hrd/workgroupemployee/createdetail',
                        update: 'hrd/workgroupemployee/updatedetail',
                        destroy: 'hrd/workgroupemployee/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'workgroupdetail_id',
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