Ext.define('Erems.view.otherspayment.UnitGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.otherspaymentunitgrid',
    
    storeConfig: {
        id: 'OPUnitGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read:'soldunitlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Otherspayment',
    newButtonLabel: 'New Unit',
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
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 200,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 110,
                    dataIndex: 'block_block',
                    hideable: false,
                    text: 'Block Name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 110,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_productcategory',
                    width: 110,
                    dataIndex: 'productcategory_productcategory',
                    hideable: false,
                    text: 'Category'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'purchaseletter_customer_name',
                    hideable: false,
                    text: 'Customer Name'
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
                fieldLabel: 'Customer Name ',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 50,
            },
        ];
        return x;
    }
});