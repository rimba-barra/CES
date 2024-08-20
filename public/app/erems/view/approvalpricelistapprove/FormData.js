Ext.define('Erems.view.approvalpricelistapprove.FormData', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.approvalpricelistapproveformdata',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    bodyBorder    : true,
    bodyPadding   : 10,
    width         : 600,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign     : 'top',
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            items: [
                {
                    xtype  : 'hiddenfield',
                    itemId : 'pricelist_id',
                    name   : 'pricelist_id'
                },
                {
                    xtype       : 'panel', 
                    bodyPadding : 10,
                    items       : [
                        {
                            padding   : '0 0 0 0',
                            layout    : 'hbox',
                            bodyStyle : 'border:0px',
                            items     : [
                                {
                                    xtype      : 'textfield',
                                    fieldLabel : 'Proyek :',
                                    name       : 'project_name',
                                    flex       : 1,
                                    labelWidth : '50px',
                                    readOnly   : true,
                                    fieldStyle: 'border:0px;background:none;',
                                },
                                {
                                    xtype : 'splitter', width : 20
                                }, 
                                {
                                    xtype      : 'textfield',
                                    fieldLabel : 'Status :',
                                    name       : 'status',
                                    flex       : 1,
                                    labelWidth : '50px',
                                    readOnly   : true,
                                    fieldStyle : 'border:0px;background-color:#00FF08;color:#000000;padding-left:10px !important;font-weight:bold;',
                                },
                            ]
                        },
                        {
                            padding   : '10px 0 0 0',
                            layout    : 'hbox',
                            bodyStyle : 'border:0px',
                            itemId    : 'boxInfo',
                            items     : [
                                {
                                    xtype       : 'fieldset',
                                    title       : 'Information',
                                    collapsible : false,
                                    columnWidth : 0.5,
                                    autoHeight  : false,
                                    anchor      : '-5',
                                    flex        : 1,
                                    itemId      : 'info',
                                    defaultType : 'textfield',
                                    items       : [],
                                }
                            ]
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});