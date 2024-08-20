Ext.define('Cashier.store.Journalcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.journalcombostore',
    requires: [
        'Cashier.model.Journal'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JournalcomboStore',
                model: 'Cashier.model.Journal',
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
                        idProperty: 'journal_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getjournalbyprojectpt',
                        start: 0,
                        limit: 1000,

                    },
                },
                // filters: [
                //     {property: 'is_cashier', value: false}
                // ]
            }, cfg)]);
    }
});