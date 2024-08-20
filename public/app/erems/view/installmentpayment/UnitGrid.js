Ext.define('Erems.view.installmentpayment.UnitGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.installmentpaymentunitgrid',
    storeConfig: {
        id: 'IPUnitGridStore',
        idProperty: 'purchaseletter_id',
        extraParams: {
            mode_read: 'soldunitlist',
//            is_draft: 1
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
            selModel: {
                selType: 'checkboxmodel',
                mode: 'SINGLE',
                allowDeselect: true     
            },
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
                        itemId:'selectUnit',
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
                anchor: '-15',
                listeners:{
                    beforequery: function(record){
                        record.query = new RegExp(record.query, 'i');
                        record.forceAll = true;
                    }
                }
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
            //add by fatkur 22092020
            ,{
                xtype: 'checkboxfield',
                itemId: 'btnCheckDraft',
                name: 'is_draft',
                fieldLabel: 'SPT Draft',
                hidden:true,
                checked: false,
                inputValue: '1',
                uncheckedValue: '0'
            }
            //endadd
        ];
        return x;
    }
});