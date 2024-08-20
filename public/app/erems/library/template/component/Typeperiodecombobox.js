Ext.define('Erems.library.template.component.Typeperiodecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.typeperiodecombobox',
    fieldLabel: '',
    store: new Ext.data.ArrayStore({
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'}
        ],
        data: [[1, 'Hari'], [2,'Minggu'], [3,'Bulan']]
    }),
    displayField: 'name',
    valueField: 'id',
    autoLoad:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})