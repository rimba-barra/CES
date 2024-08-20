Ext.define('Erems.model.Complaintsurat', {
    extend: 'Ext.data.Model',
    alias: 'model.complaintsuratmodel',
    idProperty: 'aftersales_surat_id',
    fields: [
		{name: 'aftersales_surat_id', type: 'int'},
		{name: 'aftersales_id', type: 'int'},
		{name: 'jenis_surat', type: 'string'},
		{name: 'undangan', type: 'string'},
		{name: 'surat_no', type: 'string'},
		{name: 'send_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'keterangan', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'},
		{name: 'is_hadir', type: 'boolean'},
		// added by rico 10122021
		{name: 'undangan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
    ]
});