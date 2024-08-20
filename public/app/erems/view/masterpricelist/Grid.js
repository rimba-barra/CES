Ext.define('Erems.view.masterpricelist.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.masterpricelistgrid',
    store          : 'Masterpricelist',
    bindPrefixName : 'Masterpricelist',
    newButtonLabel : 'New pricelist',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', { selType: 'checkboxmodel', mode : "SINGLE", allowDeselect: true }),
            columns     : [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'keterangan',
                    text      : 'Keterangan',
                    flex      : 1
                },
                {
                    xtype     : 'datecolumn',//'datecolumn',
                    dataIndex : 'pricelist_date',
                    format    : 'd-m-Y',
                    text      : 'Price List Date'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'doc_status',
                    text      : 'Status'
                },
                // {
                //     xtype: 'gridcolumn',
                //     dataIndex: 'approve_user_name',
                //     text: 'Approve By'
                // },
                // {
                //     xtype: 'datecolumn',
                //     dataIndex: 'approve_date',
                //     format:'d-m-Y',
                //     text: 'Approve Date'
                // },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'last_action_name',
                    text      : 'Last Action Name'
                },
                {
                    xtype     : 'datecolumn',
                    dataIndex : 'last_action_date',
                    format    : 'd-m-Y',
                    text      : 'Last Action Date'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'next_action_name',
                    text      : 'Next Action Name'
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype     : 'actioncolumn',
            hidden    : true,
            itemId    : 'actioncolumn',
            width     : 50,
            resizable : false,
            align     : 'right',
            hideable  : false,
            items     : [
                {
                    // xtype    : 'button',
                    tooltip: 'Download Excel',
                    icon: document.URL + 'app/main/images/icons/excel.png',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('downloadaction', arguments);
                    },
                    // action : 'downloadaction'
                },
                {
                    // xtype    : 'button',
                    icon: document.URL + 'app/main/images/icons/mail.png', // Use a URL in the icon config
                    tooltip: 'Email',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('mailaction', arguments);
                    },
                    // action : 'mailaction'
                },
                {
                    defaultIcon : 'icon-edit',
                    text        : 'Edit',
                    iconCls     : 'icon-edit',
                    bindAction  : me.bindPrefixName + 'Update',
                    altText     : 'Edit',
                    tooltip     : 'Edit',
                    // action      : 'update'
                },
                {
                    defaultIcon : 'icon-delete',
                    text        : 'Delete',
                    iconCls     : 'icon-delete',
                    bindAction  : me.bindPrefixName + 'Delete',
                    altText     : 'Delete',
                    tooltip     : 'Delete',
                    // action      : 'destroy'
                }
            ]
        };
        return ac;
    },

    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, i;
                var cells, actioncolumngrid, eventdata, action, acexcel, acemail, acedit, acdelete;
                var
                    nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('doc_status');
                    is_sendmail = record.get('is_sendmail');
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[cells.length - 1];
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acexcel = action[0];
                    acemail = action[1];
                    acedit = action[2];
                    acdelete = action[3];

                    if (!is_sendmail) {
                        switch (status) {
                            case 'OPEN':
                                break;
                            default:
                                acemail.remove();
                                acedit.remove();
                                acdelete.remove();
                                break;
                        }
                    }
                    else {
                        // acemail.remove();
                        // acedit.remove();
                        // acdelete.remove();
                        switch (status) {
                            case 'OPEN':
                                acedit.remove();
                                acdelete.remove();
                                break;
                            default:
                                acemail.remove();
                                acedit.remove();
                                acdelete.remove();
                                break;
                        }
                    }
                }
            }
        }
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'top',
                height : 28,
                items  : [
                    {
                        xtype      : 'button',
                        action     : 'create',
                        hidden     : true,
                        itemId     : 'btnNew',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Create',
                        text       : me.newButtonLabel
                    },
                    {
                        xtype      : 'button',
                        action     : 'update',
                        disabled   : true,
                        hidden     : true,
                        itemId     : 'btnEdit',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-edit',
                        text       : 'Edit',
                        bindAction : me.bindPrefixName + 'Update',
                        ctxMenu    : true,
                    },
                    {
                        xtype      : 'button',
                        action     : 'destroy',
                        disabled   : true,
                        hidden     : true,
                        itemId     : 'btnDelete',
                        bindAction : me.bindPrefixName + 'Delete',
                        iconCls    : 'icon-delete',
                        text       : 'Delete Selected',
                        ctxMenu    : true,
                    },
                    {
                        xtype      : 'button',
                        action     : 'print',
                        hidden     : true,
                        itemId     : 'btnPrint',
                        margin     : '0 5 0 0',
                        bindAction : me.bindPrefixName + 'Print',
                        iconCls    : 'icon-print',
                        text       : 'Print / Save',
                        ctxMenu    : true,
                    },
                    {
                        xtype    : 'button',
                        action   : 'copy',
                        disabled : true,
                        itemId   : 'btnCopy',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-copy',
                        text     : 'Copy',
                        ctxMenu  : true,
                    },
                    {
                        xtype    : 'button',
                        action   : 'mailaction',
                        disabled : true,
                        itemId   : 'btnEmail',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-mail',
                        text     : 'Send Email',
                        ctxMenu  : true,
                    },
                    {
                        xtype    : 'button',
                        action   : 'downloadaction',
                        disabled : true,
                        itemId   : 'btnDownload',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-excel',
                        text     : 'Download',
                        ctxMenu  : true,
                    },
                    {
                        xtype      : 'button',
                        action     : 'read',
                        disabled   : true,
                        itemId     : 'btnView',
                        margin     : '0 5 0 0',
                        bindAction : me.bindPrefixName + 'Read',
                        iconCls    : 'icon-search',
                        text       : 'View',
                        ctxMenu    : true,
                    },
                ]
            },
            {
                xtype       : 'pagingtoolbar',
                dock        : 'bottom',
                width       : 360,
                displayInfo : true,
                store       : this.getStore()
            }
        ];
        return dockedItems;
    },
});