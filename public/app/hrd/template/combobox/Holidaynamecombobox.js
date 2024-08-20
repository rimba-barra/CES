Ext.define('Hrd.template.combobox.Holidaynamecombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.holidaynamecombobox',
    store: 'Holidayname',
    dynamicdata: 0,
    displayField: 'holiday_name',
    valueField: 'holiday_name_id',
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


