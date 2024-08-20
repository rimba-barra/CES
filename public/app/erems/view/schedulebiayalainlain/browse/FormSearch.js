Ext.define('Erems.view.schedulebiayalainlain.browse.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.schedulebiayalainlainbrowseformsearch',
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
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    //maxLength: 5,
                    anchor:'-100'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    anchor:'-100',
                },				
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});