Ext.define('Hrd.view.mutation.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.mutationformsearch',
    uniquename: '_mutationformsearch',
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
                {
                    xtype: 'changestatustypecombobox',
                    itemId: 'fsc_changetype_id',
                    name: 'changetype_id',
                    id: 'fsc_changetype_id',
                    fieldLabel: 'Transfer Type',
                    width: 300,
                    labelWidth: 140,
                    allowBlank: false,
                    readOnly: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    absoluteReadOnly: true, //untuk set readonly ketika update

                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_sk_number',
                    name: 'sk_number',
                    fieldLabel: 'SK No.',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsc_employee_name',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
