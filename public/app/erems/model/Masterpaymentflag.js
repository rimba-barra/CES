Ext.define('Erems.model.Masterpaymentflag', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpaymentflagmodel',
        
    idProperty: 'paymentflag_id',

    fields: [
        {name: 'paymentflag_id',type: 'int'},
		{name: 'paymentflag',type: 'string'},
		{name: 'description',type: 'string'}
    ]
});