Ext.define('Erems.model.Complaintimages', {
    extend: 'Ext.data.Model',
    alias: 'model.complaintimagesmodel',
    idProperty: 'aftersales_complaint_images_id',
    fields: [
		{name: 'aftersales_complaint_images_id', type: 'int'},
		{name: 'aftersales_complaint_id', type: 'int'},
		{name: 'image_filename', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'},
		{name: 'temp_id_images' , type:'string'}
    ]
});