Ext.define('Erems.view.resyncvabca.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.resyncvabcaformdata',
    requires:[
        'Erems.library.template.component.Resynccombobox',
    ],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 400,
	height: 200,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype      : 'textfield',
                            width      : '100%',
                            name       : 'nomor_va',
                            fieldLabel : 'No. VA',
                            margin     : '0 5px 0 0'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'fdms_payment_date',
                            name: 'payment_date',
                            fieldLabel: 'Payment Date',
                            labelSeparator: '',
                            format: 'd M Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u',
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'resynccombobox',
                            itemId: 'fs_resync_id',
                            name: 'resync_id',
                            anchor: '-15',
                            editable: false,
                            forceSelection: true,
                            listeners: {
                             beforequery: function (record) {
                                 record.query = new RegExp(record.query, 'i');
                                 record.forceAll = true;
                             }
                            },
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype      : 'textfield',
                            width      : '100%',
                            name       : 'api_vabca_logs_id',
                            margin     : '0 5px 0 0',
                            hidden     : true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype      : 'textfield',
                            width      : '100%',
                            name       : 'params',
                            margin     : '0 5px 0 0',
                            hidden     : true
                        }
                    ]
                },
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'sync',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-refresh',
                        text: 'Sync',
                        itemId: 'syncBtn'
                    },
                ]
            }
        ];
        return dockedItems;
    }
});

