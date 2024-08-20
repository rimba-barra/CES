Ext.define('Erems.model.Purchaseletterpbb', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterpbbmodel',
    idProperty: 'purchaseletter_id',
    fields: [
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'unit_id', type: 'int'},
		{name: 'cluster_id', type: 'int'},
		{name: 'cluster_code', type: 'string'},
        {name: 'cluster', type: 'string'},
		{name: 'block_code', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'customer_name', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'type_name', type: 'string'},
		{name: 'land_size', type: 'string'},
		{name: 'kelebihan', type: 'string'},
		{name: 'building_size', type: 'string'},
		{name: 'nop', type: 'string'},
		{name: 'kelurahan', type: 'string'},
		{name: 'kecamatan', type: 'string'},
		{name: 'hgbinduk', type: 'string'},
		{name: 'pt_id_owner', type: 'int'},
		{name: 'pt_name', type: 'string'},
		{name: 'hgbajb_note', type: 'string'}
    ]
});