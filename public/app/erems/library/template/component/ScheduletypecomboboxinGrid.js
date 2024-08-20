Ext.define('Erems.library.template.component.ScheduletypecomboboxinGrid', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.scheduletypecomboboxinGrid',
    fieldLabel: '',
    store: new Ext.data.ArrayStore({
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'}
        ],
        data: [[5, 'UM'], [3,'INH'], [1,'SIP'], [2,'KPR']]
    }),
    displayField: 'name',
    valueField: 'name',
    autoLoad:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})