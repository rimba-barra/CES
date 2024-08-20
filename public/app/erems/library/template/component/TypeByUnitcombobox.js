Ext.define('Erems.library.template.component.TypeByUnitcombobox', {
    extend: 'Erems.library.component.Combobox',
    queryMode: 'local',
    alias: 'widget.typebyunitcombobox',
    store: 'MasterpricelistType',
    fieldLabel: 'Type',
    displayField: 'name',
    valueField: 'type_id',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})