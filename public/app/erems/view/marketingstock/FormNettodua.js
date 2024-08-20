Ext.define('Erems.view.marketingstock.FormNettodua', {
    extend        : 'Erems.library.template.view.FormData',
    requires      : [],
    alias         : 'widget.marketingstockformnettodua',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    height        : 200,
    bodyBorder    : true,
    bodyStyle     : 'padding:5px 5px 0',
    initComponent : function () {
        var me = this;
        Ext.applyIf(me, {
            defaults : {
                xtype : 'textfield'
            },
            items : [
                {
                    // Arrange radio buttons into three columns, distributed vertically
                    xtype      : 'radiogroup',
                    fieldLabel : 'Biaya - biaya',
                    columns    : 3,
                    width      : 400,
                    vertical   : true,
                    items      : [
                        { boxLabel : 'Tidak Ada', name : 'biaya', inputValue : '1' },
                        { boxLabel : 'Ada', name : 'biaya', inputValue : '2' },
                        { boxLabel : 'Netto2', name : 'biaya', inputValue : '3', checked: true },
                    ]
                },
                {
                    xtype           : 'xmoneyfieldEST',
                    name            : 'harga_jual',
                    enableKeyEvents : true,
                    width           : 300,
                    fieldLabel      : 'Harga Jual'
                },
                {
                    xtype      : 'xmoneyfieldEST',
                    readOnly   : true,
                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;text-align:right',
                    name       : 'harga_netto',
                    width      : 300,
                    fieldLabel : 'Harga Netto'
                },
                { xtype : 'label', text : '[KPR ONLY]', style : 'color:##41A62D !important;' }
            ],
            dockedItems : me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem : function () {
        var x = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items : [
                    {
                        xtype   : 'button',
                        action  : 'process',
                        padding : 5,
                        width   : 75,
                        text    : 'Process'
                    },
                    {
                        xtype   : 'button',
                        action  : 'cancel',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-cancel',
                        text    : 'Cancel',
                        handler : function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});