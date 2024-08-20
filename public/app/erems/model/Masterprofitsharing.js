Ext.define('Erems.model.Masterprofitsharing', {
    extend: 'Ext.data.Model',
    alias: 'model.masterprofitsharingmodel',

    idProperty: 'profitsharing_id',

    fields: [
        {name: 'profitsharing_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
        {name: 'keterangan', type: 'string'},
        {name: 'komisi_marketing', type: 'decimal'},
        {name: 'tanah_permeter_awal', type: 'decimal'},
        {name: 'nilai_lahan_gross', type: 'decimal'},
        {name: 'efisiensi_lahan', type: 'decimal'},
		{name: 'management_fee', type: 'decimal'},
		{name: 'royalty', type: 'decimal'},
        {name: 'addby', type: 'string'},
		{name: 'Addon', type: 'string'},
		{name: 'Modion',type: 'string'},
        {name: 'Modiby',type:'string'}
    ]
});