Ext.define('Erems.view.pengumpulanberkas.browse.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.pengumpulanberkasbrowseformsearch',
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
				{
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    fieldLabel: 'Block',
                    anchor:'-100'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    anchor:'-100'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_clcode_number',
                    name: 'cluster_code',
                    fieldLabel: 'Cluster Code',
                    maskRe: /[^\`\"\']/,
                    anchor:'-100'
                },
				{
                    xtype: 'textfield',
                    itemId: 'fs_pl_number',
                    name: 'purchaseletter_no',
                    fieldLabel: 'Purchaseletter No.',
                    maskRe: /[^\`\"\']/,
                    anchor:'-100'
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