Ext.define('Erems.library.template.component.Expensetypecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.expensetypecombobox',
    fieldLabel: 'Expense Type',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'expensetype'
        ],
        data: [[1, 'JOIN OPERATION EXPENSE'], [2, 'OPERATION COST EXPENSE']]
    }),
    displayField: 'expensetype',
    valueField: 'id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
})