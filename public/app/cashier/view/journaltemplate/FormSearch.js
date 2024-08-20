Ext.define('Cashier.view.journaltemplate.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.journaltemplateformsearch',
    uniquename: "_fsjournaltemplate",
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
                    id: 'project' + me.uniquename,
                    itemId: 'fs_project' + me.uniquename,
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
                    id: 'pt_id' + me.uniquename,
                    itemId: 'fs_pt_id' + me.uniquename,
                    name: 'pt_id',
                    emptyText: 'Pt/Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    disabled: true,
                    rowdata: null
                },
                {
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Department',
                    id: 'department_id' + me.uniquename,
                    itemId: 'fs_department_id' + me.uniquename,
                    name: 'department_id',
                    emptyText: 'Department',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    disabled: false,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    id: 'code' + me.uniquename,
                    itemId: 'fs_code' + me.uniquename,
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'textfield',
                    id: 'description' + me.uniquename,
                    itemId: 'fs_description' + me.uniquename,
                    name: 'description',
                    fieldLabel: 'Description',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
