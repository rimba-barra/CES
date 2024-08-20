Ext.define('Cashier.view.tbank.FormCopyKasbank', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tbankformcopykasbank',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 530,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'filtercopykasbank'
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
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_allcompany' + me.uniquename,
                            name: 'allcompany',
                            boxLabel: 'All Company',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'ptbydefaultprojectcombobox',
                            fieldLabel: '',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                            emptyText: '',
                            width: 190,
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
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_allaccept_date' + me.uniquename,
                            name: 'allaccept_date',
                            boxLabel: 'All Trans Date',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
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
                            margin: '0 0 0 20',
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
                    ]
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
                            xtype: 'statuskasbankforreportcombobox',
                            fieldLabel: 'Type Transaction',
                            itemId: 'fd_kasbank' + me.uniquename,
                            id: 'kasbank' + me.uniquename,
                            name: 'kasbank',
                            emptyText: '',
                            width: 190,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'statusflowforreportcombobox',
                            fieldLabel: 'Data Flow',
                            itemId: 'fd_dataflow' + me.uniquename,
                            id: 'dataflow' + me.uniquename,
                            name: 'dataflow',
                            emptyText: '',
                            width: 190,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Coa Lawan',
                            itemId: 'fd_coalawan' + me.uniquename,
                            id: 'coalawan' + me.uniquename,
                            name: 'coalawan',
                            emptyText: '',
                            value: '99.99.999',
                            width: 190,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
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
                            xtype: 'textfield',
                            fieldLabel: 'Total Amout From Selected',
                            itemId: 'fd_totalamount' + me.uniquename,
                            id: 'totalamount' + me.uniquename,
                            name: 'totalamount',
                            emptyText: 'Auto Value',
                            value: 0,
                            readOnly: true,
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
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
                            xtype: 'button',
                            action: 'getdata',
                            itemId: 'btngetData',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Get Data'
                        },
                    ]
                },
                 {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'DATA CASH / BANK',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'label',
                            forId: 'lblntracuti',
                            text: 'Check for Copy Data',
                        },
                        {
                            xtype: 'tbankcopykasbankgrid',
                            itemId: 'fd_tbankcopykasbankgrid',
                            id: 'tbankcopykasbankgrid',
                            name: 'tbankcopykasbankgrid',
                            title: 'CASH / BANK',
                            width: '98%',
                            height: 280,
                            padding: '20px 0 0 20px',
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
});

