Ext.define('Erems.library.template.component.Nationalitycombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.nationalitycombobox',
    fieldLabel: 'Nationality',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'nationality'
        ],
        data: [['WNI', 'WNI'], ['WNA','WNA']]
    }),
    displayField: 'nationality',
    valueField: 'id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})