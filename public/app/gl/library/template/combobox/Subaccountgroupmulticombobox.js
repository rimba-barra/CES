Ext.define('Gl.library.template.combobox.Subaccountgroupmulticombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.subaccountgroupmulticombobox',
    fieldLabel: 'Select multiple group',
    multiSelect: true,
    store: 'Subaccountgroup', //masuk dalam store
    displayField: 'kelsub', //mengambil data dari store
    valueField: 'kelsub_id', //mengambil data dari store
    queryMode: 'local',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{description} with code : {kelsub}">{description} ({kelsub})</div>';
        }
    },
    initComponent: function() {
        var me = this;               
        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
});



