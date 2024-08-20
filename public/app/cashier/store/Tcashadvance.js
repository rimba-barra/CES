Ext.define('Cashier.store.Tcashadvance', {
    extend: 'Ext.data.Store',
    alias: 'store.tcashadvancestore',
    requires: [
        'Cashier.model.Tcashadvance'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TcashadvanceStore',
                model: 'Cashier.model.Tcashadvance',
//                sorters: [{
//                        property: 'voucher_no',
//                        direction: 'DESC'
//                    },
//                    {
//                        property: 'accept_date',
//                        direction: 'DESC'
//                    }
//                ],
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
                        read: 'cashier/tcashadvance/read',
                        create: 'cashier/tcashadvance/create',
                        update: 'cashier/tcashadvance/update',
                        destroy: 'cashier/tcashadvance/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbon_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        project_id:apps.project                      
                    }
                }
            }, cfg)]);
    }
});