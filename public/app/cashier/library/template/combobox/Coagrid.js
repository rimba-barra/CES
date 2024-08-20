Ext.define('Cashier.library.template.combobox.Coagrid', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.coacombogrid',
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
            store: 'Coacombo',
            valueField: 'coa_id',
            displayField: 'coa',
            columns: [
                {
                    header: 'No.', 
                    width: 50,
                    xtype: 'rownumberer'
                },
                {
                    header: 'Account',
                    width: 100,
                    dataIndex: 'coa',
                    flex: 1
                },
                {
                    header: 'Name',
                    width: 500,
                    dataIndex: 'name',
                    flex: 2
                }
            ]
            ,
            listeners: {
                scope: self,               
                itemclick: function (g, record, item, index, e, eOpts) {
                    this.setValue(record.get("coa_id"));
                    this.setRawValue(record.get("coa"));
                    this.collapse();
                }
            }
        });

        self.picker.ownerCt = self.up('[floating]');
        self.picker.registerWithOwnerCt();
        return self.picker;
    }

});

