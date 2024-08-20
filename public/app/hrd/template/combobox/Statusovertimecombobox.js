Ext.define('Hrd.template.combobox.Statusovertimecombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.statusovertimecombobox',
    store: 'Statusovertime',
    dynamicdata: 0,
    fieldLabel: 'Status',
    displayField: 'status',
    valueField: 'status',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


