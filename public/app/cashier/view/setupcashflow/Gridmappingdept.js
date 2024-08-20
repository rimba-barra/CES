Ext.define('Cashier.view.setupcashflow.Gridmappingdept', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.setupcashflowgridmappingdept',
    store: Ext.create('Ext.data.Store', {
        storeId: 'gridmappingdeptStore',
        fields: ['source_department_code', 'destination_department_id'],
        data: []        
    }),
    bindPrefixName: 'Setupcashflow',
    itemId: 'Setupcashflowgridmappingdept',
    title: 'Mapping Department',
    newButtonLabel: 'Add New',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
            plugins: [rowEditing],
            viewConfig: {
            },
            selModel: null,
            columns: [
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_source_dept',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'source_department_code',
                    hideable: false,
                    text: 'Source Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dest_dept',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'destination_department_code',
                    hideable: false,
                    text: 'Destination Department',
                    emptyCellText: '<p style="color: red">-- Select Department --</p>',
                    editor: {
                        xtype: 'combobox',
                        store: 'Department',
                        displayField: 'code',
                        valueField: 'code',
                        typeAhead: false,
                        triggerAction: 'all',
                        lazyRender: true,
                        emptyText: '',
                        listeners: {
                            click: {
                                element: 'el',
                                fn: function() {
                                    var form = me.up('panel');
                                    var to_project_id = form.down("[name=to_project_id]").getValue();
                                    var to_pt_id = form.down("[name=to_pt_id]").getValue();

                                    if (to_project_id == null || to_project_id == 0 || to_pt_id == null || to_pt_id == 0) {
                                        Ext.Msg.alert("Info", "Please Complete Project / PT Destination");
                                        return false;
                                    } 
                                }
                            }
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'destroy',                       
                        icon: 'app/main/images/icons/delete.png',
                        text: 'Delete Selected',
                        hidden: true
                    },
                ]
            }
        ];
        return dockedItems;
    }
});


