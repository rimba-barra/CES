Ext.define('Cashier.library.template.combobox.Tipekontraktorcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.tipekontraktorcombobox',
    store: 'Tipekontraktorcombobox', //masuk dalam store
    fieldLabel: 'Tipe Kontraktor',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'description', //mengambil data dari store
    valueField: 'tipekontraktor_id', //mengambil data dari store   
    matchFieldWidth: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


