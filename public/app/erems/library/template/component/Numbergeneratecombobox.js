Ext.define('Erems.library.template.component.Numbergeneratecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.numbergeneratecombobox',
    fieldLabel: '',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'name'
        ],
        data: [['ALL', 'ALL'], ['GENAP', 'GENAP'], ['GANJIL', 'GANJIL']]
    }),
    displayField: 'name',
    valueField: 'id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})