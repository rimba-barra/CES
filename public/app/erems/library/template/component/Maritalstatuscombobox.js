Ext.define('Erems.library.template.component.Maritalstatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.maritalstatuscombobox',
    fieldLabel: 'Marital status',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'marital'
        ],
        data: [['single', 'Single'], ['married', 'Married'],['divorce','Divorce']]
    }),
    displayField: 'marital',
    valueField: 'id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})