Ext.define('Erems.view.masterformula.BalloonGrid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.masterformulaballoongrid',
    bindPrefixName: 'Masterformulaballoongrid',
    store: 'Masterformulaballoon',
    newButtonLabel: 'Add New Balloon',
    height: 200,
    initComponent: function() {
        var me = this;
        var renderFunc =  function (value, metaData, record, row, col, store, gridView) {
                        if(parseInt(value)==1){
                            return 'HARI';
                        }else if(parseInt(value)==2){
                            return 'MINGGU';
                        }else{
                            return 'BULAN';
                        }
                    };
        var schFunc =  function (value, metaData, record, row, col, store, gridView) {
                        if(parseInt(value)==5){
                            return 'UM';
                        }else if(parseInt(value)==3){
                            return 'INHOUSE';
                        }
                    };

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    align: 'right',
                    dataIndex: 'billingrulesballoon_id',
                    hidden: true,
                    text: 'id'
                },
                {
                    dataIndex: 'schedule_type_balloon',
                    text: 'Schedule Type',
                    renderer:schFunc
                },
                {
                    dataIndex: 'term_angsuran',
                    text: 'Termin'
                },
                {
                    dataIndex: 'persen',
                    text: '%'
                },
                {
                    dataIndex: 'periode_angsuran',
                    text: 'Termin Period'
                },
                {
                    dataIndex: 'type_periode_angsuran',
                    text: 'Period',
                    renderer:renderFunc
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
                dock: 'bottom',
                height: 28,
                ui: 'footer',
                layout: {
                    type: 'hbox',
                    pack: 'end'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'value_add',
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        text: 'Add new Balloon'
                    }

                ]
            }

        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
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
                }
            ]
        };
        return ac;
    }
});