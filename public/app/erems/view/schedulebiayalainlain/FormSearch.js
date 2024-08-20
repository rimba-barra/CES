Ext.define('Erems.view.schedulebiayalainlain.FormSearch',{
    extend   :'Erems.library.template.view.FormSearch',
    alias    :'widget.schedulebiayalainlainformsearch',
    requires : [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
        'Erems.library.template.component.Paymentflagcombobox',
	],
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults : me.generateDefaults(),
            items : [
                {
                    xtype  : 'clustercombobox',
                    itemId : 'fs_cluster_id',
                    name   : 'cluster_id',
                    anchor :'-15',
                },
        		{
                    xtype  : 'blockcombobox',
                    itemId : 'fs_block_id',
                    name   : 'block_id',
                    anchor :'-15',
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Virtual Account',
                    itemId     : 'fs_va',
                    name       : 'virtual_account',
                    anchor     :'-15'
                },  
                {
                    xtype  : 'paymentflagcombobox',
                    itemId : 'fs_paymentflag_id',
                    name   : 'paymentflag_id',
                    anchor :'-15',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});