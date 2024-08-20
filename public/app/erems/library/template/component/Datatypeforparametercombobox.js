Ext.define('Erems.library.template.component.Datatypeforparametercombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.datatypeforparametercombobox',
    fieldLabel: 'Data type',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'datatype'
        ],
        data: [[1, 'CHARACTER'], [2, 'INTEGER'],[3,'DATETIME'],[4,'BOOLEAN'],[5,'IMAGE']]
    }),
    displayField: 'datatype',
    valueField: 'datatype',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})