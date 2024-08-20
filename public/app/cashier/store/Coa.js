Ext.define('Cashier.store.Coa', {
    extend: 'Ext.data.Store',
    alias: 'store.coastore',
    requires: [
        'Cashier.model.Coa'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoaStore',
                model: 'Cashier.model.Coa',
                pageSize: 1000,
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
                        root: 'data',
                        idProperty: 'coa_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encoacombo: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getcoabyprojectpt',
                        project_id:0,
                        pt_id: 0,
                        start: 0,
                        limit: 1000,
                    },
                    
                }
            }, cfg)]);
    }
});