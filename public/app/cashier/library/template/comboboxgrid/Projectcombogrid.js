Ext.define('Cashier.library.template.comboboxgrid.Projectcombogrid', {
    extend: 'Cashier.library.component.Combobox',  
    alias: 'widget.projectcombogrid',
    matchFieldWidth: false,
    autoSelect: true,
    selectOnTab: true,
    queryCaching: false,
    lastQuery:null,
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    store: 'Project',
    createPicker: function () {
        var self = this;
        self.picker = Ext.create('Ext.grid.Panel', {
            extend: 'Ext.view.AbstractView',
            width: 500,
            height: 200,
            pickerField: self,
            floating: true,
            hidden: true,
            cls: 'x-menu',
            focusOnToFront: false,
            store: self.store,
            valueField: 'project_id',
            displayField: 'projectname',
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
                    header: 'Name',
                    width: 250,
                    dataIndex: 'projectname',
                    flex: 2
                },
                {
                    header: 'Address',
                    width: 300,
                    dataIndex: 'address',
                    flex: 2
                }
            ]
            ,
            listeners: {
                scope: self,
                itemclick: function (g, record, item, index, e, eOpts) {
                    var me, store;                                     
                    me = this;
                    this.setValue(record.get("project_id"));
                    this.setRawValue(record.get("projectname"));
                    this.rowdata = record['data'];                   
                    this.collapse();
                },
               
            }
        });

        self.picker.ownerCt = self.up('[floating]');
        self.picker.getNode = function () {
                    self.picker.getView().getNode.apply(self.picker.getView(), arguments);
        }
        self.picker.registerWithOwnerCt();       
        return self.picker;
    }

});

