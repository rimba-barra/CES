Ext.define('Gl.library.template.combobox.Groupglcombobox', {
    extend: 'Gl.library.component.Combobox',
    alias: 'widget.groupglcombobox',
    store: 'Groupgl', //masuk dalam store
    fieldLabel: 'Acc. Code Group',
    displayField: 'description', //mengambil data dari store
    valueField: 'group_gl', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


