Ext.define('Erems.library.template.component.Approvedcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.approvedcombobox',
    fieldLabel: 'Status',
    store: new Ext.data.ArrayStore({
        fields: [
            'approved',
            'approved_text'
        ],
        data: [[3,'ALL'],[1, 'NON APPROVE'], [2,'APPROVED']]
    }),
    displayField: 'approved_text',
    valueField: 'approved',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})