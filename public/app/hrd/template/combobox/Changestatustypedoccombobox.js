Ext.define('Hrd.template.combobox.Changestatustypedoccombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.changestatustypedoccombobox',
    store: 'Changestatustypedoc',
    dynamicdata: 0,
    fieldLabel: 'Document Type',
    displayField: 'description',
    valueField: 'typedocument',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


