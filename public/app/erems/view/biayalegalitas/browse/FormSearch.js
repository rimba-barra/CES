Ext.define('Erems.view.biayalegalitas.browse.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.biayalegalitasbrowseformsearch',
	requires: [
		'Erems.library.template.component.Blockcombobox',
                'Erems.library.template.component.Clustercombobox',
	],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fs_unit_number',
                    name: 'unit_id',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    //maxLength: 5,
                    anchor:'-100'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fs_param_spcreq',
                    name: 'param_spcreq',
                    fieldLabel: 'Spc Req',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor:'-170'
                },
//		{
//                    xtype: 'blockcombobox',
//                    itemId: 'fs_block_id',
//                    name: 'block_id',
//                    fieldLabel: 'Block',
//                    anchor:'-100'
//                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    anchor:'-100',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fs_customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                    anchor     :'-100'
                },
				
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});