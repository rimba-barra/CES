Ext.define('Hrd.view.overtimeindex.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.overtimeindexgrid',
    storeConfig: {
        id: 'OvertimeindexGridStore',
        idProperty: 'overtimeindex_id',
        extraParams: {}
    },
    bindPrefixName: 'Overtimeindex',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                
                {
                    dataIndex: 'hour',
                    text: 'Jam',
                    width: 75
                },
                {
                    dataIndex: 'cut_break',
                    text: 'Potong Istirahat',
                    renderer: function(value, metadata, record) {
                       /*
                        if (value < 1) {
                            return 0;
                        }
                        */
                        return value;
                        
                    },
                    width: 75
                },
                {
                    dataIndex: 'meal',
                    text: 'Makan Lembur',
                    renderer: function(value, metadata, record) {
                        /*
                        if (value < 1) {
                            return 0;
                        }
                        */
                        return value;
                    },
                    width: 75
                },
                {
                    dataIndex: 'break_limit',
                    text: 'Batasan Istirahat',
                    width: 75,
                    xtype: 'booleancolumn',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
            ]
        });

        me.callParent(arguments);
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
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'edit',
                        disabled: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit'
                    },
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        margin: '0 5 0 0',
                        iconCls: 'icon-save',
                        disabled: true,
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-cancel',
                        disabled: true,
                        text: 'Cancel'
                    },
                    {
                        xtype: 'button',
                        action: 'delete',
                        disabled: true,
                        itemId: 'btnDelete',
                        iconCls: 'icon-delete',
                        text: 'Delete'
                    }/*,
                    
                    {
                        xtype: 'button',
                        action: 'print',
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print'
                    }*/
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height:100,
                items: [
                    {
                        // Fieldset in Column 1 - collapsible via toggle button
                        xtype: 'fieldset',
                        title: 'Overtime Type',
                        defaults: {
                            xtype: 'radiofield',
                            margin:'0 0 0 10'
                        },
                        layout: {
                            type: 'table',
                            columns: 2
                        },
                        width: 300,
                        items: [{
                                boxLabel: 'General Day',
                                name: 'overtimetype',
                                inputValue:1,
                                checked: true
                            }, {
                                // boxLabel: 'Holiday',
                                boxLabel: 'Hari Libur (5 HK)',
                                name: 'overtimetype',
                                inputValue:2
                            }, {
                                boxLabel: 'Morning',
                                name: 'overtimetype',
                                inputValue:3,
                            }, {
                                // boxLabel: 'Short Holiday',
                                boxLabel: 'Hari Libur (6 HK)',
                                name: 'overtimetype',
                                inputValue:4
                            }, {
                                // boxLabel: 'Short Holiday Nasional',
                                boxLabel: 'Hari Pendek (6 HK)',
                                name: 'overtimetype',
                                inputValue:5
                            }]
                    }
                ]
            },
          /*  {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    }
});