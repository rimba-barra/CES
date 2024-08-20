Ext.define('Master.library.template.view.Grid', {
    extend: 'Ext.grid.Panel',
    title: '',
    alias: 'widget.templateviewgrid',
    loadStore: [],
    bindPrefixName: 'Controllername',
    loadedStore: {},
    columnLines: true,
    // store: 'Holiday',
    newButtonLabel: 'button',
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
                    xtype: 'gridcolumn',
                    itemId: 'colID',
                    width: 60,
                    align: 'right',
                    dataIndex: 'holiday_id',
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colName',
                    width: 200,
                    dataIndex: 'holiday_name',
                    hideable: false,
                    text: 'Holiday Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colDescription',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colDate',
                    width: 200,
                    dataIndex: 'holiday_date',
                    hideable: false,
                    text: 'Date'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colAddOn',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Add On'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colAddBy',
                    width: 150,
                    dataIndex: 'user_name',
                    hideable: false,
                    text: 'Add By'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colActive',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'active',
                    text: 'Active',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    beforeRender: function() {
        if (this.loadStore.length < 1)
            return false;
        var newStore = {};
        for (var i = 0; i < this.loadStore.length; i++) {
            newStore[this.loadStore[i]] = Ext.data.StoreManager.lookup(this.loadStore[i]);
        }
        this.loadedStore = newStore;

    },
    generateContextMenu: function() {

        /*var contextmenu = [
            {
                text: 'Coba',
                itemId: 'mnuEdit',
                iconCls: 'icon-form-add',
                action: 'update'
            },
            {
                text: 'Delete',
                itemId: 'mnuDelete',
                iconCls: 'icon-delete',
                action: 'destroy'
            }
        ];
        return contextmenu;*/
    },
    generateDockedItems: function() {
        var me = this;
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
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
				{ //========= added on march 15th 2016 by Tirtha
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    },
    getSelectedRecord:function(){
        var store = this.getStore();
        var record = store.getAt(this.getSelectedRow());
        return record;
    },
    getSelectedRow:function(){
        var store = this.getStore();
        return store.indexOf(this.getSelectionModel().getSelection()[0]);
    },
    /*@param int value*/
    getRecordById:function(value){
        var store = this.getStore();
        var idProperty = store.getProxy().getReader().getIdProperty();
        var record = store.getAt(store.findExact(idProperty,parseInt(value)));
        return record;
    },
    
    getSumColumn: function(columnName) {
        var dStore = this.getStore();
        var total = 0;
        dStore.each(function(rec) {           
            if (rec != null) {
                total += toFloat(rec.get(columnName));
            }
        });
        return total;

    },
    getJson:function(){
      
        var schStore = this.getStore();
        var detailParams = [];

        var countRow = 0;
        schStore.each(function(rec) {
            detailParams.push(rec.data);
        });

        return detailParams;
    },
    /* added 13 November 2013*/
    getDelimiterFase: function(dm) {
        var delimeter = dm;
        var schStore = this.getStore();
        var detailParams = {};

        var countRow = 0;
        schStore.each(function(rec) {
            countRow++;
       //     delimeter = countRow === 1 ? '' : delimeter;
            if (countRow == 1) {
                detailParams = rec.data;
                
            } else {
                for (var x in rec.data) {
                    detailParams[x] = detailParams[x] + ''+delimeter+'' + rec.data[x];
                }
            }




        });

        return detailParams;

    }

});