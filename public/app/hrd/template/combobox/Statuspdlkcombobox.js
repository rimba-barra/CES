Ext.define('Hrd.template.combobox.Statuspdlkcombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.statuspdlkcombobox',
    store: 'Statuspdlk',
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


