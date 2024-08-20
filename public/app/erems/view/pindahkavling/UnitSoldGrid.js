Ext.define('Erems.view.pindahkavling.UnitSoldGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.pindahkavlingunitsoldgrid',
    
    storeConfig: {
        id: 'PKSUnitGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read:'soldunitlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Pindahkavling',
    newButtonLabel: 'New Purchaseletter',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
           
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'unit_number',
                    text: 'Unit Number'
                },
                /*
                {
                    dataIndex: 'block_block',
                    text: 'Block'
                },
                */
                {
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
        
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    dataIndex: 'type_name',
                    text: 'Type'
                },
                {
                    dataIndex: 'productcategory_productcategory',
                    text: 'Product Category'
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
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        iconCls: 'icon-approve',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Select Unit"
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function() {

        var cbf = new Erems.template.ComboBoxFields();

        var x = [
            {
                xtype: 'textfield',
                name: 'unit_number',
                fieldLabel: 'Unit number',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 30,
                anchor: '-170'
            },
            
            {
                xtype: 'combobox',
                name: 'block_id',
                displayField: cbf.block.d,
                hidden:true,
                fieldLabel: 'Block',
                valueField: cbf.block.v,
                dataBinder:'block',
                anchor: '-15'

            },
            {
                xtype: 'textfield',
                name: 'purchaseletter_no',
                fieldLabel: 'Purchaseletter No',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
            },
             {
                xtype: 'textfield',
                name: 'customer_name',
                fieldLabel: 'Customer Name',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
            }
        ];
        return x;
    }
});