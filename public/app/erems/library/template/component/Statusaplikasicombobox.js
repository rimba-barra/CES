Ext.define('Erems.library.template.component.Statusaplikasicombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.statusaplikasicombobox',
    store: 'Statusaplikasi', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Status Aplikasi',
    displayField: 'description', //mengambil data dari store
    valueField: 'status_aplikasi', //mengambil data dari store  
    typeAhead: true,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


