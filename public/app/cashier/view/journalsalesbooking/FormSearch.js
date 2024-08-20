Ext.define('Cashier.view.journalsalesbooking.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.journalsalesbookingformsearch',
    uniquename: "_fsjournalsalesbooking",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },

                {
                    xtype: 'ptusercombobox',
                    itemId: 'fd_pt_id_11e34',
                    id: 'pt_id_11e34',
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select PT / Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Sales Date',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            emptyText: 'From Date',
                            name: 'sales_fromdate',
                            itemId: 'fsms_fromdate_11e31',
                            id: 'fromdate_11e31',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 110,
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'fsms_untildate_11e31',
                            id: 'untildate_11e31',
                            fieldLabel: '',
                            emptyText: 'Until Date',
                            name: 'sales_untildate',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Handover Date',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            emptyText: 'From Date',
                            name: 'handover_fromdate',
                            itemId: 'fsms_fromdate_11e32',
                            id: 'fromdate_11e32',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 110,
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'fsms_untildate_11e32',
                            id: 'untildate_11e32',
                            fieldLabel: '',
                            emptyText: 'Until Date',
                            name: 'handover_untildate',
                            enforceMaxLength: true,
                            maxLength: 10,
                            enableKeyEvents: true,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fd_cluster_id_11e34',
                    id: 'cluster_id_11e34',
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    emptyText: 'Select Cluster',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null

                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Unit No.',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'From',
                            name: 'unit_number_from',
                            itemId: 'fsms_fromdate_11e39',
                            id: 'fromdate_11e39',
                            width: 110,
                            enforceMaxLength: true,
                            maxLength: 8,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fsms_untildate_11e38',
                            id: 'untildate_11e39',
                            fieldLabel: '',
                            emptyText: 'Until',
                            name: 'unit_number_until',
                            enforceMaxLength: true,
                            maxLength: 8,
                            enableKeyEvents: true,
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Payment Percentage',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'From %',
                            name: 'percent_from',
                            itemId: 'fsms_fromdate_11e37',
                            id: 'fromdate_11e37',
                            width: 110,
                            value: 0,
                            enforceMaxLength: true,
                            maxLength: 3,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fsms_untildate_11e37',
                            id: 'untildate_11e37',
                            fieldLabel: '',
                            emptyText: 'Until %',
                            name: 'percent_until',
                            enforceMaxLength: true,
                            maxLength: 3,
                            value: 100,
                            enableKeyEvents: true,
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Construction Percentage',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'From %',
                            name: 'const_from',
                            itemId: 'fsms_fromdate_11e38',
                            id: 'fromdate_11e38',
                            width: 110,
                            value: 0,
                            enforceMaxLength: true,
                            maxLength: 3,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'label',
                            forId: 'lbl1',
                            text: 'To',
                            margin: '2 10 0 10'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fsms_untildate_11e38',
                            id: 'untildate_11e38',
                            fieldLabel: '',
                            emptyText: 'Until %',
                            name: 'const_until',
                            enforceMaxLength: true,
                            maxLength: 3,
                            value: 100,
                            enableKeyEvents: true,
                            width: 110
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
