Ext.define('Cashier.view.ptforcashbon.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.ptforcashbonformsearch',

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
                    xtype: 'ptusercombobox',
                    fieldLabel: 'Pt for Owner',
                    name: 'pt_id_owner',
                    width: 300,
                    allowBlank: false,
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Project for Cashbon',
                    name: 'project_id_cashbon',
                    width: 300,
                    allowBlank: false,
                },
                {
                    xtype: 'ptcombobox',
                    fieldLabel: 'Project for Cashbon',
                    name: 'pt_id_cashbon',
                    width: 300,
                    allowBlank: false,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
