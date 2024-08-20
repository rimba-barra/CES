Ext.define('Cashier.view.mergesubcoa.browse.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.mergesubcoabrowseformsearch',
	/*requires: [
		'Cashier.library.template.component.Blockcombobox',
	],*/
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'selected_subgl_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_unit_number',
                    name: 'subgl_code',
                    fieldLabel: 'Sub Account Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor:'-100',
                },
				{
                    xtype: 'textfield',
                    itemId: 'fs_param_spcreq',
                    name: 'subgl_desc',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor:'-100'
                },
				
				
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});