Ext.define('Erems.view.popupkomisi.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.popupkomisiformsearch',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox'
	],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    anchor:'-15'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15',
                    enableKeyEvents: true,

                },
		{
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15',
                    enableKeyEvents: true,

                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Karyawan',
                    itemId: 'fs_berkas',
                    name: 'employee_name',
                    anchor:'-15'
                },
                 {
                    xtype: 'hiddenfield',
                    itemId: 'fs_berkas_group_menu',
                    name: 'berkas_group_menu',
                    anchor:'-15'
                },
  
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
