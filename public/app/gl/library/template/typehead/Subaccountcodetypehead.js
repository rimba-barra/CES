Ext.define('Gl.library.template.typehead.Subaccountcodetypehead', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.subaccountcodetypehead',
    store: 'Subaccountcode', //masuk dalam store
    fieldLabel: 'Subaccountcode',
    displayField: 'code', //mengambil data dari store
    valueField: 'subgl_id', //mengambil data dari store
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


