Ext.define('Gl.library.template.comboboxgrid.Subaccountgroup', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.subaccountgroupdatagrid',
    matchFieldWidth: false,    
    createPicker: function () {
        var self = this;
        self.picker = Ext.create('Ext.grid.Panel', {
            alias: 'widget.subaccountgroupdatagrid',
            width: 500,
            height: 200,
            pickerField: self,
            floating: true,
            hidden: true,
            cls: 'x-menu',
            focusOnToFront: false,
            store: 'Subaccountgroup',
            valueField: 'kelsub_id',
            displayField: 'kelsub',
            rowkelsub:null,
            columns: [
                {
                    header: 'No.',
                    width: 50,
                    xtype: 'rownumberer'
                },
                {
                    header: 'Sub Group Code',
                    width: 80,
                    dataIndex: 'kelsub',
                    flex: 1
                },
                {
                    header: 'Desciption',
                    width: 500,
                    dataIndex: 'description',
                    flex: 2
                }
            ]
            ,
            listeners: {
                scope: self,
                itemclick: function (g, record, item, index, e, eOpts) {
                    this.setValue(record.get("kelsub_id"));
                    this.setRawValue(record.get("kelsub"));
                    this.rowdata=record['data'];
                    this.collapse();
                }
            }
        });

        self.picker.ownerCt = self.up('[floating]');
        self.picker.registerWithOwnerCt();
        return self.picker;
    }

});

