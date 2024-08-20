Ext.define('Cashier.store.Mastercluster', {
    extend  : 'Ext.data.Store',
    alias   : 'store.masterclusterstore',
    requires: [
        'Cashier.model.Mastercluster'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MasterclusterStore',
            model  : 'Cashier.model.Mastercluster',
            sorters: [
                { property: 'cluster', direction: 'ASC' }
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
                    read   : 'cashier/common/read',
                    create : 'cashier/common/create',
                    update : 'cashier/common/update',
                    destroy: 'cashier/common/delete'
                },
                reader: {
                    type         : 'json',
                    root         : 'data',
                    idProperty   : 'cluster_id',
                    totalProperty: 'total'
                },
                writer: {
                    type  : 'json',
                    encode: true,
                    root  : 'data'
                },
                extraParams: {
                    mode_read: 'combobox',
                    hideparam: 'getcluster'
                }
            }
        }, cfg)]);
    }
});