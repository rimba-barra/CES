Ext.define('Hrd.view.masterdisctanahapartment.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.masterdisctanahapartmentgrid',
    store: 'Masterdisctanahapartment',
    bindPrefixName: 'Masterdisctanahapartment',
    itemId: 'Masterdisctanahapartment',
    newButtonLabel: 'Add New',
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
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_group_code',
                    width: 120,
                    dataIndex: 'group_code',
                    hideable: false,
                    text: 'Group (Golongan)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_max_luastanah',
                    width: 150,
                    dataIndex: 'max_luastanah',
                    hideable: false,
                    text: 'Max. Luas Tanah (m2)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_max_luasbangunan',
                    width: 150,
                    dataIndex: 'max_luasbangunan',
                    hideable: false,
                    text: 'Max. Luas Bangunan (m2)'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_max_rupiah',
                    width: 150,
                    dataIndex: 'max_rupiah',
                    hideable: false,
                    text: 'Max. Nominal (Rp)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rumus_luas_tanah',
                    width: 150,
                    dataIndex: 'rumus_luas_tanah',
                    hideable: false,
                    text: 'Rumus (Luas Tanah) (m2)'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_max_persendisc',
                    width: 150,
                    dataIndex: 'max_persendisc',
                    hideable: false,
                    text: 'Max. Persen discount (%)'
                },{
                        xtype		: 'booleancolumn',
                        text		: 'Approve',
                        dataIndex	: 'is_approve',
                        trueText	: '&#10003;',
                        falseText	: ' ',
                        resizable	: false,
                        width		: 55,
                        align		: 'center'
                },{
                        dataIndex   : 'approveon',
                        text        : 'Approve Date',
                        width       : 80,
                        renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },{
                        dataIndex   : 'approveby_name',
                        text        : 'Approve By',
                        width       : 100
                },{
                        xtype		: 'booleancolumn',
                        text		: 'Reject',
                        dataIndex	: 'is_reject',
                        trueText	: '&#10003;',
                        falseText	: ' ',
                        resizable	: false,
                        width		: 50,
                        align		: 'center'
                },{
                        dataIndex   : 'rejecton',
                        text        : 'Reject Date',
                        width       : 80,
                        renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },{
                        dataIndex   : 'rejectby_name',
                        text        : 'Reject By',
                        width       : 100
                },
              
                me.generateActionColumn(),
               
            ],
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
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
                    }, {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    }, {
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
                        action: 'approve',
                        itemId: 'btnApprove',
                        margin: '0 5 0 0',
                        disabled: true,
                        hidden: true,
                        iconCls: 'icon-approve',
                        text: 'Approve Selected',
                        bindAction: me.bindPrefixName + 'Approve'
                    },
					{
                        xtype: 'button',
                        action: 'reject',
                        itemId: 'btnReject',
                        margin: '0 5 0 0',
                        disabled: true,
                        hidden: true,
                        iconCls: 'icon-unapprove',
                        text: 'Reject Selected',
                        bindAction: me.bindPrefixName + 'Reject'
                    }]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },
    
    
});


