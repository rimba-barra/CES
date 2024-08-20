Ext.define('Gl.view.subdesccode.FormImport', {
    extend: 'Gl.library.template.view.FormImport',
    alias: 'widget.subdesccodeformimport',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectcombobox', //dari alias yang di riquires Gl.library.template.combobox.Subaccountgroupcombobox
                    fieldLabel: 'Project',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'project_id',
                    itemId: 'fsms_project_id',
                    id: 'fsms_project_id',
                    flex: 1
                },
                {
                    xtype: 'ptcombobox',
                    fieldLabel: 'PT',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'pt_id',
                    itemId: 'fsms_pt_id',
                    id: 'fsms_pt_id',
                    flex: 1
                }
            ],
            dockedItems: me.generateDockedItemImport()
        });

        me.callParent(arguments);
    }
});
