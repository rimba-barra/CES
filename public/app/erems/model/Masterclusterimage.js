Ext.define('Erems.model.Masterclusterimage', {
    extend: 'Ext.data.Model',
    alias: 'model.masterclusterimagemodel',

    idProperty: 'clusterimages_id',

    fields: [
        {
            name: 'clusterimages_id',
            type: 'int'
        },
        {
            name: 'cluster_id',
            type: 'int'
        },
        {
            name: 'cluster',
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