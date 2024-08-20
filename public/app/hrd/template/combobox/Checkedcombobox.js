Ext.define('Hrd.template.combobox.Checkedcombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.checkedcombobox',
    store: 'Checked',
    dynamicdata: 0,
    fieldLabel: 'Checked',
    displayField: 'hrd_checked',
    valueField: 'hrd_checked',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


