Ext.define('Hrd.view.allclaim.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.allclaimgrid',
    storeConfig: {
        id: 'AllclaimGridStore',
        idProperty: 'employee_id,jenispengobatan_id',
        extraParams: {}
    },
    bindPrefixName: 'Allclaim',
    viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) { 
            // return record.get('note_highlight') == 'habis_kontrak' ? 'highlight' : 'no-highlight'; 

            var highlight = "no-highlight";

            if(record.get('sign_saldo') == 'warning')
            {
                highlight = "highlight";
            }

            if(record.get('sign_saldo') == 'alert')
            {
                highlight = "alert";
            }

            return highlight;
        } 
    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'subholding_name',
                   text: 'Subholding'
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project',
                   width: 100
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width: 100
                },
                {
                   dataIndex: 'nik_group',
                   text: 'NIK Group'
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Name',
                   width: 100
                },
                {
                   dataIndex: 'department_name',
                   text: 'Department Name',
                   width: 100
                },
                {
                   dataIndex: 'code_group',
                   text: 'Group',
                   width: 100
                },
                {
                   dataIndex: 'code_ptkp',
                   text: 'PTKP',
                   width: 100
                },
                {
                   dataIndex: 'code_jenispengobatan',
                   text: 'Jenis',
                   width: 100
                },
                {
                  xtype:'numbercolumn',
                  align:'right',
                   dataIndex: 'value_plafon',
                   text: 'Plafon',
                   width: 100
                },
                {
                   dataIndex: 'year_now',
                   text: 'Year',
                   width: 100
                },
                {
                  xtype:'numbercolumn',
                  align:'right',
                   dataIndex: 'total_amount_penggantian',
                   text: 'Amount',
                   width: 100
                },
                {
                  xtype:'numbercolumn',
                  align:'right',
                   dataIndex: 'total_saldo',
                   text: 'Saldo',
                   width: 100
                },
                
                
                                
                // me.generateActionColumn()
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
                        action: 'export',
                        // hidden: false,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Read',
                        icon: 'app/main/images/icons/excel.png',
                        text: 'Export'
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
});


