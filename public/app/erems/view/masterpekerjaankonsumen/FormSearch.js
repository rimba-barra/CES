Ext.define('Erems.view.masterpekerjaankonsumen.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.MasterpekerjaankonsumenFormSearch',
	itemId: 'MasterpekerjaankonsumenFormSearch',
	
	initComponent: function(){
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'textfield',
					fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code',
                    enableKeyEvents: true
                },							
                {
                    xtype: 'textfield',
					fieldLabel: 'Name',
                    itemId: 'name',
                    name: 'name',
                    enableKeyEvents: true
                },
			]
		});
		me.callParent(arguments);
	}
});