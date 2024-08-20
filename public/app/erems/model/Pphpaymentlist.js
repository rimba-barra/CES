Ext.define('Erems.model.Pphpaymentlist', {
    extend: 'Ext.data.Model',
    alias: 'model.PphpaymentlistModel',

    idProperty: 'payment_id',

    fields: [
        {name: 'payment_id', type: 'int'},
        {name: 'payment_no', type: 'string'},
        {name: 'payment_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'paymentmethod_id', type: 'int'},
        {name: 'note', type: 'string'},
		{name: 'total_payment_list', type: 'decimal'},
		{name: 'paymentmethod', type: 'string'},
		{name: 'is_pph_pay', type: 'boolean'},
		{name: 'pph_pay_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pph_amount', type: 'decimal'},
		{name: 'pph_ntpn_no', type: 'string'},
		{name: 'pph_global', type: 'decimal'},
		{name: 'max_pph_amount', type: 'decimal'}
    ],
});