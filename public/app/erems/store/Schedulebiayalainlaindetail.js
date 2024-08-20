Ext.define('Erems.store.Schedulebiayalainlaindetail', {
    extend: 'Ext.data.Store',
    alias: 'store.schedulebiayalainlaindetailstore',
    requires: [
        'Erems.model.Schedulebiayalainlain'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'schedulebiayalainlaindetailStore',
                model: 'Erems.model.Schedulebiayalainlain',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        // create: 'POST',
                        // update: 'POST',
                        // destroy: 'POST'
                    },
                    api: {
                        read: 'erems/schedulebiayalainlain/read',
                        // create: 'erems/biayalegalitas/create',
                        // update: 'erems/biayalegalitas/update',
                        // destroy: 'erems/biayalegalitas/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'detail_biayalainlain',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});