Ext.define('Gl.library.template.combobox.Coaparentcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.coaparentcombobox',
    store: 'Coacombo', //masuk dalam store
    fieldLabel: 'Coa',
    displayField: 'coa', //mengambil data dari store
    valueField: 'parent_id', //mengambil data dari store  
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


