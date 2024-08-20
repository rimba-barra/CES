Ext.define('Cashier.store.Tcashbon', {
    extend: 'Ext.data.Store',
    alias: 'store.tcashbonstore',
    requires: [
        'Cashier.model.Tcashbon'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TcashbonStore',
                model: 'Cashier.model.Tcashbon',
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
                        read: 'cashier/tcash/outtransbonread',
                        create: 'cashier/tcash/outtransboncreate',
                        update: 'cashier/tcash/outtransbonupdate',
                        destroy: 'cashier/tcash/outtransbondelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbank_kasbon_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        project_id:apps.project,
                       
                    }
                }
            }, cfg)]);
    }
});