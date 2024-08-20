Ext.define('Hrd.view.registertrainingbytype.GridEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.registertrainingbytypeemgrid',
    storeConfig: {
        id: 'RegistertrainingbytypeGridEmStore',
        idProperty: 'trainingdetail_id',
        extraParams: {
            mode_read: 'registedemployee',
            trainingtran_training_id: 0
        }
    },
    bindPrefixName: 'Registertrainingbytype',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu:[],
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width: 75
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'employee_employee_nik',
                    text: 'N.I.K',
                },
                {
                    dataIndex: 'employee_employee_name',
                    text: 'Name',
                },
                {
                    dataIndex: 'department_code',
                    text: 'Department',
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                icon: 'app/main/images/icons/edit.png',
                // Use a URL in the icon config
                tooltip: 'Edit employee information',
                handler: function (view, rowIndex, colIndex) {
                        var grid = view.up("grid");
                    grid.acdo(rowIndex,'edit');
                }
            },{
                icon: 'app/main/images/icons/delete.png',
                // Use a URL in the icon config
                tooltip: 'Delete employee from training',
                handler: function (view, rowIndex, colIndex) {
                        var grid = view.up("grid");
                    grid.acdo(rowIndex,'delete');
                }
            }
                    
            ]
            
        };
        return ac;

        return x;
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        iconCls: 'icon-new',
                        text: 'New'
                    },
                    {
                        xtype: 'button',
                        action: 'saveem',
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Delete'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});