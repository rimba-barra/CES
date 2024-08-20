Ext.define('Cashier.view.grouptransaction.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.grouptransactionformsearch',
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
                    disabled: true,
                    rowdata: null
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    itemId: 'fs_is_default',
                    name: 'is_default',
                    boxLabel: 'Default',
                    padding: '0 0 0 0',
                    margin: '0 0 0 0',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: true
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    itemId: 'fs_active',
                    name: 'active',
                    boxLabel: 'Active',
                    padding: '0 0 0 0',
                    margin: '0 0 0 0',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'statuscombobox',
                    itemId: 'fs_status',
                    name: 'status',
                    fieldLabel: 'Status',
                    allowBlank: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fs_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
