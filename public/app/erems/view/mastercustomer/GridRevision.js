Ext.define('Erems.view.mastercustomer.GridRevision',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.mastercustomergridrevision',
    storeConfig:{
        id:'MasterCustomerGridRevisionStore',
        idProperty:'customer_tmp_id',
        extraParams:{}
    },
   // store:'Mastercustomer',
    bindPrefixName:'Mastercustomerrevision',
   // itemId:'',
    height:400,
    newButtonLabel:'New Revision',
    iconCls: 'icon-form-edit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
           // selModel: new Ext.selection.Model({mode:"SINGLE"}),
           selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 100,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    dataIndex: 'address',
                    text: 'Address'
                },
                {
                    xtype: 'datecolumn',
                    width: 80,
                    format:'d-m-Y',
                    dataIndex: 'birthdate',
                    text: 'Birthdate'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    format:'d-m-Y',
                    dataIndex: 'proposed_by',
                    text: 'Proposed by'
                },
                {
                    xtype: 'datecolumn',
                    width: 80,
                    format:'d-m-Y',
                    dataIndex: 'Addon',
                    text: 'Proposed on'
                },
                {
                    xtype: 'booleancolumn',
                    width: 60,
                    resizable: false,
                    dataIndex: 'is_approved',
                    text: 'Approved',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    width: 90,
                    format:'d-m-Y',
                    dataIndex: 'Approvedon',
                    text: 'Approved Date'
                },
                {
                    xtype: 'booleancolumn',
                    width: 60,
                    resizable: false,
                    dataIndex: 'is_rejected',
                    text: 'Rejected',
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'datecolumn',
                    width: 90,
                    format:'d-m-Y',
                    dataIndex: 'Rejectedon',
                    text: 'Rejected Date'
                },
                me.generateActionColumn()
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
                        hidden: false,
                        itemId: 'btnEditRevision',
                        margin: '0 5 0 0',
                        iconCls: 'icon-search',
                        text: 'View / Approve',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnDeleteRevision',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
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
});




