Ext.define('Erems.store.Responundanganajb', {
    extend: 'Ext.data.Store',
    alias: 'store.responundanganajbstore',
    requires: [
        'Erems.model.Responundanganajb'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ResponundanganajbStore',
            model: 'Erems.model.Responundanganajb',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/responundanganajb/read',
//                    create: 'erems/responundanganajb/create',
//                    update: 'erems/responundanganajb/update',
//                    destroy: 'erems/responundanganajb/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'respon_undanganajb_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },

            }
        }, cfg)]);
    }
});