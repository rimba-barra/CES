Ext.define('Cashier.view.kasbondept.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptgrid',
    store: 'Kasbondept',
    bindPrefixName: 'Kasbondept',
    itemId: 'Kasbondept',
    newButtonLabel: 'Add New',
    initComponent: function () {
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
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Departement'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_no',
                    width: 90,
                    hideable: false,
                    text: 'CA NO'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_date',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'voucher_date',
                    width: 80,
                    hideable: false,
                    text: 'CA DATE',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    dataIndex: 'status',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == '1') {
                            return '<span style="color:green">OPEN</span>';
                        } else if (value == '2') {
                            return '<span style="color:blue">APPROVED</span>';
                        } else if (value == '4') {
                            return '<span style="color:brown">APPLIED</span>';
                        }else if (value == '3') {
                            return '<span style="color:purple">REALIZED</span>';
                        }else if (value == '5') {
                            return '<span style="color:red">CLOSED</span>';
                        }else if (value == '6') {
                            return '<span style="color:red">DECLINED</span>';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount',
                    width: 150,
                    hideable: false,
                    text: 'Amount Request',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_bayar',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_bayar',
                    width: 150,
                    hideable: false,
                    text: 'Amount has been paid',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_selisih',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_selisih',
                    width: 150,
                    hideable: false,
                    text: 'Amount check for balance',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_cashback',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_cashback',
                    width: 150,
                    hideable: false,
                    text: 'Amount Cashback',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remainingkasbon',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'remainingkasbon',
                    width: 150,
                    hideable: false,
                    text: 'Remaining Cashbon',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'description',
                    width: 200,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_statusrequestemail',
                    dataIndex: 'statusrequestemail',
                    width: 130,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Request Approval Mail'
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_iscashback',
                    width: 80,
                    dataIndex: 'is_cashback',
                    hideable: false,
                    text: 'Is Cashback',
                    renderer: me.checkBoxStatus
                },
                   {
                    xtype: 'gridcolumn',
                    itemId: 'colms_madebyname',
                    width: 80,
                    dataIndex: 'made_by_name',
                    hideable: false,
                    text: 'Made By',
                },
                
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_madebyname',
                    width: 80,
                    dataIndex: 'made_by_name',
                    hideable: false,
                    text: 'Made By',
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approval_user',
                    width: 80,
                    dataIndex: 'approval_user',
                    hideable: false,
                    text: 'Approval User',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approval_date',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'approval_date',
                    width: 120,
                    hideable: false,
                    text: 'Approval Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
               
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approval_notes',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'approval_notes',
                    width: 200,
                    hideable: false,
                    text: 'Approval Notes'
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
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
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    {
                        xtype: 'button',
                        action: 'printdata',
                        hidden: false,
                        itemId: 'btnPrintdata',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                       {
                        xtype: 'button',
                        action: 'copycashbon',
                        itemId: 'btnCopyvoucher',
                        margin: '0 5 0 0',
                        iconCls: 'icon-copy',
                        text: 'Copy Cashbon'
                    },
                    {
                        xtype: 'button',
                        action: 'trackingcashbon',
                        itemId: 'btnTracking',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'Tracking Cashbon'
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
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                {
                    xtype: 'button',
                    action: 'sendmail',
                    hidden: true,
                    itemId: 'btnSendmail',
                    icon: 'app/main/images/icons/email.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Sendmail',
                    text: 'Send Approval Mail'
                },
                {//========= added on march 15th 2016 by Tirtha
                    text: 'View',
                    iconCls: 'icon-search',
                    className: 'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                },
                 {
                    xtype: 'button',
                    action: 'extend',
                    itemId: 'btnExtend',
                    icon: 'app/main/images/icons/extend.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Extend',
                    tooltip: 'Extend Cashbon'
                },
                 {
                    xtype: 'button',
                    action: 'attachment',
                    itemId: 'btnAttachment',
                    icon: 'app/main/images/icons/file_attachment.jpg',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Attachment',
                    tooltip: 'Attachment'
                },
                {
                    text: 'Print Cashbon Extension',
                    iconCls: 'icon-print',
                    action : 'printextension',
                    bindAction: me.bindPrefixName + 'PrintExtension',
                    altText: 'Print Cashbon Extension',
                    tooltip: 'Print Cashbon Extension'
                },
            ],
        };
        return ac;
    },
     checkBoxStatus: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_cashback';
        return this.comboBoxFieldGen(name, record, false);  
    },
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(record.get("is_cashback") == 0){
                var a = '';

            }else{
                var a = '&#10003;';
            }
       
        } 
        return a;  
    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, level, flag, cells, j, i;
                var status, statusrequest, actioncolumn, actioncolumngrid, eventdata, classdata, acedit, acdelete, acemail
                        , action, remainingkasbon, acextend, kasbon_extension_id,is_approval,unapproved_date,acprintextend;
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('status');
                    statusrequest = record.get('requestmail');
                    remainingkasbon = record.get('remainingkasbon');
                    kasbon_extension_id =  record.get('kasbon_extension_id');
                    is_approval = record.get('is_approval');
                    unapproved_date = record.get('unapproved_date');


                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;

                    acedit = action[0];
                    acdelete = action[1];
                    acemail = action[2];
                    acextend = action[4];
                    acprintextend = action[6];

                    if (status !== '1' && status !== '2') {
                        acedit.remove();
                        acdelete.remove();
                    }

                    if (statusrequest == '1') {
                        acemail.remove();
                    }

                    if (status !== '3'){
                    	acextend.remove();
                    }

                    if (status == '2' && is_approval == '1' ){
                        acedit.remove();
                    }

                    if(status == '6' && unapproved_date != ''){
                        acedit.remove();
                        acdelete.remove();
                    }

                    if(kasbon_extension_id == 0){
                        acprintextend.remove();
                    }



                    //no more email
                    acemail.remove();
                }
            }
        }
    },
});


