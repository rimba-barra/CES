Ext.define('Cashier.view.journal.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.journalgrid',
    bindPrefixName: 'Journal',
    storeConfig: {
        id: 'JournalGridStore',
        idProperty: 'journal_id',
        extraParams: {
            openingbalance: 0
        }
    },
    // itemId:'',
    id: 'journalgridID',
    newButtonLabel: 'New Journal ',
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
                    xtype: 'rownumberer',
                    resizable: true,
                    width: 50,
                },
                {
                    xtype: 'gridcolumn',
                    width: 30,
                    hidden:true,
                    name: 'is_angsuran',
                    hideable: false,
                    text: '[*]',
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var payment_paymentflag_id = record.get('payment_paymentflag_id');
                        if (payment_paymentflag_id=="1") {
                            return '<img width="16" height="16" src=' + document.URL + 'app/cashier/images/user.png' + '>';
                        }

                    },
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'jid',
                    hideable: false,
                    text: 'Journal ID'
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Journal No.',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'debit_total',
                    hideable: false,
                    text: 'Debet',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'credit_total',
                    hideable: false,
                    text: 'Kredit',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right',
                    emptyText: 0,
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'journal_date',
                    hideable: false,
                    text: 'Journal Date',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 270,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description',
                    renderer: Ext.util.Format.uppercase
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'invoice_no',
                    hideable: false,
                    text: 'Invoice No.',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'addby',
                    hideable: false,
                    text: 'Add By',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Addon',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'modiby',
                    hideable: false,
                    text: 'Modi By',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'modion',
                    hideable: false,
                    text: 'Modion',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'is_memorialcashflow',
                    hideable: false,
                    hidden: true,
                    text: 'is_memorialcashflow.',
                },
                  {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'prefix_is_printjournal',
                    hideable: false,
                    hidden: true,
                    text: 'is_printjournal',
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    viewConfig: {
        preserveScrollOnRefresh: true,
        listeners: {
            refresh: function (view) {
                var color, nodes, node, record, level, flag, cells, j, i;
                var jno, jid;
                // get all grid view nodes
                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    // get node record
                    record = view.getRecord(node);
                    // get level from record data    
                    jno = record.get("journal_no"); 
                    jid = record.get("jid"); 
                    if(jno==null){
                        jno='00000';
                    }
                   
                    if (record.get("is_memorialcashflow") == "1" || jno.substr(0,3) == "MCF") {
                        level = '#BADDB4'; // memorial cashflow
                    }else {
                        level = '#F1C9BA'; // memorial journal
                    }
                   if(jid){
                        if(jid.substr(0,2) == 'VC'){
                            level = '#FCD03D'; // made by system
                        }                        
                    } 


                    cells = Ext.get(node).query('td');
                    // set bacground color to all row td elements
                    for (j = 0; j < cells.length; j++) {
                        Ext.fly(cells[j]).setStyle('background-color', level);
                    }
                }

            }
        }
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
                        action: 'create',
                        //disabled: true,
                        itemId: 'btnCreate',
                        id: 'btnAddNewJournal',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add new journal',
                        bindAction: me.bindPrefixName + 'Create'
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                     {
                        xtype: 'button',
                        action: 'printjournal',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnPrintjournal',
                        padding: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Printjournal',
                        iconCls: 'icon-print',
                        text: 'Print Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'copyjournal',
                        align: 'right',
                        margin: '0 5 0 0',
                        iconCls: 'icon-copy',
                        itemId: 'btncopyjournal',
                        text: 'Copy Journal',
						hidden: false
                    },
                     {
                        xtype: 'button',
                        action: 'genjournalpph',
                        itemId: 'btngenjournalpph',
                        align: 'right',
                        margin: '0 5 0 0',
                        //iconCls: 'icon-copy',
                        text: 'Generate Journal PPH',
                        hidden: false
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'combobox',
                        name: 'limit',
//                        fieldLabel: 'Records per Page',
                        emptyText: 'Records per Page',
                        queryMode: 'local',
                        valueField: 'limit',
                        // fieldLabel:'Cash IN/OUT',
                        //allowBlank: false,
                        forceSelection: true,
                        displayField: 'description',
                        width: 130,
                        store: new Ext.data.JsonStore({
                            fields: ['limit', 'description'],
                            data: [
                                {limit: '25', description: 'Default'},
                                {limit: '100', description: '100'},
                                {limit: '500', description: '500'},
                                {limit: '1000', description: '1000'},
                                {limit: '1500', description: '1500'},
                                {limit: '2000', description: '2000'},
                                {limit: '3000', description: '3000'},
                                {limit: '4000', description: '4000'},
                                {limit: '5000', description: '5000'},
                                {limit: '6000', description: '6000'},
                                {limit: '200000', description: 'ALL Data'},
                            ]
                        }),
                    },
                    {
                        xtype: 'button',
                        action: 'action0',
                        align: 'right',
                        id: 'jurnalALL',
                        width: 50,
                        margin: '0 5 0 0',
                        text: '<div class="jtrbtn" id="jrbtnALL" style="width:15px;height:15px;background-color:#fff;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> ALL',
                        //text: 'ALL',
                    },
                    {
                        xtype: 'button',
                        action: 'action1',
                        align: 'right',
                        id: 'jurnalVC',
                        width:100,
                        margin: '0 5 0 0',
                        text: '<div class="jtrbtn" id="jrbtnVC" style="width:15px;height:15px;background-color:#FCD03D;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Made By Sys',
                    },
                    {
                        xtype: 'button',
                        action: 'action2',
                        align: 'right',
                        width:100,
                        margin: '0 5 0 0',
                        text: '<div class="jtrbtn" id="jrbtnMCF" style="width:15px;height:15px;background-color:#BADDB4;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Memorial CF',
                    },
                    {
                        xtype: 'button',
                        action: 'action3',
                        align: 'right',
                        id: 'jurnalMJ',
                        width: 100,
                        margin: '0 5 0 0',
                        text: '<div class="jtrbtn" id="jrbtnMJ" style="width:15px;height:15px;background-color:#F1C9BA;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Memorial JR',
                    },
                    {
                        xtype: 'button',
                        action: 'action4',
                        align: 'right',
                        id: 'jurnalNoSub',
                        width: 90,
                        margin: '0 5 0 0',
                        text: '<div class="" id="jrbtnNoSub" style=""></span> No Sub Jurnal',
                    },
                    {
                        xtype: 'button',
                        action: 'escrow',
                        align: 'right',
                        itemId: 'btnEscrow',
                        hidden: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: '[F4] Escrow Payment',
                       
                    },
                    {
                        xtype: 'button',
                        action: 'collection',
                        align: 'right',
                        itemId: 'btnCollection',
                        hidden: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: '[F7] Collection',
                        fieldStyle: 'margin-right:-0px;',
                    },
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnCheckJournal',
                        name:'btnCheckJournal',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'Check Journal Balance',
                    },
                    {
                        xtype: 'button',
                        action: 'posting',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnPosting',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Posting',
                        bindAction: me.bindPrefixName + 'Posting'
                    },
                    {
                        xtype: 'button',
                        action: 'realization',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnRealization',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Realization',
                        bindAction: me.bindPrefixName + 'Realization'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        width: 500,
                        displayInfo: true,
                        store: this.getStore()
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
            ]
        };
        return ac;
    },
});


