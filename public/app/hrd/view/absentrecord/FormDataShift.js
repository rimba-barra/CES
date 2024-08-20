Ext.define('Hrd.view.absentrecord.FormDataShift', {
    alias: 'widget.absentrecordformdatashift',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.ShiftType'],
    frame: true,
    autoScroll: true,
    uniquename: "_absentrecordformdatashift",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'absentdetail_id'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    fieldLabel: 'Ubah Shift',
                                    xtype: 'cbshifttype',
                                    name: 'shifttype_id',
                                    id: 'shifttype_id' + me.uniquename,
                                    readOnly: false,
                                    allowBlank: false,
                                    typeAhead: true,
                                    queryMode: 'local',
                                    emptyText: 'Select Data',
                                    matchFieldWidth: false,
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">Shift</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">In</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">Out</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{shifttype}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{in_time}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{out_time}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
                                },
                            ]
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
                        text: 'Save'
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