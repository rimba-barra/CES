Ext.define('Erems.model.Masterkomisiprogresif', {
    extend: 'Ext.data.Model',
    alias: 'model.masterkomisiprogresifmodel',

    idProperty: 'komisi_progresif_id',

    fields: [
        {name: 'komisi_progresif_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'tahun', type: 'int'},
		{name: 'sisa', type: 'int'},
		{name: 'deleted', type: 'int'},
		{name: 'persentase', type: 'decimal'},
		{name: 'target_1', type: 'int'},
		{name: 'target_2', type: 'int'},
		{name: 'target_3', type: 'int'},
		{name: 'target_4', type: 'int'},
		{name: 'target_5', type: 'int'},
		{name: 'target_6', type: 'int'},
		{name: 'target_7', type: 'int'},
		{name: 'target_8', type: 'int'},
		{name: 'target_9', type: 'int'},
		{name: 'target_10', type: 'int'},
		{name: 'target_11', type: 'int'},
		{name: 'target_12', type: 'int'},
		{name: 'target_bulan_ini', type: 'int'},
		{name: 'sisa', type: 'int'},
		{name: 'komisi_progresif', type: 'int'},
    ]
});