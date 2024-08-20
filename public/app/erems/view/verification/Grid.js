Ext.define('Erems.view.verification.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSMSGridStore',
        idProperty: 'sms_id',
        extraParams: {}
    },
    alias: 'widget.verificationgrid',

    bindPrefixName: 'Verification',
    // itemId:'',
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', {mode: "SINGLE"}),
            columns     : [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'verification_id',
                    width: 60,
                    text: 'ID'
                },
                {
                    dataIndex: 'cluster_code',
                    width: 60,
                    text: 'Cluster'
                },

                {
                    dataIndex: 'unit_unit_number',
                    width: 80,
                    text: 'Unit Number'
                },

                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'verification_date',
                    text: 'Verification Date'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'diskonhargadasar_nilai',
                    text: 'Diskon Dasar'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'diskonhargatanah_nilai',
                    text: 'Diskon Tanah'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'diskonhargabangunan_nilai',
                    text: 'Diskon Bangunan'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'approve_date',
                    width: 80,
                    format: 'd-m-Y',
                    text: 'Approve Date'
                },
                {
                    xtype: 'booleancolumn',

                    width: 60,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_approve',
                    text: 'Approved',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    dataIndex: 'verification_note',
                    width: 275,
                    text: 'Note'
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var sortByStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data: [
                {"id": "approve_date", "text": "Approve Date"},
                {"id": "unit_number", "text": "Unit Number"}
            ]
        });
        
        var sortTypeStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data: [
                {"id": "ASC", "text": "Ascending"},
                {"id": "DESC", "text": "Descending"}
            ]
        });


        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },

                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    '->',
                    {
                        xtype: 'combobox',
                        store: sortByStore,
                        queryMode: 'local',
                       
                        labelWidth:50,
                        name:'sort_by',
                        valueField:'id',
                        autoSelect: true,
                        displayField:'text',
                        value:'approve_date',
                        width:170,
                        forceSelection: true,
                        fieldLabel: 'Sort by '
                    },
                    {
                       xtype: 'combobox',
                       name:'sort_type',
                        store: sortTypeStore,
                        queryMode: 'local',
                        valueField:'id',
                       
                        width:90,
                        autoSelect: true,
                        displayField:'text',
                        value:'DESC',
                        forceSelection: true,
                        fieldLabel: ''
                    }

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype     : 'actioncolumn',
            hidden    : true,
            itemId    : 'actioncolumn',
            width     : 50,
            resizable : false,
            align     : 'right',
            hideable  : false,
            renderer: function (value, metadata, record) {
                // console.log(record.get('is_approve'))
                // console.log($('.' + this.items[1].className))
                if (record.get('is_approve') == 1) {
                    // $('.' + this.items[1].className).hide();
                    this.items[1].disabled = true;
                    this.items[1].clicked = false;
                } else {
                    // $('.' + this.items[1].className).show();
                    this.items[1].disabled = false;
                }
            },
            items     : [
                {
                    text       : 'Edit',
                    iconCls    : 'icon-edit',
                    bindAction : me.bindPrefixName + 'Update',
                    altText    : 'Edit',
                    tooltip    : 'Edit'
                },
                {
                    text       : 'Delete',
                    iconCls    : 'icon-delete',
                    bindAction : me.bindPrefixName + 'Delete',
                    altText    : 'Delete',
                    tooltip    : 'Delete',
                }
            ],
            // listeners : {
            //     render : function(el, a,b,c){
            //         console.log(el, a,b,c)
            //     }
            // }
        };
        return ac;
    },
    // viewConfig: {
    //     listeners: {
    //         refresh: function (view, i,x, y, z, a,b,c,d,e,f,g) {
    //                 console.log(i,x, y, z, a,b,c,d,e,f,g)
    //             // console.log(view)
    //             // var color, nodes, node, record, level, flag, cells, j, i;
    //             // var jno, jid;
    //             // // get all grid view nodes
    //             nodes = view.getNodes();
    //             for (i = 0; i < nodes.length; i++) {
    //                 node = nodes[i];
    //                 // get node record
    //                 record = view.getRecord(node);
    //                 // console.log(record.get("is_approve"))
    //             //     // get level from record data    
    //             //     if (record.get("recommended_tocancel_id") == "1") {
    //             //         level = '#FCD03D';
    //             //     } else if (record.get("recommended_tocancel_id") == "2") {
    //             //         level = '#F1C9BA';
    //             //     } else {
    //             //         level = '#FFFAF0';
    //             //     }



    //             //     cells = Ext.get(node).query('td');
    //             //     // set bacground color to all row td elements
    //             //     for (j = 0; j < cells.length; j++) {
    //             //         Ext.fly(cells[j]).setStyle('background-color', level);
    //             //     }
    //             }
    //         }
    //     }
    // },
});


