Ext.define('Hrd.store.Popuphcms', {
    extend: 'Ext.data.Store',
    alias: 'store.popuphcmsstore',
    requires: [
        'Hrd.model.Popuphcms'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PopuphcmsStore',
                model: 'Hrd.model.Popuphcms',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/popuphcms/read',
                        create: 'hrd/popuphcms/create',
                        update: 'hrd/popuphcms/update',
                        destroy: 'hrd/popuphcms/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        //updated by anas 14032022
                        // idProperty: 'employee_id',
                        idProperty: 'RowNum',
                        //end updated by anas
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