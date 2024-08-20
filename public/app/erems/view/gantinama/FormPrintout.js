Ext.define('Erems.view.gantinama.FormPrintout', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.gantinamaformprintout',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 250,
    bodyBorder: true,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                /*
                {
                    xtype: 'fieldset',
                    title: 'Select Template',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '',
                            name: 'template_name',
                            id: 'template',
                            labelSeparator: '',
                            itemCls: 'x-check-group-alt',
                            columns: 1,
                            items: []

                        }
                    ]
                },
                */
               
            ],
            dockedItems: me.generateDockedItem()
        });




        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            
        ];
        return x;
    }
    
    /*
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
                        action: 'print',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-print',
                        text: 'Print'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }

                ]
            }
        ];
        return x;
    }
     */
});