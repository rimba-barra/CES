Ext.define('Erems.model.Responundanganajb', {
    extend: 'Ext.data.Model',
    alias: 'model.ResponundanganajbModel',

    idProperty: 'respon_undanganajb_id',

    fields: [
                {name: 'respon_undanganajb_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'respon', type: 'string'},
    ]
});