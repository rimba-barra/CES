Ext.define('Cashier.view.revenuesharing.FormDataLegalitas', {
    extend       : 'Cashier.library.template.view.FormData',
    alias        : 'widget.revenuesharingformdatalegalitas',
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 10,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype : 'hiddenfield',
                    itemId: 'fdms_id',
                    name  : 'purchaseletter_id'
                },
                {
                    xtype : 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name  : 'unit_id'
                },
                {
                    layout   : 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    height   : 30,
                    width    : '100%',
                    items    : [
                        {
                            xtype     : 'xmoneyfield',
                            fieldLabel: 'Harga Netto',
                            anchor    : '-5',
                            name      : 'harga_netto',
                            flex      : 1,
                            readOnly  : true,
                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right;'
                        },
                    ]
                },
                {
                    layout   : 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    height   : 30,
                    width    : '100%',
                    items    : [
                        {
                            xtype     : 'xmoneyfield',
                            fieldLabel: 'Biaya Legalitas',
                            anchor    : '-5',
                            name      : 'biaya_legalitas_netto',
                            flex      : 1,
                            allowBlank: false
                        },
                    ]
                },
                {
                    layout   : 'hbox',
                    bodyStyle: 'border:0px;background:none;',
                    height   : 30,
                    width    : '100%',
                    items    : [
                        {
                            xtype     : 'xmoneyfield',
                            fieldLabel: 'Harga Netto RS',
                            anchor    : '-5',
                            name      : 'harga_netto_rs',
                            flex      : 1,
                            readOnly  : true,
                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right;'
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});

