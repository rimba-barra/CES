Ext.define('Hrd.view.msection.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.msectionformsearch',
    uniquename: '_msectionformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
		/*
                {
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Department',
                    itemId: 'fd_department_id' + me.uniquename,
                    id: 'department_id' + me.uniquename,
                    name: 'department_id',
                    width: 250,
                    emptyText: 'Department',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                },
		*/
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_section',
                    name: 'section',
                    fieldLabel: 'Section',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
