Ext.define('Erems.view.mastertargetsalesrevisi.Panel', {
    extend        : 'Ext.panel.Panel',
    alias         : 'widget.MastertargetsalesrevisiPanel',	
    itemId        : 'MastertargetsalesrevisiPanel',
    layout        : 'border',
    bodyPadding   : 2,
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            items : [
				{
                    xtype       : 'MastertargetsalesrevisiFormSearch',
                    maxWidth    : 500,
                    minWidth    : 300,
                    width       : 300,
                    collapsed   : true,
                    collapsible : true,
                    iconCls     : 'icon-search',
                    title       : 'Search',
                    region      : 'west',
                    split       : true
                },
				{
                    xtype  : 'MastertargetsalesrevisiGrid',
                    store  : 'Mastertargetsalesrevisi',
                    region : 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});