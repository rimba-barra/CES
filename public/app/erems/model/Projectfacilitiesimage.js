Ext.define('Erems.model.Projectfacilitiesimage', {
    extend: 'Ext.data.Model',
    alias: 'model.projectfacilitiesimagemodel',

    idProperty: 'projectfacilities_images_id',

    fields: [
        {
            name: 'projectfacilities_images_id',
            type: 'int'
        },
        {
            name: 'projectfacilities_id',
            type: 'int'
        },
        {
            name: 'projectfacilities',
            type: 'string'
        },
		{
            name: 'title',
            type: 'string'
        },
        {
            name: 'image',
            type: 'string'
        },{
            name: 'is_default',
            type: 'int'
        },
        {
            name:'description',
            type:'string'
        }
    ]
});