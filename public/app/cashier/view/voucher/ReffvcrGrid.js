Ext.define('Cashier.view.voucher.ReffvcrGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.reffvcrgrid',
    storeConfig: {
        id: 'IDselectedreffvcr',
        idProperty: 'kasbank_id',
        extraParams: {
            mode_read: 'reffvcr'
        }
    },
    id: 'browsereffvcrid',
    simpleSelect: true,
    height: 400,
    bindPrefixName: 'Voucher',
    newButtonLabel: 'New Unit',
    initComponent: function () {
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
//               

                {
                    xtype: 'gridcolumn',
                    width: 30,
                    dataIndex: 'dataflow',
                    hideable: false,
                    text: 'T'
                    ,renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'receipt_no',
                    hideable: false,
                    text: 'Receipt #'
                },
                {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'spk',
                    hideable: false,
                    text: 'No.SPK'
                },
                {
                    xtype: 'gridcolumn',
                    width: 130,
                    dataIndex: 'voucherID',
                    hideable: false,
                    text: 'Voucher ID'
                    ,renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'From / To '
                    ,renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Total',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                    align: 'right',
                    style: 'text-align:left'
                },
                
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'voucher_no',
                    hideable: false,
                    text: 'Voucher No.'
                },
                {
                    xtype: 'gridcolumn',
                    width: 170,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Notes'
                },
                {
                    xtype: 'gridcolumn',
                    width: 170,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Created Date'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
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
                items: [{
                        xtype: 'button',
                        action: 'selectinheader',
                        id:'btnselectinheader',
                        itemId:'btnselectinheader',
//                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick Voucher",
                        hidden:false,
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {


        var x = [
            {
                xtype: 'hiddenfield',
                id: 'projectVoucherIdReffvcr',
                name: 'project_id'
            },
            {
                xtype: 'combobox',
                name: 'pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                width: 250,
                allowBlank: false,
                readOnly: true,
                enforceMaxLength: true,
                dataBinder: 'pt',
                queryMode: 'local',
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px">',
                        '<tr class="x-grid-row">',
                        '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                        ),
                absoluteReadOnly: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                id: 'ptVoucherIdReffvcr',
                listeners: {
                    keyup: function (field) {
                        var searchString = field.getValue();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }
                    },
                    change: function (v) {
                        if (v.value) {
                            //console.log(v);
                        }
                    },
                    buffer: 300,
                },
            },
            {
                xtype: 'textfield',
                name: 'value',
                id:'voucherIDreffvcr',
                itemId:'voucherIDreffvcr',
                fieldLabel: 'Voucher ID ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
            {
                xtype: 'textfield',
                name: 'value2',
                fieldLabel: 'Notes ',
                width: 500,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
            {
                xtype: 'textfield',
                name: 'value3',
                fieldLabel: 'Voucher No ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
            {
                xtype: 'textfield',
                name: 'value4',
                fieldLabel: 'Customer Name ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
            {
                xtype: 'textfield',
                name: 'value5',
                fieldLabel: 'Receipt No ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
            {
                xtype: 'label',
                text: 'Search by date',
                width: 50,
            },
            {
                xtype: 'combobox',
                name: 'value7',
                queryMode: 'local',
                valueField: 'status',
                allowBlank: false,
                forceSelection: true,
                flex: 1,
                value: '0',
                emptyText: 'ALL',
                displayField: 'description',
                id: 'dateReffvcr',
                itemId: 'dateReffvcr',
                store: new Ext.data.JsonStore({
                    fields: ['status', 'description'],
                    data: [
                        {status: '0', description: 'ALL'},
                        {status: '1', description: 'Trans. Date'},
                        {status: '2', description: 'Duedate'},
                        // {status: '3', description: 'Voucher Date'},
                        {status: '3', description: 'Issued Date'},
                        {status: '4', description: 'Kwitansi Date'},
                        {status: '5', description: 'Voucher Date'},
                                //  {status: '6', description: 'Posting Date'},
                    ]
                }),
                enableKeyEvents: true,
                listeners:{
                    change: function (v) {
                        console.log(v.value);
                        if ( v.value == 0 ) {
                            Ext.getCmp('idvalue8').setDisabled(true);
                            Ext.getCmp('idvalue9').setDisabled(true);
                            Ext.getCmp('idvalue8').setValue('');
                            Ext.getCmp('idvalue9').setValue('');
                        }else{
                            Ext.getCmp('idvalue8').setDisabled(false);
                            Ext.getCmp('idvalue9').setDisabled(false);
                        }
                    }
                }
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                bodyBorder: false,
                defaults: {
                    layout: 'fit'
                },
                width: 100,
                items: [
                    {
                        xtype: 'datefield',
                        itemId: 'idvalue8',
                        id: 'idvalue8',
                        name: 'value8',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        flex: 1,
                        emptyText: 'From',
                        disabled: true,
                    },
                    {
                        xtype: 'splitter',
                        width: '5'
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'idvalue9',
                        id: 'idvalue9',
                        name: 'value9',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        flex: 1,
                        emptyText: 'To',
                        disabled: true,
                    },
                ]
            },
            {
                xtype: 'combobox',
                name: 'value6',
                fieldLabel: 'Use',
                queryMode: 'local',
                valueField: 'value',
                allowBlank: true,
                forceSelection: true,
                displayField: 'description',
                store: new Ext.data.JsonStore({
                    fields: ['value', 'description'],
                    data: [
                        {value: 'N', description: 'NOT USE'},
                        {value: 'Y', description: 'USED'},
                    ]
                }),
                dvalue: 'N',
                emptyText: 'NOT USE',
                id: 'usedReffvcr',
            },
        ];
        return x;
    }
});