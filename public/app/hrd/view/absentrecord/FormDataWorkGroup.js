Ext.define('Hrd.view.absentrecord.FormDataWorkGroup', {
    alias: 'widget.absentrecordformdataworkgroup',
    extend: 'Hrd.library.box.view.FormData',
    requires: [
        'Hrd.library.template.combobox.Workgroupcombobox'
    ],
    frame: true,
    autoScroll: true,
    uniquename: "_absentrecordformdataworkgroup",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    // Fieldset in Column 2
                    xtype: 'fieldset',
                    title: 'Periode',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    padding: '0 10 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'workgroupcombobox',
                            fieldLabel: '',
                            itemId: 'fd_workgroup_id' + me.uniquename,
                            id: 'workgroup_id' + me.uniquename,
                            name: 'workgroup_id',
                            emptyText: 'Select Shift Pattern',
                            width: 190,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_fromperiode' + me.uniquename,
                            id: 'fromperiode' + me.uniquename,
                            name: 'fromperiode',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Periode',
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
                            margin: '0 0 0 50',
                            width: 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_untilperiode' + me.uniquename,
                            id: 'untilperiode' + me.uniquename,
                            name: 'untilperiode',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Periode',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
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
                        action: 'save',
                        itemId: 'btnSave',
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