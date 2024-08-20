Ext.define('Cashier.view.vdrequest.Grid', {
    extend        : 'Cashier.library.template.view.Grid',
    alias         : 'widget.vdrequestgrid',
    store         : 'VDRequest',
    bindPrefixName: 'VDRequest',
    itemId        : 'VDRequest',
    newButtonLabel: 'Add New',
    initComponent : function () {
        var me          = this;
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        Ext.applyIf(me, {
            // contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            plugins    : [cellEditing],
            selType    : 'cellmodel',
              /*selModel: {
                selType: 'cellmodel'
            },*/
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype     : 'rownumberer',
                    text      : 'No.',
                    width     : 40,
                    titleAlign: 'center',
                    align     : 'center',
                },
                me.generateActionColumn(),
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_ptname',
                    dataIndex : 'ptname',
                    width     : 150,
                    titleAlign: 'center',
                    align     : 'left',
                    
                    text: 'PT / Company',
                    allowSelection: true
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_voucher_no',
                    dataIndex : 'voucher_no',
                    width     : 100,
                    titleAlign: 'left',
                    align     : 'left',
                    text      : 'Vouch Dept No.',
                    editor    : {
                        xtype   : 'textfield',
                        disabled: true
                    },
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_vid',
                    dataIndex : 'vid',
                    width     : 120,
                    titleAlign: 'left',
                    align     : 'left',
                    
                    text  : 'Reg No.',
                    editor: {
                        xtype   : 'textfield',
                        disabled: true
                    },
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_voucher_date',
                    dataIndex : 'voucher_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Reg Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    renderer  : function (value, metaData, record, row, col, store, gridView) {
  //                        console.log(record.get('duedate'));
                        if (moment(record.get('voucher_date')).format("DD-MM-YYYY") == "01-01-1900") {
                            return '-';
                        } else {
                            return moment(record.get('voucher_date')).format("DD-MM-YYYY");
                        }

                    },
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_dataflow',
                    dataIndex : 'dataflow',
                    width     : 40,
                    titleAlign: 'center',
                    align     : 'center',
                    
                    text    : 'Flow',
                    renderer: function (value) {
                        if (value == 'O') {
                            return '<span style="color:brown">OUT</span>';
                        } else if (value == 'I') {
                            return '<span style="color:green">IN</span>';
                        }
                    }
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_amount',
                    dataIndex : 'amount',
                    width     : 120,
                    titleAlign: 'center',
                    align     : 'right',
                    
                    text    : 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_description',
                    dataIndex : 'description',
                    width     : 200,
                    titleAlign: 'left',
                    align     : 'left',
                    
                    text: 'Description'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_status',
                    dataIndex : 'status',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    
                    text: 'Status',
                    
                    renderer: function (value) {
                        if (value == '1') {
                            return '<span style="color:orange">OPEN</span>';
                        } else if (value == '2') {
                            return '<span style="color:blue">APPROVED</span>';
                        } else if (value == '3') {
                            return '<span style="color:brown">PAID</span>';
                        } else if (value == '4') {
                            return '<span style="color:green">REALIZED</span>';
                        } else if (value == '5') {
                            return '<span style="color:red">ON APPROVAL</span>';
                        } else if (value == '6') {
                            return '<span style="color:orange">ON PENDING</span>';
                        } else if (value == '7') {
                            return '<span style="color:red">REJECTED</span>';
                        }
                    }

                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_vendorname',
                    dataIndex : 'vendorname',
                    width     : 120,
                    titleAlign: 'center',
                    align     : 'left',
                    
                    text: 'Vendor/Cust./Partner'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_vendornamenote',
                    dataIndex : 'vendor_note',
                    width     : 120,
                    titleAlign: 'center',
                    align     : 'left',
                    
                    text: 'Vendor/Partner Note'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cashier_voucher_no',
                    dataIndex : 'cashier_voucher_no',
                    width     : 120,
                    titleAlign: 'left',
                    align     : 'left',
                    text      : 'Cashier Voucher No.'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cashbon_no',
                    dataIndex : 'cashbon_no',
                    width     : 100,
                    titleAlign: 'center',
                    align     : 'left',
                    text      : 'Cashbon No'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_made_by',
                    width     : 110,
                    titleAlign: 'center',
                    align     : 'left',
                    dataIndex : 'made_by',
                    hideable  : false,
                    text      : 'Made By (Cashbon)'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_kasbank',
                    dataIndex : 'kasbank',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Cash/Bank'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_chequegiro_no',
                    dataIndex : 'chequegiro_no',
                    width     : 100,
                    titleAlign: 'left',
                    align     : 'left',
                    text      : 'Cheque/Giro No.'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_department',
                    dataIndex : 'department',
                    width     : 80,
                    titleAlign: 'center',
                    align     : 'left',
                    text      : 'Department'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_chequegiro_date',
                    dataIndex : 'chequegiro_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Cheque / Giro Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_payment_date',
                    dataIndex : 'payment_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Payment Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_chequegiro_handover_date',
                    dataIndex : 'chequegiro_handover_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Handover Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cashier_voucher_date',
                    dataIndex : 'cashier_voucher_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Voucher Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_spk',
                    dataIndex : 'spk',
                    width     : 150,
                    titleAlign: 'center',
                    align     : 'left',
                    text      : 'SPK / SOP'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_createdby',
                    dataIndex : 'createdby',
                    width     : 100,
                    titleAlign: 'center',
                    align     : 'left',
                    text      : 'Created By'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cashier_note',
                    dataIndex : 'cashier_note',
                    width     : 200,
                    titleAlign: 'left',
                    align     : 'left',
                    text      : 'Cashier Note'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_send_date',
                    dataIndex : 'send_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Send Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_receive_date',
                    dataIndex : 'receive_date',
                    width     : 70,
                    titleAlign: 'center',
                    align     : 'center',
                    text      : 'Receive Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me          = this;
        var dockedItems = [
            {
                xtype : 'toolbar',
                dock  : 'top',
                height: 28,
                items : [
                    {
                        xtype     : 'button',
                        action    : 'create',
                        hidden    : true,
                        itemId    : 'btnNew',
                        margin    : '0 0 -5 0',
                        padding   : '0 0 10 0',
                        iconCls   : 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text      : me.newButtonLabel,
                        id        : 'btnAddNewVdrequest'
                    },
                    {
                        xtype     : 'button',
                        action    : 'update',
                        disabled  : true,
                        hidden    : true,
                        padding   : '0 0 10 0',
                        itemId    : 'btnEdit',
                        margin    : '0 0 10 0',
                        iconCls   : 'icon-edit',
                        text      : 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype     : 'button',
                        action    : 'destroy',
                        disabled  : true,
                        hidden    : true,
                        itemId    : 'btnDelete',
                        padding   : '0 0 10 0',
                        margin    : '0 0 10 0',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls   : 'icon-delete',
                        text      : 'Delete Selected'
                    },
                    {
                        xtype         : 'checkboxfield',
                        fieldLabel    : '',
                        itemId        : 'fd_checkusecopyvd',
                        name          : 'checkusecopyvd',
                        boxLabel      : 'Use Print Copy',
                        padding       : '0 10 20 0',
                        margin        : '0 10 10 0',
                        boxLabelCls   : 'x-form-cb-label small',
                        inputValue    : '1',
                        uncheckedValue: '0',
                        checked       : false
                    },
                    {
                        xtype     : 'button',
                        action    : 'printvoucher',
                        disabled  : true,
                        hidden    : true,
                        itemId    : 'btnPrintvoucher',
                        padding   : '0 0 10 0',
                        bindAction: me.bindPrefixName + 'Printvoucher',
                        iconCls   : 'icon-print',
                        text      : 'Print Selected'
                    },
                    {
                        xtype  : 'button',
                        action : 'copyvoucher',
                        itemId : 'btnCopyvoucher',
                        padding: '0 0 10 0',
                          //bindAction: me.bindPrefixName + 'Copyvoucher',
                        iconCls: 'icon-copy',
                        text   : 'Copy Voucher'
                    },
                    {
                        xtype  : 'button',
                        action : 'pindahptvoucher',
                        itemId : 'btnPindahptvoucher',
                        padding: '0 0 10 0',
                          //bindAction: me.bindPrefixName + 'Copyvoucher',
                        iconCls: 'icon-copy',
                        text   : 'Pindah ke PT'
                    },
                    {
                        xtype     : 'button',
                        action    : 'receivefinance',
                        disabled  : true,
                        hidden    : true,
                        itemId    : 'btnReceivefinance',
                        id        : 'btnReceivefinance',
                        icon      : 'app/main/images/icons/receivebyfinance.png',
                        padding   : '0 0 10 0',
                        text      : 'Receive Finance',
                        bindAction: me.bindPrefixName + 'ReceiveFinance'
                    },
                    {
                        xtype     : 'button',
                        action    : 'check',
                        disabled  : true,
                        hidden    : true,
                        itemId    : 'btnCheckapproval',
                        id        : 'btnCheckapproval',
                        icon      : 'app/main/images/icons/checkapproval.png',
                        padding   : '0 0 10 0',
                        text      : 'Check',
                        bindAction: me.bindPrefixName + 'Check'
                    },
                ]
            },
            {
                xtype : 'toolbar',
                dock  : 'bottom',
                height: 28,
                items : [
                {
                    text: 'Options',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype     : 'button',
                                action    : 'needrevise',
                                itemId    : 'btnNeedrevise',
                                disabled  : true,
                                hidden    : false,
                                bindAction: me.bindPrefixName + 'Needrevise',
                                text      : 'Need Revise',
                                margin    : '5 5 5 5',
                            },
                            {
                                xtype     : 'button',
                                action    : 'unsent',
                                itemId    : 'btnUnsent',
                                disabled  : true,
                                hidden    : false,
                                bindAction: me.bindPrefixName + 'Unsent',
                                text      : 'Unsend to Finance',
                                margin    : '5 5 5 5',
                            },
                            {
                                xtype     : 'button',
                                action    : 'unreceive',
                                itemId    : 'btnUnreceive',
                                disabled  : true,
                                hidden    : false,
                                bindAction: me.bindPrefixName + 'Unreceive',
                                text      : 'Unreceive Finance',
                                margin    : '5 5 5 5',
                            },
                            {
                                xtype     : 'button',
                                action    : 'unapprove',
                                itemId    : 'btnUnapprove',
                                disabled  : true,
                                hidden    : false,
                                bindAction: me.bindPrefixName + 'Unapprove',
                                text      : 'Uncheck Approval',
                                margin    : '5 5 5 5',
                            },
                        ],
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex : 1
                },
                {
                    xtype      : 'pagingtoolbar',
                    dock       : 'bottom',
                    width      : 380,
                    displayInfo: true,
                    store      : this.getStore()
                },
                ] 
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype    : 'actioncolumn',
            hidden   : true,
            itemId   : 'actioncolumn',
            width    : 30,
            resizable: false,
            align    : 'right',
            
            items: [
                {
                    text      : 'Edit',
                    iconCls   : 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText   : 'Edit',
                    tooltip   : 'Edit'
                },
                {
                    text      : 'Delete',
                    iconCls   : 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText   : 'Delete',
                    tooltip   : 'Delete'
                },
                {//========= added on jan 3rd 2019 by Semy
                    text      : 'Unapprove',
                    iconCls   : 'icon-unapprove',
                    className : 'unapprove',
                    bindAction: me.bindPrefixName + 'Unapprove',
                    altText   : 'Unapprove',
                    tooltip   : 'Unapprove',
                    id        : 'unapprove',
                },
                  /*
                {
                    xtype     : 'button',
                    action    : 'sendmail',
                    hidden    : true,
                    itemId    : 'btnSendmail',
                    hidden    : true,
                    icon      : 'app/main/images/icons/email.png',
                    margin    : '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Sendmail',
                    text      : 'Send Approval Mail'
                },
                */
                {//========= added on march 15th 2016 by Tirtha
                    text      : 'View',
                    iconCls   : 'icon-search',
                    className : 'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText   : 'View',
                    tooltip   : 'View'
                },
                {//========= added on jan 3rd 2019 by Semy
                    text      : 'Self Approve',
                    iconCls   : 'icon-approve',
                    className : 'approvesby',
                    bindAction: me.bindPrefixName + 'Approvesby',
                    altText   : 'Self Approve',
                    tooltip   : 'Self Approve',
                    id        : 'approvesby',
                },
                {//========= added on jan 3rd 2019 by Semy
                    text      : 'Sync Approval',
                    iconCls   : 'icon-refresh',
                    className : 'approvesby',
                    bindAction: me.bindPrefixName + 'Approvesby',
                    altText   : 'Sync Approval',
                    tooltip   : 'Sync Approval',
                    id        : 'approvesbysync',
                },
                {
                    text      : 'Approve Pajak',
                    iconCls   : 'icon-approve2',
                    className : 'approvepajak',
                    bindAction: me.bindPrefixName + 'Approvepajak',
                    altText   : 'Approve Pajak',
                    tooltip   : 'Approve Pajak',
                    id        : 'approvepajak',
                },
                {//========= added on 19/11/2021 by SEFTIAN ALFREDO
                    text      : 'Send To Finance',
                    icon      : 'app/main/images/icons/sendtofinance.png',
                    className : 'sendfinance',
                    bindAction: me.bindPrefixName + 'SendFinance',
                    altText   : 'Send To Finance',
                    tooltip   : 'Send To Finance',
                    id        : 'sendfinance',
                },
                {//========= added on 09/12/2021 by SEFTIAN ALFREDO
                    text      : 'Receive By Finance',
                    icon      : 'app/main/images/icons/receivebyfinance.png',
                    className : 'receivefinance',
                    bindAction: me.bindPrefixName + 'ReceiveFinance',
                    altText   : 'Receive By Finance',
                    tooltip   : 'Receive By Finance',
                    id        : 'receivefinance',
                },
                {//========= added on 19/11/2021 by SEFTIAN ALFREDO
                    text      : 'Check',
                    icon      : 'app/main/images/icons/checkapproval.png',
                    className : 'checkApproval',
                    bindAction: me.bindPrefixName + 'Check',
                    altText   : 'Check',
                    tooltip   : 'Check Approval',
                    id        : 'checkapproval',
                },
                {//========= added on jan 3rd 2019 by Semy
                    text      : 'Self Unapprove',
                    iconCls   : 'icon-unapprove',
                    className : 'unapprovesby',
                    bindAction: me.bindPrefixName + 'Unapprovesby',
                    altText   : 'Self Unapprove',
                    tooltip   : 'Self Unapprove',
                    id        : 'unapprovesby',
                },
            ]
        };
        return ac;
    },

    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, statusrequest, actioncolumn, actioncolumngrid, eventdata, classdata, acedit, acdelete, acemail
                        , action;
                nodes = view.getNodes();

                var rolepajak = ["1099","3250"];

                for (i = 0; i < nodes.length; i++) {
                    node                 = nodes[i];
                    record               = view.getRecord(node);
                    status               = record.get('status');
                    statusrequest        = record.get('requestmail');
                    is_pajak             = record.get('is_pajak');
                    is_approvepajak      = record.get('is_approvepajak');
                    approvepajak_user_id = record.get('approvepajak_user_id');
                    send_date            = record.get('send_date');
                    receive_date         = record.get('receive_date');

                    cells            = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata        = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action           = eventdata.childNodes;

                    acedit         = action[0];
                    acdelete       = action[1];
                    acemail        = action[2];
                    approvesby     = action[4];
                    approvesbysync = action[5];
                    approvepajak   = action[6];
                    sendfinance    = action[7];
                    receivefinance = action[8];
                    checkApproval  = action[9];
                    unapprovesby   = action[10];

                    // STATUS OPEN
                    if (status == 1) {
                        approvesbysync.remove();
                        unapprovesby.remove();
                        sendfinance.remove();
                        receivefinance.remove();
                        checkApproval.remove(); 
                    }

                    // STATUS APPROVE
                    if (status == 2) {
                        acedit.remove();
                        acdelete.remove();
                        approvesby.remove(); 

                        // KONDISI CGG
                        if (!send_date && !receive_date) {
                            receivefinance.remove();
                            checkApproval.remove();
                        }
                        else if (send_date && !receive_date) {
                            sendfinance.remove();
                            checkApproval.remove(); 
                            unapprovesby.remove();
                        }
                        else if (send_date && receive_date) {
                            sendfinance.remove();
                            receivefinance.remove(); 
                            unapprovesby.remove();
                        }
                    }

                    if (status > 2) {
                        sendfinance.remove();
                        receivefinance.remove();
                        checkApproval.remove(); 
                        unapprovesby.remove();
                    }
                    
                    if(rolepajak.includes(apps.gid)){
                        if (status !== '5') {
                            acedit.remove();
                            acdelete.remove();
                            approvesby.remove(); 
                            approvesbysync.remove();
                        }
                    }else{
                        if (status !== '1' && status !== '2') {
                            acedit.remove();
                            acdelete.remove();
                            approvesby.remove(); 
                            approvesbysync.remove();
                        }

                    }

                    if (approvepajak_user_id !== 99) {
                        approvepajak.remove();
                    }

                    if (is_pajak == 1 && is_approvepajak == 1) {
                        approvepajak.remove();
                    }else if (is_pajak !== 1) {
                        approvepajak.remove();
                    }

                    if (statusrequest == '1') {
                        acemail.remove();
                    }

                      //no more email
                    acemail.remove();

                }
            }
        }
    },
});


