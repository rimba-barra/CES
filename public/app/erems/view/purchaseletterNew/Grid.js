Ext.define('Erems.view.purchaseletterNew.Grid',{
    extend: 'Erems.library.template.view.Grid',
    alias:'widget.purchaseletterNewgrid',
    store:'PurchaseletterNew',
    bindPrefixName:'PurchaseletterNew',
   // itemId:'',
    newButtonLabel:'New purchaseletter',
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
                // {
                //     xtype: 'actioncolumn',
                //     itemId: 'viewspt',
                //     width: 50,
                //     resizable: false,
                //     align: 'left',
                //     hideable: false,
                //     items: [
                //         {
                //             tooltip: 'View SPT',
                //             icon: document.URL+'app/main/images/icons/pdf.png',
                //             handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                //                 this.fireEvent( 'viewspt', arguments );
                //             }
                //         }
                //     ]
                // },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },{
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },{
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'purchase_date',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Tanggal Pesanan'
                },{
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Nomor Pesanan'
                },{
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'harga_total_jual',
                    hideable: false,
                    align:'right',
                    text: 'Harga Jual'
                },{
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'pengalihanhak_name',
                    hideable: false,
                    text: 'Last Owner'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'total_payment',
                    hideable: false,
                    align:'right',
                    text: 'Total Payment'
                },{
                    xtype: 'numbercolumn',
                    width: 50,
                    dataIndex: 'persen_payment',
                    hideable: false,
                    align:'right',
                    text: '% Pay'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_sales_name',
                    width: 100,
                    dataIndex: 'salesman_employee_name',
                    hideable: false,
                    text: 'Sales Name'
                },{
                    xtype: 'gridcolumn',
            
                    width: 70,
                    dataIndex: 'pricetype_pricetype',
                    hideable: false,
                    text: 'Price Type'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_member_name',
                    width: 100,
                    dataIndex: 'clubcitra_member',
                    hideable: false,
                    text: 'Member Name'
                },{
                    xtype: 'gridcolumn',
          
                    width: 100,
                    dataIndex: 'unit_virtualaccount_bca',
                    hideable: false,
                    text: 'VA BCA'
                },{
                    xtype: 'gridcolumn',
          
                    width: 100,
                    dataIndex: 'unit_virtualaccount_mandiri',
                    hideable: false,
                    text: 'VA Mandiri'
                },
                {
                    dataIndex: 'api_aci',
                    text: 'ACI',
                    xtype: 'booleancolumn',
                    width:50,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'Addon',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'Tanggal Input'
                },
                {
                    xtype: 'datecolumn',
                    width: 130,
                    dataIndex: 'firstpurchase_date',
                    format:'d-m-Y',
                    hideable: false,
                    text: 'First Purchase Date'
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
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        bindAction: me.bindPrefixName + 'Update',
                        text: 'Edit',
                        disabled: true
                    },
                    {
                        xtype: 'button',
                        action: 'editdraft',
                        itemId: 'btnEditdraft',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit Draft',
                        disabled: true,
                        hidden:true
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        bindAction: me.bindPrefixName + 'Delete',
                        text: 'Delete Selected',
                        disabled: true
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            // hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit',
                    hidden:true
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete',
                    hidden:true
                }
            ]
        };
        return ac;
    }
});