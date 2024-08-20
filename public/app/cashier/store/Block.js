Ext.define('Cashier.store.Block', {
    extend  : 'Ext.data.Store',
    alias   : 'store.blockstore',
    requires: [
        'Cashier.model.Block'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'BlockStore',
            model  : 'Cashier.model.Block',
            sorters: [
                { property: 'block', direction: 'ASC' }
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
                    idProperty   : 'block_id',
                    totalProperty: 'total'
                },
                writer: {
                    type  : 'json',
                    encode: true,
                    root  : 'data'
                },
                extraParams: {
                    mode_read: 'combobox',
                    hideparam: 'getblock'
                }
            }
        }, cfg)]);
    }
});