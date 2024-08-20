Ext.define('Hrd.template.combobox.Overtimetiypeintranetcombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.overtimetiypeintranetcombobox',
    store: 'Overtimetiypeintranet',
    dynamicdata: 0,
    fieldLabel: 'Overtime Type',
    displayField: 'description',
    valueField: 'lemburtype',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


