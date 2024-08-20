Ext.define('Erems.view.lastpricereport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.lastpricereportformdata',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            height:150,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'Project'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'Pt'
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
                            xtype: 'dfdatefield',
                            fieldLabel: 'First Purchase Date',
                            name: 'date_bot',
                            submitFormat: 'Y-m-d',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            text: 'to',
                            width: 20

                        },
                        {
                            xtype: 'dfdatefield',
                            fieldLabel: '',
                            name: 'date_top',
                            submitFormat: 'Y-m-d',
                            flex: 1
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
                    /*
                    {
                        xtype: 'button',
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Process'
                    },
                    */
                    {
                        xtype: 'button',
                        action: 'processexcel',
                   
                        padding: 5,
                        width: 150,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Process to Excel'
                    },
                    /*
                    {
                        xtype: 'button',
                        action: 'reportjs',
                   
                        padding: 5,
                        width: 150,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Report JS'
                    },
                    */
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    },
                    
                ]
            }
        ];
        return dockedItems;
    }
});

