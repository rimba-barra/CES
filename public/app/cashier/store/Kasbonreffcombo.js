Ext.define('Cashier.store.Kasbonreffcombo', {
    extend  : 'Ext.data.Store',
    alias   : 'store.Kasbonreffcombostore',
    requires: [
        'Cashier.model.Kasbonreff'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbonreffStore',
                model  : 'Cashier.model.Kasbonreff',
                sorters: [
                    {property: 'kasbondept_id', direction: 'DESC'}
                ],
                proxy: {
                    type         : 'ajax',
                    timeout      : 45000000,
                    actionMethods: {
                        read   : 'POST',
                        create : 'POST',
                        update : 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read   : 'cashier/kasbondept/read',
                        create : 'cashier/kasbondept/create',
                        update : 'cashier/kasbondept/update',
                        destroy: 'cashier/kasbondept/delete'
                    },
                    reader: {
                        type         : 'json',
                        root         : 'data',
                        idProperty   : 'kasbondept_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type  : 'json',
                        encode: true,
                        root  : 'data'
                    },
                    extraParams: {
                        hideparam    : 'getreferencecashbon',
                        project_id   : 0,
                        pt_id        : 0,
                        department_id: 0,
                        kasbondept_id: 0
                    }
                }
            }, cfg)]);
    }
});