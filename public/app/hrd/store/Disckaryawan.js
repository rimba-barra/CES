Ext.define('Hrd.store.Disckaryawan', {
    extend: 'Ext.data.Store',
    //alias: 'store.DisckaryawanStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model: 'Hrd.model.Disckaryawan',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'hrd/disckaryawan/read',
                    create: 'hrd/disckaryawan/create',
                    update: 'hrd/disckaryawan/update',
                    destroy: 'hrd/disckaryawan/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'disc_id',
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