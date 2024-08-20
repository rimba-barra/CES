Ext.define('Gl.store.Accountvssub', {
    extend: 'Ext.data.Store',
    alias: 'store.accountvssubstore',
    requires: [
        'Gl.model.Accountvssub'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AccountvssubStore',
                model: 'Gl.model.Accountvssub',   
                 sorters: [{
                    property: 'level',
                    direction: 'DESC'
                }, {
                    property: 'journal_id',
                    direction: 'ASC'
                }, {
                    property: 'journaldetail_id',
                    direction: 'ASC'
                }
            ],

                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/accountvssub/read',
                        create: 'gl/accountvssub/create',
                        update: 'gl/accountvssub/update',
                        destroy: 'gl/accountvssub/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'rpt_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'search'
                    }
                }
            }, cfg)]);
    }
});