Ext.define('Cashier.view.pengajuanserahterima.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.pengajuanserahterimaformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '91%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'unitnumbercombobox',
                    itemId: 'fs_unit_id'+me.uniquename,
                    id: 'fs_unit_id'+me.uniquename,
                    name: 'unit_id',
                    fieldLabel: 'Unit Number',
                    minChars: 1,
                    emptyText: 'Search Unit Number...',
                    queryMode: 'remote',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Tanggal ST',
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'fs_from_rencana_serahterima_date'+me.uniquename,
                            id: 'fromstdate'+me.uniquename,
                            name: 'fromstdate',
                            emptyText: 'From Date',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 120
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'fs_until_rencana_serahterima_date'+me.uniquename,
                            id: 'untilstdate'+me.uniquename,
                            name: 'untilstdate',
                            emptyText: 'Until Date',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 120
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Tanggal ST Diajukan',
                    items: [
                        {
                            xtype: 'datefield',
                            itemId: 'fs_from_rencana_serahterima_aju_date'+me.uniquename,
                            id: 'fromstajudate'+me.uniquename,
                            name: 'fromstajudate',
                            emptyText: 'From Date',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 120
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'fs_until_rencana_serahterima_aju_date'+me.uniquename,
                            id: 'untilstajudate'+me.uniquename,
                            name: 'untilstajudate',
                            emptyText: 'Until Date',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 120
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
