Ext.define('Hrd.template.combobox.Functionapprovalcombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.functionapprovalcombobox',
    store: 'Functionapproval',
    dynamicdata: 0,
    fieldLabel: 'Approval for',
    displayField: 'description',
    valueField: 'status',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


