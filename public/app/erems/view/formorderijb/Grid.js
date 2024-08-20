Ext.define('Erems.view.formorderijb.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.formorderijbgrid',
    storeConfig: {
        id: 'FormorderijbGridStore',
        idProperty: 'formorderijb_id',
        extraParams: {}
    },
    bindPrefixName: 'Formorderijb',
    newButtonLabel: 'New Form Order IJB',
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
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_formorderijb_id',
                    width: 100,
                    dataIndex: 'formorderijb_id',
                    hidden: true,
                    text: 'formorderijb_id'
                },
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },
               
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',  
                    width: 130,
                    dataIndex: 'formorderijb_no',
                    hideable: false,
                    text: 'IJB No.'
                },
           
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 100,
                    dataIndex: 'formorderijb_date',
                    hideable: false,
                    text: 'Tanggal'
                },
                 {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'pengalihanhak_name',
                    hideable: false,
                    text: 'Customer Name'
                }
                

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
                        action: 'create',
                        hidden: false,
                        itemId: 'btnNew',
                        //bindAction: me.bindPrefixName + 'Create',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        hidden: false,
                        itemId: 'btnEdit',
                        //bindAction: me.bindPrefixName + 'Update',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
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
                        action: 'printx',

                        margin: '0 5 0 0',

                        iconCls: 'icon-print',
                        text: 'Print Form IJB'
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
    }
});