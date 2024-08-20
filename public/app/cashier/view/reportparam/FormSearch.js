Ext.define('Cashier.view.reportparam.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.reportparamformsearch',
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
                    xtype: 'projectcombobox',
                    fieldLabel: 'Project',
                    itemId: 'fs_project_id',
                    name: 'project_id',
                    emptyText: 'Project Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fs_pt_id',
                    name: 'pt_id',
                    emptyText: 'Pt/Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_object',
                    name: 'object',
                    fieldLabel: 'Object Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 1,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_value',
                    name: 'value',
                    fieldLabel: 'Object Value',
                    allowBlank: false,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
