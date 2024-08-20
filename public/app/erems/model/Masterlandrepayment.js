Ext.define('Erems.model.Masterlandrepayment', {
    extend: 'Ext.data.Model',
    alias: 'model.masterlandrepaymentmodel',

    idProperty: 'landrepayment_id',

    fields: [
        {name: 'landrepayment_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
        {name: 'keterangan', type: 'string'},
		{name: 'management_fee', type: 'decimal'},
		{name: 'royalty', type: 'decimal'},
        {name: 'addby', type: 'string'},
		{name: 'Addon', type: 'string'},
		{name: 'Modion',type: 'string'},
        {name: 'Modiby',type:'string'}
    ]
});