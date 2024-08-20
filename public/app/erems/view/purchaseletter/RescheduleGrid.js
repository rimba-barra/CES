Ext.define('Erems.view.purchaseletter.Reschedulegrid', {
    //extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseletterreschedulegrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'RescheduleGridStore',
        idProperty: 'reschedule_id',
        extraParams: {
            mode_read: 'reschedule',
            purchaseletter_id:0
        }
    },
    //  store: 'Schedule',
    requires: [
        'Erems.template.ComboBoxFields'
                //  'Erems.library.template.component.Sourcemoneycombobox'
    ],
    bindPrefixName: 'Purchaseletter',
    newButtonLabel: 'New Purchaseletter_no',
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

       


        var cbf = new Erems.template.ComboBoxFields();

      

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
          //  plugins: [rowEditing],
            viewConfig: {
                stripeRows: true
            },
            defaults:{
               align: 'center'  
            },
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'datecolumn',
                    type: 'date',
                    width: 110,
                    format: 'd-m-Y',
                    dataIndex: 'rencanaserahterima_date',
                    hideable: false,
                    text: 'Rencana ST Date'
                },
                {
                    xtype: 'gridcolumn',
                 
                    width:110,
         
                    dataIndex: 'rencanaserahterima_month',
                    hideable: false,
                    text: 'Rencana ST Month'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'reason',
                    hideable: false,
                    text: 'Reason'
                },
                {
                    xtype: 'booleancolumn',
                    width: 60,
                    dataIndex: 'is_approve',
                    hideable: false,
                    text: 'Approve',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    type: 'date',
                    width: 90,
                    format: 'd-m-Y',
                    dataIndex: 'approve_date',
                    hideable: false,
                    text: 'Approve Date'
                },
                {
                    xtype: 'datecolumn',
                    type: 'date',
                    width: 90,
                    format: 'd-m-Y',
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Addon'
                },

                //   me.generateActionColumn()
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add Reschedule'
                    },
                    {
                        xtype: 'button',
                        action: 'edit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit Reschedule'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'approve',
                        hidden:true,
                        iconCls: 'icon-approve',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'approvenow',
                        hidden:true,
                        iconCls: 'icon-approve',
                        text: 'Approve Now'
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
    }
});