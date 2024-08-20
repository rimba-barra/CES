Ext.define('Erems.library.template.component.Undangancombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.undangancombobox',
    fieldLabel: 'Undangan',
    store: new Ext.data.ArrayStore({
        fields: [
            'undangan',
            'undangan'
        ],
        data: [[1, '1'], [2, '2'], [3, '3'], ['SEPIHAK', 'SEPIHAK']]
    }),
    displayField: 'undangan',
    valueField: 'undangan',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})