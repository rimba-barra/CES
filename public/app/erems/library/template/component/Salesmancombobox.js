Ext.define('Erems.library.template.component.Salesmancombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.salesmancombobox',
    fieldLabel: 'Salesman',
    store: new Ext.data.ArrayStore({
        fields: [
            'salesman_id',
            'salesman',
            'code'
        ],
        data: [[1, 'Guan Yu','00'], [2, 'Liu Bei','01']]
    }),
    displayField: 'salesman',
    valueField: 'salesman_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
});