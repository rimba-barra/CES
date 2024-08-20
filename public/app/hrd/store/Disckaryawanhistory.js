Ext.define('Hrd.store.Disckaryawanhistory', {
    extend: 'Ext.data.Store',
    //alias: 'store.DisckaryawanhistoryStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Hrd.model.Disckaryawanhistory',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'hrd/disckaryawanhistory/read',
                    create: 'hrd/disckaryawanhistory/create',
                    update: 'hrd/disckaryawanhistory/update',
                    destroy: 'hrd/disckaryawanhistory/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'disc_saldo_id',
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