Ext.define('Hrd.view.popuphcms.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.popuphcmsgrid',
    store: 'Popuphcms',
    bindPrefixName: 'Popuphcms',
    itemId: 'Popuphcms',
    newButtonLabel: 'Add New',
    viewConfig: { 
        stripeRows: false, 
        getRowClass: function(record) { 
            // return record.get('note_highlight') == 'habis_kontrak' ? 'highlight' : 'no-highlight'; 

            //updated by anas 14032022
            var highlight = "no-highlight";

            if(record.get('note_highlight') == 'habis_kontrak' || record.get('note_highlight') == 'no_group')
            {
                highlight = "highlight";
            }

            return highlight;
            //end updated
        } 
    },
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
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
                    itemId: 'colms_employee_nik',
                    dataIndex: 'employee_nik',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Employee NIK'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    dataIndex: 'employee_name',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Employee Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_datedata',
                    dataIndex: 'datedata',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note',
                    dataIndex: 'note',
                    width: 400,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Note'
                },
            ],
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
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        frame: true,
                        bodyStyle: 'border:0px',
                        items: [

                        ]
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
            hidden: false,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'left',
            hideable: false,
            items: [

            ]
        };
        return ac;
    },
});


