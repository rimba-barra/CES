Ext.define('Master.library.template.comboboxgrid.Projectptcombogrid', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.projectptcombogrid',
    matchFieldWidth: false,
    dynamicdata:1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    store:'Projectpt',
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
            store:self.store,
            valueField: 'projectpt_id',
            displayField: 'ptname',
            columns: [
                {
                    header: 'No.',
                    width: 50,
                    xtype: 'rownumberer'
                },
                {
                    header: 'Code',
                    width: 30,
                    dataIndex: 'ptcode',
                    flex: 1
                },
                {
                    header: 'Pt',
                    width: 80,
                    dataIndex: 'ptname',
                    flex: 1
                },
               
            ]
            ,
            listeners: {
                scope: self,
                itemclick: function (g, record, item, index, e, eOpts) {
                    var me, store;                                     
                    me = this;
                    this.setValue(record.get("projectpt_id"));
                    this.setRawValue(record.get("ptname"));
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

