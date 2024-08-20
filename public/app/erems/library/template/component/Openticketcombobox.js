Ext.define('Erems.library.template.component.Openticketcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.openticketcombobox',
    fieldLabel: 'Priority',
    store: new Ext.data.ArrayStore({
        fields: [
            'priority',
            'description'
        ],
        data: [['L', 'Low'], ['M', 'Medium'], ['H', 'High']]
    }),
    displayField: 'description',
    valueField: 'priority',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})