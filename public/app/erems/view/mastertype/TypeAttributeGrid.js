
Ext.define('Erems.view.mastertype.TypeAttributeGrid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.typeattributegrid',
    storeConfig: {
        id: 'MasterTypeDetailGridStore',
        idProperty: 'typeattribute_id',

        extraParams: {
            mode_read: 'maindetail'
        }
    },
    requires: [
        'Erems.template.ComboBoxFields'
    ],
    bindPrefixName: 'Mastertype',
    newButtonLabel: 'Add new attribute',
    height: 200,

    initComponent: function () {
        var me = this;

        var isian;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),

            //added by anas 28042021
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1,
                    rowIndex: -1,
                    listeners: {
                        beforeedit: function (cellEditor, context, eOpts) {
                            rowIndex = context.rowIdx;
                            context.column.getEditor().on('focus', function (field) {
                            }, this, { delay: 1 });
                        },
                    },
                })
            ],
            //end added by anas

            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'attribute_attribute',
                    text: 'Attribute'
                },
                {
                    dataIndex: 'value',
                    text: 'Value',
                    //added by anas 28042021
                    hidden: true
                },

                //added by anas 28042021
                {
                    dataIndex: 'attributevalue_id',
                    text: 'attributevalue_id',
                    hidden: true
                },
                {
                    dataIndex: 'attributevalue_attributevalue',
                    text: 'Value',
                    width: 200,
                    editor:
                    {
                        xtype: 'combobox',
                        store: 'Masterattributevalue',
                        displayField: 'attributevalue',
                        valueField: 'attributevalue_id',
                        editable: false,
                        queryMode: 'local',
                        listeners: {
                            select: function (combo, rec) {
                                isian = combo.getDisplayValue();
                                var val = combo.getValue();

                                var store = me.getStore();
                                var recStore = store.getAt(rowIndex);
                                recStore.beginEdit();
                                recStore.set("attributevalue_id", val);
                                recStore.set("value", isian);
                                recStore.endEdit();
                            }
                        }
                    },
                    renderer: function (value, metaData, record) {
                        if (Number.isInteger(value) == true) {
                            return isian == null ? value : isian;
                        }
                        else {
                            return value;
                        }
                    }
                },
                //end added by anas

                me.generateActionColumn()

            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                ui: 'footer',
                layout: {
                    type: 'hbox',
                    pack: 'end'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'value_add',
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        text: 'Add new attribute'
                    }

                ]
            }

        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }
});