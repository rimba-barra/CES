Ext.define('Hrd.view.absentrecord.FormViewLog', {
    alias: 'widget.absentrecordformviewlog',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.Gridviewlog'],
    uniquename: "_absentrecordformviewlog",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    // Fieldset in Column 
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'labelto',
                            text: 'Date',
                            margin: '0 0 0 0',
                            width: 40,
                        },
                        {
                            xtype: 'splitter',
                            width: '28'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_fromdate' + me.uniquename,
                            id: 'fromdate' + me.uniquename,
                            name: 'fromdate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Date',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'label',
                            forId: 'labelto',
                            text: 'S/d',
                            margin: '0 0 0 0',
                            width: 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_untildate' + me.uniquename,
                            id: 'untildate' + me.uniquename,
                            name: 'untildate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Date',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'getdata',
                            itemId: 'btngetData',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Get Data'
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'cleardata',
                            itemId: 'btnCleardata',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Clear Data'
                        },
                        //added by michael 02/12/2021
                        {
                            xtype: 'splitter',
                            width: '90'
                        },
                        {
                            xtype: 'button',
                            action: 'viewalllogdata',
                            itemId: 'btnViewalllogdata',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'View All Log'
                        },
                        //end added by michael 02/12/2021
                        {
                            xtype: 'tbfill'
                        }/*,
                        {
                            xtype: 'button',
                            action: 'getlogtemp',
                            itemId: 'btngetlogtempData',
                            padding: 4,
                            width: 120,
                            iconCls: '',
                            text: 'Get from Temporary'
                        },*/
                    ]
                },
                {
                    xtype: 'absentrecordgridviewlog',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
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
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-close',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});