Ext.define('Erems.model.Masterlandrepaymentdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.masterlandrepaymentdetailmodel',

    idProperty: 'landrepayment_detail_id',

    fields: [
        {name: 'landrepayment_detail_id', type: 'int'},
		{name: 'landrepayment_id', type: 'int'},
		{name: 'nomor', type: 'int'},
		{name: 'periode_awal', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'periode_akhir', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'nilai_pembayaran', type: 'decimal'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'},

        //added by anas 04102021
		{name: 'efisiensi', type: 'decimal'},
		//added by anas 13102021
		{name: 'nilai_efisiensi', type: 'decimal'},
    
    ]
});