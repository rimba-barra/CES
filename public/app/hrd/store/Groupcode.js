Ext.define('Hrd.store.Groupcode', {
    extend: 'Ext.data.Store',
    alias: 'store.groupcodestore',
    requires: [
        'Hrd.model.Groupcode'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GroupcodeStore',
                model: 'Hrd.model.Groupcode',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterdisckaryawan/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'group_code',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getgroup_code',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});