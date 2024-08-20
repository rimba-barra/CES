Ext.define('Cashier.library.template.combobox.Coasubeditorcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.coasubeditorcombobox',
    store: 'Coasubeditorcombobox',
    fieldLabel: 'Select Coa',
    dynamicdata: 0,
    displayField: 'coacode',
    valueField: 'coa_id',
    matchFieldWidth: false,
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})