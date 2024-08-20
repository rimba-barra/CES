Ext.define('Erems.model.Projectfacilities', {
    extend: 'Ext.data.Model',
    alias: 'model.projectfacilitiesmodel',

    idProperty: 'projectfacilities_id',

    fields: [
        {
            name: 'projectfacilities_id',
            type: 'int'
        },
        {
            name: 'code',
            type: 'string'
        },
        {
            name: 'layer_img',
            type: 'string'
        },
		{
            name: 'projectfacilities',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },{
            name: 'facilitiestype_id',
            type: 'int'
        },{
            name: 'facilitiestype',
            type: 'string'
        },
        {
            name:'active',
            type:'int'
        },
        {
            name:'detail'
        },
        {
            name:'edit_image_flag',
            type:'int'
        }
    ]
});