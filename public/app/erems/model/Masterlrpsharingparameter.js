Ext.define('Erems.model.Masterlrpsharingparameter', {
    extend: 'Ext.data.Model',
    alias: 'model.masterlrpsharingparametermodel',

    idProperty: 'lrp_sharingparameter_id',

    fields: [
        {name: 'lrp_sharingparameter_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'pricetype_id', type: 'int'},
		{name: 'pricetype', type: 'string'},
        {name: 'payment_start', type: 'decimal'},
		{name: 'payment_end', type: 'decimal'},
		{name: 'sharing', type: 'decimal'},
		{name: 'is_sppjb', type: 'int'},
		{name: 'is_sertifikat', type: 'int'},
		{name: 'is_akad', type: 'int'},
		{name: 'ptname', type: 'string'},
    ]
});