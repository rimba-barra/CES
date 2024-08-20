Ext.define('Erems.view.reservation.UnitGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.reservationunitgrid',
    storeConfig: {
        id: 'CNUnitGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read: 'unitlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Reservation',
    newButtonLabel: 'New Purchaseletter',
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
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 110,
                    dataIndex: 'block_block',
                    hideable: false,
                    text: 'Block Name'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 110,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                }, {
                    xtype: 'gridcolumn',
                    itemId: 'colms_productcategory',
                    width: 110,
                    dataIndex: 'productcategory_productcategory',
                    hideable: false,
                    text: 'Category'
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
                hidden:true
            }
        ];
        return x;
    }
});