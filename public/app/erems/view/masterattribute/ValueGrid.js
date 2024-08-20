Ext.define('Erems.view.masterattribute.ValueGrid', {
    extend: 'Erems.library.template.component.GalleryGrid',
    alias: 'widget.masterattributevaluegrid',
    store: 'Masterattributevalue',
    newButtonLabel: 'Add new value',
    height: 200,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'attributevalue_id',
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_code',
                    width: 150,
                    dataIndex: 'attributevalue',
                    hideable: false,
                    text: 'Attribute Value'
                },
                //updated by anas 28042021
                {
                    xtype: 'booleancolumn',
                    itemId: 'colpf_description2',
                    width: 100,
                    dataIndex: 'is_default',
                    text: 'Default',
                    align: 'center',                 
                    renderer: me.renderIconDefault,
                },
                me.generateActionColumn()

            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
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
                        text: 'Add new value'
                    }

                ]
            }

        ];
        return dockedItems;
    },

    //added by anas 28042021
    renderIconDefault: function(val) {
        var me = this;
        if(val == '1'){
            return '✓';
        }
        else{
            return '';
        }
    },
});