Ext.define('Gl.library.template.combobox.Yeardbcombobox', {
    extend: 'Gl.library.component.Combobox',
    alias: 'widget.yeardbcombobox',
    store: 'Yearcombo', //masuk dalam store
    fieldLabel: 'Year from db',
    displayField: 'dbapps_year', //mengambil data dari store
    valueField: 'dbapps_year', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


