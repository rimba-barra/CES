Ext.define('Hrd.view.absentrecord.Formtransferbyintranet', {
    alias: 'widget.absentrecordformtransferbyintranet',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    uniquename: "_absentrecordformtransferbyintranet",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Transfer Data from Intranet',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'hbox',
                    padding: '0 100 50 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: '',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 2
                            },
                            layout: 'vbox',
                            padding: '0 0 0 0', //(top, right, bottom, left).
                            items: [
                                {
                                    boxLabel: 'Cuti',
                                    name: 'options',
                                    inputValue: 'cuti',
                                    id: 'options1' + me.uniquename,
                                    allowBlank: false,
                                    checked: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'Ijin',
                                    name: 'options',
                                    inputValue: 'ijin',
                                    id: 'options2' + me.uniquename,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'Tugas Luar Kantor',
                                    name: 'options',
                                    inputValue: 'dinasluarkantor',
                                    id: 'options3' + me.uniquename,
                                    allowBlank: false

                                },/*,
				 {

                                    boxLabel: 'Tukar Off',
                                    name: 'options',
                                    inputValue: 'tukeroff',
                                    id: 'options4' + me.uniquename,
                                    allowBlank: false
                                },
                {
                                    boxLabel: 'PDLK / PDLN',
                                    name: 'options',
                                    inputValue: 'pdlk',
                                    id: 'options5' + me.uniquename,
                                    allowBlank: false

                                },*/

                                // added by Michael 2021.06.15 
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'Sakit',
                                    name: 'options',
                                    inputValue: 'sakit',
                                    id: 'options6' + me.uniquename,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    boxLabel: 'Tukar Shift / Off',
                                    name: 'options',
                                    inputValue: 'tukarshift',
                                    id: 'options4' + me.uniquename,
                                    allowBlank: false
                                },
                                // end added by Michael 2021.06.15  

				

                            ]
                        },
                      
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
      generateDockedItem: function() {
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
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});