Ext.define('Erems.library.template.component.Periodtypecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.periodtypecombobox',
    fieldLabel: 'Period Type',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'name'
        ],
        data: [[1, 'JAM'], [2, 'HARI'], [3, 'BULAN'], [4, 'TAHUN']]
    }),
    displayField: 'name',
    valueField: 'name',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
})