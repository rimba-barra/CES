Ext.define('Erems.store.Verificationapproval', {
	extend      : 'Ext.data.Store',
	alias       : 'store.verificationapprovalstore',
	requires    : ['Erems.model.Verificationapproval'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId : 'VerificationapprovalStore',
				model   : 'Erems.model.Verificationapproval',
				proxy   : {
					type          : 'ajax',
					actionMethods : {
						read    : 'POST',
						create  : 'POST',
						update  : 'POST',
						destroy : 'POST'
					},
					api: {
						read    : 'erems/verificationapproval/read',
						create  : 'erems/verificationapproval/create',
						update  : 'erems/verificationapproval/update',
						destroy : 'erems/verificationapproval/delete'
					},
					reader: {
						type       : 'json',
						idProperty : 'verification_approval_id',
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