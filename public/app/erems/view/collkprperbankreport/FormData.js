Ext.define('Erems.view.collkprperbankreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.collkprperbankreportformdata',
    requires: [
        'Erems.library.template.component.Bankcombobox',
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 500,
	height: 150,
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
                            xtype: 'bankcombobox',
                            name: 'bank_id',
                            fieldLabel:'Nama Bank',
                            reportParams: true,
                            forceSelection:true,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_bank_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        },
                    ]
                },
                // added by rico 20012023
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
                            name: 'bot_date',
                            fieldLabel:'Tgl. Akad',
                            reportParams: true,
                            flex:3,
                            editable: false,
                            format: 'd-m-Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u'
                        },
                        {
                            xtype:'label',
                            width:20,
                            text:'to',
                            margin:'0 5px'
                        },
                        {
                            xtype: 'datefield',
                            name: 'top_date',
                            fieldLabel:'',
                            reportParams: true,
                            flex:2,
                            editable: false,
                            format: 'd-m-Y',
                            altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat: 'Y-m-d H:i:s.u'
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
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

