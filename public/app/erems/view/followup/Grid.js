Ext.define('Erems.view.followup.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProcessCacGridStore',
        idProperty: 'followup_id',
        extraParams: {}
    },
    alias: 'widget.followupgrid',
    bindPrefixName: 'Followup',
    // itemId:'',
    newButtonLabel: 'New Proses CAC',
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
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase No.', width: 200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cluster',
                    text: 'Cluster', width: 100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number', width: 100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'customer_name',
                    text: 'Customer Name', width: 200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sp_ke',
                    text: 'SP Ke-', width: 50
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sp_processdate',
                    text: 'Tgl. Proses', width: 100
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            
            hidden: true,
//            hideable: false,
            
            items: [
                {
                    icon: document.URL + 'app/main/images/icons/printer.png', // Use a URL in the icon config
                    margin:'0 15px 0 0',
                    tooltip: 'Print',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('printaction', arguments);
                    }

                },
                {
                    icon: document.URL + 'app/main/images/icons/mail.png', // Use a URL in the icon config
                    tooltip: 'Email',
                    margin:'0 15px 0 0',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('mailaction', arguments);
                    }
                },
                {
                    icon: document.URL + 'app/main/images/icons/phone.png', // Use a URL in the icon config
                    tooltip: 'Tambah ke proses SMS',
                    margin:'0 15px 0 0',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('smsaction', arguments);
                    }
                },
                {
                    icon: document.URL + 'app/main/images/icons/search.png', // Use a URL in the icon config
                    tooltip: 'View',
                    margin:'0 15px 0 0',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('viewaction', arguments);
                    }
                },
                {
                    icon: document.URL + 'app/main/images/icons/clockwise-arrow.png', // Use a URL in the icon config
                    tooltip: 'Rollback',
                    margin:'0 15px 0 0',
                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('rollbackaction', arguments);
                    }
                },
                {
                    tooltip: 'Export Word',
                    itemId: 'exportWord',
                    icon: document.URL+'app/main/images/icons/word.png',
                    handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                        this.fireEvent( 'wordaction', arguments );
                    }
                },
                
            ]
        };
        return ac;
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
            }
        ];
        return dockedItems;
    },
});


