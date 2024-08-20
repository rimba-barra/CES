Ext.define('Cashier.store.Ptbyusermulti', {
    extend: 'Ext.data.Store',
    alias: 'store.ptbyusermultistore',
    requires: [
        'Cashier.model.Projectpt'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtbyuserStore',
                model: 'Cashier.model.Projectpt',
                sorters: [{
                    property: 'projectname',
                    direction: 'ASC'
                }],
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                       
                    },
                    api: {
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'projectpt_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'getptbyuserid',
                        project_id: apps.project,
                        user_id: apps.uid,
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});