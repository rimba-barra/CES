Ext.define('Erems.store.Masterlandrepaymentdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterlandrepaymentdetailStore',
	
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({     
			storeId: 'MasterlandrepaymentdetailStore',       
            model: 'Erems.model.Masterlandrepaymentdetail',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/masterlandrepayment/read',
                    create: 'erems/masterlandrepayment/create',
                    update: 'erems/masterlandrepayment/update',
                    destroy: 'erems/masterlandrepayment/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'landrepayment_detail_id',
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