Ext.define('Cashier.view.coadept.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.coadeptformsearch',
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
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Department',
                    itemId: 'fs_department_id',
                    name: 'department_id',
                    emptyText: 'Department',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    disabled: false,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
