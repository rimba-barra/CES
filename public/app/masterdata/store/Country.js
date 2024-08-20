Ext.define('Masterdata.store.Country', {
    extend: 'Ext.data.Store',
    alias: 'store.CountryStore',

    requires: [
        'Masterdata.model.Country'
    ],
	
	constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CountryStore',			
            model: 'Masterdata.model.Country',
            proxy: {
                type: 'ajax',
                timeout:45000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/country/read',
                    create: 'masterdata/country/create',
                    update: 'masterdata/country/update',
                    destroy: 'masterdata/country/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'country_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            },
			defaultCountryId: 0
        }, cfg)]);
    },
	
	init: function() {
		console.log('123');
	},
	
	listeners: {
		datachanged: function() {
			var dataIndex = this.findBy(function(item){ return item.get('default_country')==true && item.get('active')==true; });
			this.defaultCountryId = dataIndex!=-1 ? this.getAt(dataIndex).get('country_id') : 0;
		}
	}
});