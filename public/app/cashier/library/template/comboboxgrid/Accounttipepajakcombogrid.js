Ext.define('Cashier.library.template.comboboxgrid.Accounttipepajakcombogrid', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.accounttipepajakcombogrid',
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    store:'Accounttipepajakcombo',
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
            focusOnToFront: true,
            store: self.store,
            valueField: 'coa_id',
            displayField: 'tipepajakdetail',
            columns: [
                {
                    dataIndex: 'coa_id',
                    hidden: true
                },
                {
                    header: 'No.',
                    width: 50,
                    xtype: 'rownumberer'
                },
                {
                    header: 'Tipe Pajak',
                    width: 80,
                    dataIndex: 'tipepajakdetail',
                    flex: 1
                },
                {
                    header: 'COA',
                    width: 200,
                    dataIndex: 'coa',
                    flex: 2
                },
                {
                    header: 'Persentase',
                    width: 200,
                    dataIndex: 'persentase',
                    flex: 2
                },
            ]
            ,
            listeners: {
                scope: self,
                itemclick: function (g, record, item, index, e, eOpts) {
                    var me, store;
                    me = this;
                    this.setValue(record.get("coa_id"));
                    this.setRawValue(record.get("tipepajakdetail"));
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

