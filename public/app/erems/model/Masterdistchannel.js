Ext.define('Erems.model.Masterdistchannel', {
    extend: 'Ext.data.Model',
    alias: 'model.masterdistchannelmodel',

    idProperty: 'komisi_distributionchannel_id',

    fields: [
        {name: 'komisi_distributionchannel_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'distributionchannel', type: 'string'},
        {name: 'description', type: 'string'},
    ]
});