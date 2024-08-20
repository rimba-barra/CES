Ext.define('Erems.store.Mastergirikdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.MastergirikdetailStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({     
			storeId: 'MastergirikdetailStore',       
            model: 'Erems.model.Mastergirikdetail',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/mastergirik/read',
                    create: 'erems/mastergirik/create',
                    update: 'erems/mastergirik/update',
                    destroy: 'erems/mastergirik/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'girik_detail_id',
                    root: 'data'
                },
				extraParams: {
						read_type_mode: 'detail'
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