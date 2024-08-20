Ext.define('Cashier.view.installmentpayment.UnitGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.installmentpaymentunitgrid',
    storeConfig: {
        id: 'IPUnitGridStore',
        idProperty: 'purchaseletter_id',
        extraParams: {
            mode_read: 'soldunitlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Installmentpayment',
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
                    dataIndex: 'cluster_cluster',
                    text: 'Cluster'
                },
                {
                    dataIndex: 'block_block',
                    text: 'Block'
                },
                {
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number'
                },
                {
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No.',
                    width: 200
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'purchase_date',
                    text: 'Purchase Letter Date'
                },
                {
                    dataIndex: 'type_name',
                    text: 'Type'
                },
                {
                    dataIndex: 'customer_name',
                    text: 'Customer Name'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'purchaseletter_harga_total_jual',
                    text: 'Sales Price',
                },
                {
                    dataIndex: 'land_size',
                    text: 'Land Size'
                },
                {
                    dataIndex: 'building_size',
                    text: 'Building Size'
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

        var cbf = new Cashier.template.ComboBoxFields();

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