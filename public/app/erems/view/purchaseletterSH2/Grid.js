Ext.define('Erems.view.purchaseletterSH2.Grid',{
    alias:'widget.purchaseletterSH2grid',
    bindPrefixName:'PurchaseletterSH2',
    newButtonLabel:'New Purchaseletter',
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'PurchasletterSH2GridStore',
        idProperty:'purchaseletter_id',
        extraParams:{}
    },
   
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer',
                    width:30
                },
                //edited by Rizal 1 Maret 2019
                {
                    xtype: 'gridcolumn',
                    header: 'Purchaseletter ID',
                    dataIndex: 'purchaseletter_id',
                    hidden: true
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Auto SMS',
                    dataIndex: 'is_auto_sms',
                    hidden: true,
                    width: 60,
                    renderer: me.inlineEditSMS
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Not Allowed SP',
                    dataIndex: 'is_not_allowed_sp',
                    hidden: true,
                    width: 80,
                    renderer: me.inlineEditSP
                },
                //endedited
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan asd'
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
                // add by hadi 22082019
                {
                    xtype: 'gridcolumn',
                    header: 'Is Draft',
                    dataIndex: 'is_draft',
                    hidden: true
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
    }
    //edited by Rizal 1 Maret 2019
    ,inlineEditSMS: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_auto_sms';
        return this.comboBoxFieldGen(name, record, true);  
    },
    inlineEditSP: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_not_allowed_sp';
        return this.comboBoxFieldGen(name, record, true);  
    }
    ,
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
            }else{
                var a = '&#10003;';
            }
        } else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
            }else{
                var a = '';
            }
        }
        return a;  
    }
    //endedited
    //edited by hadi 21082019
    ,generateDockedItems: function() {
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
                        text: me.newButtonLabel,
                        disabled: true
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
    }
    ,generateActionColumn: function() {
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
                // {
                //     text: 'Edit',
                //     iconCls: 'icon-edit',
                //     bindAction: me.bindPrefixName + 'Update',
                //     altText: 'Edit',
                //     tooltip: 'Edit',
                //     hidden:true
                // },
                // {
                //     text: 'Delete',
                //     iconCls: 'icon-delete',
                //     bindAction: me.bindPrefixName + 'Delete',
                //     altText: 'Delete',
                //     tooltip: 'Delete',
                //     hidden:true
                // }
            ]
        };
        return ac;
    }
    //edited by hadi 21082019
});