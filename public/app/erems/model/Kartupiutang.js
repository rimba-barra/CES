Ext.define('Erems.model.Kartupiutang', {
    extend: 'Ext.data.Model',
    alias: 'model.kartupiutangmodel',
        
    idProperty: 'expense_id',

    fields: [
        {name: 'payment_id',type: 'int'},{name: 'payment_no',type: 'string'},{name: 'changekavling_date',type: 'string'},
    ]
});