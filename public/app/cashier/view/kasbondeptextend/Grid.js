Ext.define('Cashier.view.kasbondeptextend.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptextendgrid',
    store: 'Kasbondeptextend',
    bindPrefixName: 'KasbondeptExtend',
    itemId: 'KasbondeptExtend',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                  me.generateActionColumn(),
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    width: 120,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Cashbon No',
                    
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description',
                    
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    width: 120,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining',
                    width: 120,
                    dataIndex: 'remainingkasbon',
                    hideable: false,
                    text: 'Remaining',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_first_claim_date',
                    width: 120,
                    dataIndex: 'first_claim_date',
                    hideable: false,
                    text: 'First Claim Date',
                      renderer: Ext.util.Format.dateRenderer('d-m-Y')
                    
                },
               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_first_project_claim_date',
                    width: 125,
                    dataIndex: 'first_project_claim_date',
                    hideable: false,
                    text: 'First Project Claim Date',
                      renderer: Ext.util.Format.dateRenderer('d-m-Y')
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_last_claim_date',
                    width: 100,
                    dataIndex: 'last_claim_date',
                    hideable: false,
                    text: 'Last Claim Date',
                      renderer: Ext.util.Format.dateRenderer('d-m-Y')
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_last_project_claim_date',
                    width: 125,
                    dataIndex: 'last_project_claim_date',
                    hideable: false,
                    text: 'Last Project Claim Date',
                      renderer: Ext.util.Format.dateRenderer('d-m-Y')
                    
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_extension_days',
                    width: 120,
                    dataIndex: 'extension_days',
                    hideable: false,
                    text: 'Extension Days',
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_reason',
                    width: 100,
                    dataIndex: 'reason',
                    hideable: false,
                    text: 'Reason',
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 130,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Addon',
                      renderer: Ext.util.Format.dateRenderer('d-m-Y h:m:s')
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    width: 115,
                    dataIndex: 'addby',
                    hideable: false,
                    text: 'Addby',
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 100,
                    dataIndex: 'status',
                    hideable: false,
                    text: 'Status',
                      renderer: function (value) {
                        if (value == '') {
                            return '<span style="color:green">PENDING</span>';
                        } else if (value == 'A') {
                            return '<span style="color:blue">APPROVED</span>';
                        } else if (value == 'D') {
                            return '<span style="color:red">DECLINED</span>';
                        }
                    }
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approval_on',
                    width: 100,
                    dataIndex: 'approval_date',
                    hideable: false,
                    text: 'Approval On',
                      renderer: Ext.util.Format.dateRenderer('d-m-Y')
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approval_by',
                    width: 120,
                    dataIndex: 'approval_by',
                    hideable: false,
                    text: 'Approved / Rejected By',
                    
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approval_notes',
                    width: 100,
                    dataIndex: 'approval_notes',
                    hideable: false,
                    text: 'Notes',
                    
                },
                
             
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
                        action: 'generate',
                        //disabled: true,
                        itemId: 'btnGenerate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Populate from COA',
                        hidden: true,
                    },
                     {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                       // bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        //bindAction: me.bindPrefixName + 'Delete'
                    },
                    
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
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            dataIndex: 'status',
            items: [
                
                {
                    xtype: 'button',
                    action: 'approve',
                    itemId: 'btnApprove',
                    icon: 'app/main/images/icons/approve.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Approve',
                    tooltip: 'Approve'
                },
                {
                    xtype: 'button',
                    action: 'decline',
                    itemId: 'btnDecline',
                    icon: 'app/main/images/icons/cancel.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Decline',
                    tooltip: 'Decline'
                },
                 {
                    xtype: 'button',
                    action: 'print',
                    itemId: 'btnPrint',
                    icon: 'app/main/images/icons/printer.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Print',
                    tooltip: 'Print'
                },
               
               
            ],
        };
        return ac;
    },
     viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, acposting, acunposting,
                        acedit, acdelete, action, kasbank, remainingkasbon, amountcashback,cashbackby, is_realized, is_posting, realizedposting, open_voucher, amountbayar, kasbank_id, voucher_id, amount;
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    //console.log(record);
                    status = record.get('status');
                    
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acApprove = action[0];
                    acDecline = action[1];
                    acPrint = action[2];
                   
                    
                 

                    switch (status) {
                       
                        case 'A':
                            acApprove.remove();
                            acDecline.remove();
                        
                            break;
                        case 'D':
                            acDecline.remove();
                            acPrint.remove();
                            acApprove.remove();
                            break;
                    }
                    

                }
            }
        }
    },
});


