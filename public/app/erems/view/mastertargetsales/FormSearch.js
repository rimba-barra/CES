Ext.define('Erems.view.mastertargetsales.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.MastertargetsalesFormSearch',
	itemId: 'MastertargetsalesFormSearch',
	
	initComponent: function(){
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'textfield',
					fieldLabel: 'Tahun',
					value: new Date().getFullYear(),
                    itemId: 'tahun',
                    name: 'tahun',
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