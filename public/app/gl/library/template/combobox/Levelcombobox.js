Ext.define('Gl.library.template.combobox.Levelcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.levelcombobox',
    store: 'Levelcombox', //masuk dalam store
    fieldLabel: 'Template for Level',
    displayField: 'level', //mengambil data dari store
    valueField: 'level', //mengambil data dari store  
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


