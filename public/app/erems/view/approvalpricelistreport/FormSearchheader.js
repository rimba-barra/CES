Ext.define('Erems.view.approvalpricelistreport.FormSearchheader', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.approvalpricelistreportformsearchheader',
    requires      : ['Erems.library.template.component.Approvalmodulcombobox', 'Erems.library.template.component.Approvalstatuscombobox'],
    frame         : true,
    autoScroll    : false,
    bodyBorder    : true,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    bodyPadding   : 10,
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            maxHeight  : 200,
            autoHeight : true,
            maxWidth   : 600,
            minWidth   : 500,
            width      : 500,
            defaults   : me.generateDefaults(),
            items      : [
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : {
                        margin : '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype      : 'approvalmodulcombobox',
                            name       : 'modul',
                            value      : 1,
                            labelWidth : '40%',
                            renderTo   : Ext.getBody(),
                            listeners  : {
                                render : function(el, a, b, c){
                                    el.labelEl.update(el.fieldLabel);
                                }                
                            },
                        },
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : {
                        margin : '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype      : 'xdatefield',
                            itemId     : 'periode_startdate',
                            name       : 'periode_startdate',
                            fieldLabel : 'Periode Approval',
                            labelWidth : '40%',
                            editable   : false,
                            renderTo  : Ext.getBody(),
                            listeners : {
                                render : function(el, a, b, c){
                                    el.labelEl.update(el.fieldLabel);
                                }                
                            },
                        },
                        {
                            xtype   : 'label',
                            width   : 5,
                            text    :'to',
                            padding : '5px 0'
                        },
                        {
                            xtype    : 'xdatefield',
                            itemId   : 'periode_enddate',
                            name     : 'periode_enddate',
                            editable : false,
                        }
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : {
                        margin : '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype      : 'approvalstatuscombobox',
                            fieldLabel : 'Status Approval',
                            name       : 'status',
                            value      : 'ALL',
                            labelWidth : '40%',
                        },
                    ]
                },
            ],
            dockedItems : me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDockedItems : function(){
        var dockedItems = [
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
                            action  : 'search',
                            itemId  : 'btnSearch',
                            padding : 5,
                            width   : 75,
                            iconCls : 'icon-search',
                            text    : 'Search'
                        },
                        {
                            xtype   : 'button',
                            action  : 'reset',
                            itemId  : 'btnReset',
                            padding : 5,
                            width   : 75,
                            iconCls : 'icon-reset',
                            text    : 'Reset'
                        },
                        '->',
                        {
                            hidden  : true,
                            xtype   : 'button',
                            action  : 'export_excel',
                            itemId  : 'btnExport',
                            margin  : '0 5 0 0',
                            iconCls : 'icon-print',
                            text    : 'Export Excel'
                        },
                    ]
                }
            ];
         return dockedItems;
    },
});