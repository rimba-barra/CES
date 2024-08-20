Ext.define('Erems.view.followup.GridSp',{
    extend: 'Erems.library.template.view.GridDS2',
    requires: ['Erems.library.box.tools.Tools'],
    storeConfig: {
        id: 'FollowupGridSpStore',
        idProperty: 'schedule_id',
        extraParams: {
            mode_read:'sp'
        }
    },
    alias:'widget.followupgridsp',
    
    bindPrefixName:'Followup',
   // itemId:'',
    newButtonLabel:'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'duedate',
                    text: 'Duedate'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    text: 'Amount'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'remaining_balance',
                    width:80,
                    text: 'Remaining'
                },
                /*
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp1_plandate',
                    width:80,
                    hidden: true,
                    text: 'Sp1 Rencana'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp1_userdate',
                    width:150,
                    hidden: true,
                    text: 'Sp1 User Date',
                    renderer: me.inlineEditSPuserdate1
                },
                */
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp1_date',
                    width:80,
                    text: 'Sp1 Date'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sp1_no',
                    width:120,
                    text: 'Sp1 No.'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp2_plandate',
                    hidden: true,
                    width:80,
                    text: 'Sp2 Rencana'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp2_userdate',
                    width:150,
                    text: 'Sp2 User Date',
                    hidden: true,
                    renderer: me.inlineEditSPuserdate2
                },
                {
                     xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp2_date',
                    width:80,
                    text: 'Sp2 Date'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sp2_no',
                    width:120,
                    text: 'Sp2 No.'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp3_plandate',
                    hidden: true,
                    width:80,
                    text: 'Sp3 Rencana'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp3_userdate',
                    width:150,
                    text: 'Sp3 User Date',
                    hidden: true,
                    renderer: me.inlineEditSPuserdate3
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp3_date',
                    width:80,
                    text: 'Sp3 Date'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sp3_no',
                    width:120,
                    text: 'Sp3 No.'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp4_plandate',
                    hidden: true,
                    width:80,
                    text: 'Sp4 Rencana'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp4_userdate',
                    width:150,
                    text: 'Sp4 User Date',
                    hidden: true,
                    renderer: me.inlineEditSPuserdate4
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sp4_date',
                    width:80,
                    text: 'Sp4 Date'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sp4_no',
                    width:120,
                    text: 'Sp4 No.'
                },
                
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
     generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 75,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                   // defaultIcon: 'icon-edit',
                   iconCls: ' ux-actioncolumn icon-search act-gallery',
                   text:'View Images',
                    action: 'gallery',
                    altText: 'Gallery',
                    tooltip: 'Gallery'
                }
                
            ]
        };
        return ac;
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            
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
    inlineEditSPuserdate1: function (val, meta, record, rowIndex, colIndex, store) {
        return this.dateField('sp1_userdate', record);
    },
    inlineEditSPuserdate2: function (val, meta, record, rowIndex, colIndex, store) {
        return this.dateField('sp2_userdate', record);
    },
    inlineEditSPuserdate3: function (val, meta, record, rowIndex, colIndex, store) {
        return this.dateField('sp3_userdate', record);
    },
    inlineEditSPuserdate4: function (val, meta, record, rowIndex, colIndex, store) {
        return this.dateField('sp4_userdate', record);
    },
    dateField: function(name, record){
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        if (record.get(name)) {
            var date = me.tools.dateFormat(record.get(name));
            return '<input class="x-form-field x-form-text" type="date" name="'+name+'" data=' + record.get("schedule_id") + ' value="'+date+'" />';
        }else{
            return '<input class="x-form-field x-form-text" type="date" name="'+name+'" data=' + record.get("schedule_id") + ' />';
        }
    },
});


