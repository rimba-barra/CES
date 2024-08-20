Ext.define('Erems.model.Clusterfacilitiesimage', {
    extend: 'Ext.data.Model',
    alias: 'model.clusterfacilitiesimagemodel',

    idProperty: 'clusterfacilities_images_id',

    fields: [
        {
            name: 'clusterfacilities_images_id',
            type: 'int'
        },
        {
            name: 'clusterfacilities_id',
            type: 'int'
        },
        {
            name: 'clusterfacilities',
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