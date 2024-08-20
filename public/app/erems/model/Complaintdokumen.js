Ext.define('Erems.model.Complaintdokumen', {
    extend: 'Ext.data.Model',
    alias: 'model.complaintdokumenmodel',
    idProperty: 'aftersales_dokumenupload',
    fields: [
		{name: 'aftersales_dokumenupload', type: 'int'},
		{name: 'aftersales_id', type: 'int'},
		{name: 'doc_filename', type: 'string'},
                {name: 'jenis_file', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'},
		{name: 'temp_id_dokumen' , type:'string'}  
    ]
});