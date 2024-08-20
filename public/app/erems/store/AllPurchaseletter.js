Ext.define('Erems.store.Allpurchaseletter', {
	extend : 'Ext.data.Store',
	alias  : 'store.allpurchaseletter',
	fields : [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'firstpurchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{
			name : 'display_firstpurchase_date',
			convert : function(v, rec) { return Ext.Date.format(new Date(rec.get('firstpurchase_date')), "d-m-Y"); }
		},
		{ 
			name    : 'display_field', 
			convert : function(v, rec) { return rec.get('purchaseletter_no') + ' ' + rec.get('display_firstpurchase_date') + ' ' + rec.get('customer_name'); }
	    }
	],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'AllpurchaseletterStore',
		}, cfg)]);
	}
});