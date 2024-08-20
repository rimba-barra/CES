

Ext.define('Gl.view.setlaprugilaba.Grid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.setlaprugilabagrid',
    store: 'Setlaprugilaba',
    bindPrefixName: 'Setlaprugilaba',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rptformat_id',
                    width: 50,
                    align: 'right',
                    dataIndex: 'rptformat_id',
                    text: 'Index'
                },
                */
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sort',
                    width: 50,
                    align: 'right',
                    dataIndex: 'sort',
                    text: 'No. Urut'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_report_level',
                    width: 100,
                    dataIndex: 'report_level',
                    hideable: false,
                    text: 'Template Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 80,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 300,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name'
                },
                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_level',
                    width: 60,
                    dataIndex: 'level',
                    hideable: false,
                    text: 'Level'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 60,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type [D/C]'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_flag',
                    width: 60,
                    dataIndex: 'flag',
                    hideable: false,
                    text: 'Flag'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    viewConfig: {
                listeners: {
                    refresh: function(view) {  
                        var color,nodes,node,record,level,flag,cells,j,i;
                        
                        // get all grid view nodes
                          nodes = view.getNodes();        
                        for (i = 0; i < nodes.length; i++) {                            
                             node = nodes[i];                            
                            // get node record
                             record = view.getRecord(node);                            
                            // get level from record data
                             level = record.get('level'); 
                             flag = record.get('flag'); 
                             
                             if(level==0 && flag !='G'){
                                 level = "#ffffff"; 
                             }else if(level==0 && flag =='G'){
                                 level = "#00cc00";
                             }else if(level==1){
                                 level = "#ffff00"; 
                             }else if(level==2){
                                 level = "#ff3399";
                             }else if(level==3){
                                 level = "#00ffff";
                             }else if(level==4){
                                 level = "#999966";
                             }else if(level==5){
                                 level = "#66b3ff"; 
                             }else if(level==6){
                                 level = "#ffffff";
                             }else if(level==7){
                                level = "#f2f2f2";
                             }else if(level==8){
                                 level = "#666600"; 
                             }else if(level==9){
                                  level = "#006666";
                             }else if(level==10){
                                 level = "#006633";
                             }else if(level==11){
                                  level = "#660000";
                             }else if(level==12){
                                 level = "#000066";
                             }
                             
                             /*
                            switch (level) {
                                    case 0: level = "#ffffff";  break;
                                    case 1: level = "#ffff00";  break;
                                    case 2: level = "#ff3399";  break;
                                    case 3: level = "#00ffff";  break;
                                    case 4: level = "#999966";  break;
                                    case 5: level = "#66b3ff";  break;
                                    case 6: level = "#ffffff";  break;
                                    case 7: level = "#f2f2f2";  break;
                                    case 8: level = "#666600";  break;
                                    case 9: level = "#006666";  break;
                                    case 10: level = "#006633";  break;
                                    case 11: level = "#660000";  break;
                                    case 12: level = "#000066";  break;                                 
                                }
                                */
                            // get all td elements
                            cells = Ext.get(node).query('td');                              
                            // set bacground color to all row td elements
                            for(j = 0; j < cells.length; j++) {                               
                                    Ext.fly(cells[j]).setStyle('background-color', level);
                            }                                       
                        }
                    }      
                }
            }, 
    generateDockedItemsCustome: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'level_from',
                        id: 'level_from',
                        name: 'level_from',
                        fieldLabel: 'From',
                        value:'1',
                        readOnly:true,
                        allowBlank: false,
                        enforceMaxLength: true,
                        maxLength: 2,
                        anchor: '10%',
                        width: 200,
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'level_until',
                        id: 'level_until',
                        name: 'level_until',
                        emptyText:'With Numeric',
                        fieldLabel: 'Until',
                        allowBlank: false,
                        enforceMaxLength: true,
                        maxLength: 2,
                        anchor: '10%',
                        width: 200
                    },
                    {
                        xtype: 'button',
                        action: 'generate',
                        hidden: true,
                        itemId: 'btnGenerate',
                        id: 'btnGenerate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Generate',
                        text: 'Generate'
                    },
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
});
