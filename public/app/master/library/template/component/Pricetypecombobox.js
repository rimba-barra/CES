Ext.define('Master.library.template.component.Pricetypecombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.pricetypecombobox',
    fieldLabel: 'Price type',
    store: new Ext.data.ArrayStore({
        fields: [
            'pricetype_id',
            'pricetype'
        ],
        data: [[1, 'CASH'], [2, 'KPR'], [3, 'INHOUSE']]
    }),
    displayField: 'pricetype',
    valueField: 'pricetype_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})