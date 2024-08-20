Ext.define('Erems.view.mastertargetsalesrevisi.FormSearch', {
	extend        : 'Main.library.FormSearch',
	alias         : 'widget.MastertargetsalesrevisiFormSearch',
	itemId        : 'MastertargetsalesrevisiFormSearch',
	initComponent : function(){
		var me = this;
        Ext.applyIf(me, {
			items : [
				{
					xtype      : 'textfield',
					fieldLabel : 'Tahun',
					value      : new Date().getFullYear(),
					itemId     : 'tahun',
					name       : 'tahun',
                    enableKeyEvents: true
                },
				{
					xtype: 'hiddenfield',
					itemId: 'view_grid_param',
					name: 'view_grid_param',
					value: apps.project
				}
			]
		});
		me.callParent(arguments);
	}
});