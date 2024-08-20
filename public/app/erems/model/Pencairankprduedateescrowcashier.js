Ext.define('Erems.model.Pencairankprduedateescrowcashier', {
    extend: 'Ext.data.Model',
    alias: 'model.pencairankprduedateescrowcashiermodel',
    idProperty: 'plafon_id',
    fields: [
		{name: 'unit_id', type: 'int'},
		{name: 'plafon_id', type: 'int'},
		{name: 'plafon', type: 'string'},
		{name: 'duedate_escrow', type: 'date', dateFormat: 'Y-m-d H:i:s.u'}
    ]
});