Ext.define('Erems.library.template.component.Siteplanparameterrelationalcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.siteplanparameterrelationalcombobox',
    store: 'Mastersiteplanparameterrelational',
    fieldLabel: '',
    displayField: 'relational_value',
    valueField: 'relational_id',
    //addBlankValue:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})