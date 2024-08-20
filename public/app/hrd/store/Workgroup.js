Ext.define('Hrd.store.Workgroup', {
    extend: 'Ext.data.Store',
    alias: 'store.workgroupstore',
    requires: [
        'Hrd.model.Workgroup'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WorkgroupStore',
                model: 'Hrd.model.Workgroup',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/workgroupemployee/read',
                        create: 'hrd/workgroupemployee/create',
                        update: 'hrd/workgroupemployee/update',
                        destroy: 'hrd/workgroupemployee/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'workgroup_id',
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