Ext.define('Hrd.view.scoringbsc.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.scoringbscgriddetail',
    storeConfig: {
        id: 'ScoringbscGridDetailStore',
        idProperty: 'scoringbsc_detail_id',
        extraParams: {
            mode_read: 'scoringbscdetaillist'
        }
    },
    bindPrefixName: 'Scoringbsc',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    dataIndex: 'rating',
                    text: 'Rating',
                    width: 100,
                    name: 'rating',
                    sortable: true,
					renderer: function(value, record){
						return (value*1);
					}
                },
                {
                    dataIndex: 'batas_bawah',
                    text: 'Batas Bawah',
                    width: 100,
                    name: 'batas_bawah',
                    sortable: true,
					renderer: function(value, record){
						return (value*1);
					}
                },
                {
                    dataIndex: 'batas_atas',
                    text: 'Batas Atas',
                    width: 100,
                    name: 'batas_atas',
                    sortable: true,
					renderer: function(value, record){
						return (value*1);
					}
                },
                {
                    dataIndex: 'interval',
                    text: 'Interval',
                    width: 100,
                    name: 'interval',
                    sortable: true,
					renderer: function(value, record){
						return (value*1);
					}
                },
                {
                    dataIndex: 'rating_range',
                    text: 'Rating Range',
                    width: 150,
                    name: 'rating_range',
                    sortable: true
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
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
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
            width: 60,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }]
        };

        return ac;
    }
});