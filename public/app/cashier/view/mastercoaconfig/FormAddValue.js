Ext.define('Cashier.view.mastercoaconfig.FormAddValue', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastercoaconfigformaddvalue',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'coadetail_id',
                    name: 'coa_config_detail_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_kelsub_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cashflowtype_cashflowtype'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cluster_cluster'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cashflowtype_cashflowtype_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'coa_name',
                    name: 'coa_name',
                    allowBlank: false,
                },
                {
                    xtype: 'combobox',
                    name: 'coa_id',
                    fieldLabel: 'Coa Name',
                    displayField: 'name',
                    valueField: 'coa_id',
                    width: 400,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                            '<th width="15px"><div class="x-column-header x-column-header-inner">Coa Account</div></th>',
                            '<th width="100px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Coa account',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5',
                    readOnly: true

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
                            fieldLabel: 'Kel Sub',
                            name: 'kelsub_kelsub',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            flex: 1
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            name: 'kelsub_description',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            flex: 1
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
                                fieldLabel: 'Default Sub',
                                name: 'subgl_code',
                                width: 300,
                                readOnly: true,
                                allowBlank: true
                            },
                            {
                                xtype: 'splitter',
                                width: '10',
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnBrowseSub',
                                action: 'browsesubcode',
                                padding: 5,
                                width: 120,
                                height: 25,
                                iconCls: 'icon-search',
                                text: 'Browse Sub Code',
                                fieldLabel: 'Browse Sub Code',
                                title: 'Browse Sub Code',
                                hidden: false,
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
                    width: 700,
                    items: [
                        {
                            xtype: 'splitter',
                            width: '105',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code1' + me.uniquename,
                            id: 'code1' + me.uniquename,
                            name: 'subgl_code1',
                            emptyText: 'Code 1',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code2' + me.uniquename,
                            id: 'code2' + me.uniquename,
                            name: 'subgl_code2',
                            emptyText: 'Code 2',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code3' + me.uniquename,
                            id: 'code3' + me.uniquename,
                            name: 'subgl_code3',
                            emptyText: 'Code 3',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code4' + me.uniquename,
                            id: 'subgl_code4' + me.uniquename,
                            name: 'subgl_code4',
                            emptyText: 'Code 4',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_description' + me.uniquename,
                            id: 'subgl_description' + me.uniquename,
                            name: 'subgl_description',
                            emptyText: 'Sub Description',
                            width: 100,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cashflow ',
                    forceSelection: true,
                    name: 'cashflow_setupcashflow_id',
                    displayField: 'cashflowtype_cashflowtype',
                    valueField: 'setupcashflow_id',
                    flex: 2
                },
                {
                    xtype: 'combobox',
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    displayField: 'cluster',
                    valueField: 'cluster_id',
                    width: 400,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                            '<th width="15px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="100px"><div class="x-column-header x-column-header-inner">Cluster</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{cluster}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
//                {
//                    xtype: 'textfield',
//                    name: 'type',
//                    fieldLabel: 'Data Flow',
//                    enforceMaxLength: true,
//                    maxLength: 30,
//                    anchor: '-5',
//                    readOnly:true
//
//                },
                {
                    xtype: 'textfield',
                    itemId: 'attributevalue',
                    name: 'persen',
                    fieldLabel: 'Persen',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5',
                    allowBlank: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'type',
                    name: 'type',
                    fieldLabel: 'Type',
                    width: 300  
                },
                {
                    xtype: 'combobox',
                    name: 'status',
//                        fieldLabel: 'Group by',
                    emptyText: 'Status Pembulatan',
                    queryMode: 'local',
                    valueField: 'status',
                     fieldLabel:'Status Pembulatan',
                    //allowBlank: false,
                    forceSelection: true,
                    displayField: 'description',
                    width: 300,
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: ' ', description: '-'},
                            {status: 'round', description: 'Round (Remove Decimal)'},
                            {status: 'target', description: 'Target (% Sisa dari Round remove decimal)'},
                            {status: 'roundup', description: 'Round Auto'},
                            {status: 'targetroundup', description: 'Value from Round Auto'},
                            //{status: 'O', description: 'CASH OUT'},
                        ]
                    }),
                },
                {
                    xtype: 'textareafield',
                    itemId: 'desc',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'

                }, ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});