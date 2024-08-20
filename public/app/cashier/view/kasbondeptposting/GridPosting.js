Ext.define('Cashier.view.kasbondeptposting.GridPosting', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kasbondeptpostinggridnew',
    store:  'KasbondeptpostingNew',
    bindPrefixName: 'KasbondeptPosting',
    itemId: 'KasbondeptPostingNew',
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
                    width: 100,
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
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kasbank',
                    dataIndex: 'kasbank',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Trans. Cash/Bank',
                    renderer: function (value) {
                        if (value == 'K') {
                            return 'CASH';
                        } else if (value == 'B') {
                            return 'BANK';
                        } else {
                            return '-';
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
                    width: 200,
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
                    width: 200,
                    hideable: false,
                    text: 'Amount check for balance',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount_kembali',
                    titleAlign: 'center',
                    align: 'right',
                    dataIndex: 'amount_cashback',
                    width: 200,
                    hideable: false,
                    text: 'Amount Cashback',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remainingkasbon',
                    dataIndex: 'remainingkasbon',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    text: 'Remaining Kasbon',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
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
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
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
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'editremaining',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnEditRemaining',
                        bindAction: me.bindPrefixName + 'Editremaining',
                        // iconCls: 'icon-delete',
                        text: 'Edit Remaining'
                    },
                    {
                        xtype: 'button',
                        action: 'resetkasbon',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnResetKasbon',
                        bindAction: me.bindPrefixName + 'Resetkasbon',
                        // iconCls: 'icon-delete',
                        text: 'Reset Kasbon'
                    },
                ],

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
                    action: 'posting',
                    hidden: true,
                    itemId: 'btnPosting',
                    icon: 'app/main/images/icons/posting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Posting',
                    text: 'Apply',
                     tooltip: 'Realization'
                },
                {
                    xtype: 'button',
                    action: 'unposting',
                    hidden: true,
                    itemId: 'btnUnposting',
                    icon: 'app/main/images/icons/unposting.png',
                    margin: '0 0 0 0',
                    bindAction: me.bindPrefixName + 'Unposting',
                    text: 'Un Apply',
                     tooltip: 'Unrealization'
                },
                  {
                        xtype: 'button',
                        action: 'preview',
                        itemId: 'btnPreview',
                        icon: 'app/main/images/icons/search.png',
                        margin: '0 0 0 0',
                        bindAction: me.bindPrefixName+'Preview',
                        text: 'Preview',
                         tooltip: 'Preview'
                },
                 {
                        xtype: 'button',
                        action: 'cashback',
                        itemId: 'btnCashback',
                        icon: 'app/main/images/icons/cashback.png',
                        margin: '0 0 0 0',
                        bindAction: me.bindPrefixName+'Cashback',
                        text: 'Cashback',
                         tooltip: 'Cashback'
                },
                 {
                        xtype: 'button',
                        action: 'uncashback',
                        itemId: 'btnUncashback',
                        icon: 'app/main/images/icons/uncashback.png',
                        margin: '0 0 0 0',
                        bindAction: me.bindPrefixName+'Uncashback',
                        text: 'Uncashback',
                         tooltip: 'Uncashback'
                }
                    
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
                var status, actioncolumn, actioncolumngrid, eventdata, classdata, acposting, acunposting,
                        acedit, acdelete, action, kasbank, remainingkasbon, amountcashback,cashbackby, is_realized, is_posting, realizedposting, open_voucher, amountbayar, kasbank_id, voucher_id, amount, project_id;
                var disableRealizationProject = [3, 81, 2056, 2057, 2086, 4031, 4034, 4036, 4061, 5104, 11137];
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('status');
                    kasbank = record.get('kasbank');
                    remainingkasbon = record.get('remainingkasbon');
                    amountcashback = record.get('amount_cashback');
                    amountbayar = record.get('amount_bayar');
                    is_cashback = record.get('is_cashback');
                    is_realized = record.get('is_realized');
                    is_posting = record.get('is_posting');
                    open_voucher = record.get('open_voucher');
                    kasbank_id = record.get('kasbank_id');
                    voucher_id = record.get('voucher_id');
                    amount = record.get('amount'); 
                    realizedposting = parseInt(is_realized) + parseInt(is_posting);
                    cashbackby = record.get('cashbackby');
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[2];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acedit = action[0];
                    acdelete = action[1];
                    acposting = action[2];
                    acunposting = action[3];
                    acpreview = action[4];
                    accashback = action[5];
                    acuncashback = action[6];
                    project_id = record.get('project_id');
                    
                    if ( disableRealizationProject.includes(project_id) ) {
                        acunposting.remove();
                    }                 

                    switch (status) {
                        case '1':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            acunposting.remove();
                            break;
                        case '2':
                            acdelete.remove();
                            accashback.remove();
                            if (kasbank == 'K' || kasbank == '') {
                                acposting.remove();
                            }
                            acunposting.remove();
                            break;
                        case '3':
                            acuncashback.remove();
                            if(status != '3' || (remainingkasbon <= 0 && amountbayar > 0)) {  // bank, sudah pernah cashback, ada voucher belum realisasi, yang sudah habis dipakai
                                        accashback.remove();
                            }
                            if(remainingkasbon != amount){
                                acunposting.remove();
                            }
                           /*  if(is_cashback == 1 || is_realized == '0' || (remainingkasbon <= 0 && amountbayar > 0) || (open_voucher != '' && amountbayar >= 0)) {  // bank, sudah pernah cashback, ada voucher belum realisasi, yang sudah habis dipakai
                                        accashback.remove();
                            }
                           if(is_cashback == 0){
                                    acuncashback.remove();
                            }*/

                            if(remainingkasbon < 0 || (amountbayar == amount) || is_cashback == 1){
                                acedit.remove();
                            }
                           
                           // acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            break;
                        case '4':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            acunposting.remove();
                            break;
                        case '5':
                            acedit.remove();
                            acdelete.remove();
                            acposting.remove();
                            acunposting.remove();
                            break;
                    }

                }
            }
        }
    },
});


