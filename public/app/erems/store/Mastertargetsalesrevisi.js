Ext.define('Erems.store.Mastertargetsalesrevisi', {
    extend : 'Ext.data.Store',
    alias  : 'store.MastertargetsalesrevisiStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({            
            model : 'Erems.model.Mastertargetsalesrevisi',
            proxy : {
                type: 'ajax',
                actionMethods: {
                    read    : 'POST',
                    create  : 'POST',
                    update  : 'POST',
                    destroy : 'POST'
                },
                api: {
                    read    : 'erems/mastertargetsalesrevisi/read',
                    create  : 'erems/mastertargetsalesrevisi/create',
                    update  : 'erems/mastertargetsalesrevisi/update',
                    destroy : 'erems/mastertargetsalesrevisi/delete'
                },
                reader: {
                    type       : 'json',
                    idProperty : 'targetsales_revisi_id',
                    root       : 'data'
                },
                writer: {
                    type   : 'json',
                    encode : true,
                    root   : 'data'
                }
            }
        }, cfg)]);
    }
});