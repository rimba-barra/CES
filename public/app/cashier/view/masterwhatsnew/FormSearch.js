Ext.define('Cashier.view.masterwhatsnew.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.MasterwhatsnewFormSearch',
	itemId: 'MasterwhatsnewFormSearch',
	
	initComponent: function(){
		var me = this;
        Ext.applyIf(me, {
			items: [						
                {
                    xtype: 'textfield',
					fieldLabel: 'Title',
                    itemId: 'title',
                    name: 'title'
                },
                {
                   xtype:'combobox',
                   fieldLabel: 'Module',
                   name:'app_name',
                   valueField: 'app_name',
                   queryMode:'local',
                   dvalue: apps.appId,
                   store:['erems','cashier','hrd'],
                   autoSelect:true,
                   allowBlank: false,  
                   forceSelection:true,
                       listeners: {
                        afterrender: function() {
                           this.setValue(apps.appId);    
                        }
                    }
                }
			]
		});
		me.callParent(arguments);
	}
});