Ext.define('Erems.view.masterperiodecutoff.FormData', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.masterperiodecutoffformdata',
    autoScroll    : true,
    anchorSize    : 100,
    height        : 150,
    frame         : true,
    bodyBorder    : true,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;background:none;',
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            defaults : { labelAlign : 'left' },
            items : [
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox'
                    },
                    items : [
                        {
                            defaults : {
                                xtype   : 'container',
                                layout  : 'hbox',
                                margins : '5 0 0 0'
                            },
                            items : [
                                {
                                    xtype : 'hiddenfield',
                                    name  : 'audit_periode_cutoff_id'
                                },
                                {
                                    xtype      : 'xdatefield',
                                    name       : 'periode_cutoff',
                                    allowBlank : false,
                                    width      : 255,
                                    fieldLabel : 'Periode Cut Off'
                                }, 
                            ]
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});