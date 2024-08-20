Ext.define('Gl.library.template.typehead.Subaccountgrouptypehead', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.subaccountgrouptypehead',
    store: 'Subaccountgroup', //masuk dalam store
    fieldLabel: 'Subaccountgroup',
    displayField: 'kelsub', //mengambil data dari store
    valueField: 'kelsub_id', //mengambil data dari store
    triggerAction:'all',
    typeAhead:true,
    mode:'remote',
    minChars:2,
    forceSelection:true,
    hideTrigger:true,    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})


