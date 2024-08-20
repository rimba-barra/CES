Ext.define('Erems.view.legalescrowreport.FormData', {
    extend   : 'Erems.library.template.view.FormData',
    alias    : 'widget.legalescrowreportformdata',
    requires : [
        // 'Erems.library.template.component.Bankcombobox',
        'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Projectptcombobox'
    ],
    frame         : true,
    autoScroll    : true,
    bodyBorder    : true,
    width         : 600,
    //height      : 300,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function () {
        var me = this;

        var date_now = new Date();
        var year     = date_now.getFullYear();
        var month    = date_now.getMonth() + 1;
        var day      = date_now.getDate();

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : {
                        margin : '0 20px 0 0'
                    },
                    items : [
                        {
                            xtype : me.fieldYear({
                                fieldLabel : 'Periode ',
                                name       : 'period',
                                itemId     : 'period',
                                value      : new Date(),
                                editable   : false,
                                allowBlank : false,
                                labelWidth : 80,
                                width      : 160,
                            }),
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
                    items : [
    					{
                            xtype        : 'projectptcombobox',
                            name         : 'pt_id',
                            fieldLabel   : 'Unit PT Name',
                            valueField   : 'pt_id',
                            reportParams : true,
                            width        : '90%',
                            labelWidth   : 80,
    					},
    					{
                            xtype          : 'checkboxfield',
                            fieldLabel     : '',
                            name           : 'cbf_pt_id',
                            checked        : true,
                            inputValue     : '1',
                            uncheckedValue : '0',
                            margin         : '0 5px 0 0',
                            width          : 20
    					},
    					{
                            xtype : 'label',
                            text  : 'ALL'
    					}
    				]
				}
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
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
                        action  : 'process',
                        itemId  : 'btnSearch',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-search',
                        text    : 'Process'
                    },
                    {
                        xtype   : 'button',
                        action  : 'reset',
                        itemId  : 'btnReset',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-reset',
                        text    : 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});