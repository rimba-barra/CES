Ext.define('Erems.view.verification.UnitGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.verificationunitgrid',
    storeConfig: {
        id: 'VerapUnitGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read: 'unitlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Verification',
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
                    dataIndex: 'unit_number',
                    text: 'Unit Number'
                },
                {
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchase Letter No.',
                    width: 200
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'purchaseletter_purchase_date',
                    text: 'Purchase Letter Date'
                },
                {
                    dataIndex: 'type_name',
                    text: 'Type'
                },
                {
                    dataIndex: 'purchaseletter_customer_name',
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