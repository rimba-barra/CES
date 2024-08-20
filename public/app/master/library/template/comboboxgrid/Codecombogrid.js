Ext.define('Master.library.template.comboboxgrid.Codecombogrid', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.codecombogrid',
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    store:'Codecombo',
    matchFieldWidth: false,
    createPicker: function () {
        var self = this;
        self.picker = Ext.create('Ext.grid.Panel', {
            width: 500,
            height: 200,
            pickerField: self,
            floating: true,
            hidden: true,
            cls: 'x-menu',
            focusOnToFront: false,
            store: self.store,
            valueField: 'code',
            displayField: 'code',
            columns: [
                {
                    header: 'No.',
                    width: 50,
                    xtype: 'rownumberer'
                },
                {
                    header: 'Code',
                    width: 80,
                    dataIndex: 'code',
                    flex: 1
                },
                {
                    header: 'Description',
                    width: 200,
                    dataIndex: 'description',
                    flex: 2
                },
            ]
            ,
            listeners: {
                scope: self,
                itemclick: function (g, record, item, index, e, eOpts) {
                    var me, store;
                    me = this;
                    this.setValue(record.get("code"));
                    this.setRawValue(record.get("code"));
                    this.rowdata = record['data'];
                    this.collapse();
                }
            }
        });

        self.picker.ownerCt = self.up('[floating]');
        self.picker.registerWithOwnerCt();
        return self.picker;
    }

});

