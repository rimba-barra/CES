Ext.define('Hrd.template.combobox.Changestatustypecombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.changestatustypecombobox',
    store: 'Changestatustype',
    dynamicdata: 0,
    fieldLabel: 'Perubahan Data',
    displayField: 'name',
    valueField: 'changetype_id',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


